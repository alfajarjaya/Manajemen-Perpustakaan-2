import cv2
import mysql.connector as sql
import PySimpleGUI as psg

def database():
    return sql.connect(
        host="localhost",
        user="root",
        password="",
        database="sistemperpustakaan_admin"
    )

def scan_and_save(frame):
    try:
        color = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        detector = cv2.QRCodeDetector()
        
        retval, decodeInfo, points, straight = detector.detectAndDecodeMulti(color)
        
        if retval:
            for i in range(len(points)):
                qr_data = proses_data(decodeInfo[i])
                
                if qr_data:
                    qrCode = (
                        qr_data['Nomor Induk'],
                        qr_data['Nama'],
                        qr_data['Kelas'],
                        qr_data['Jurusan']
                    )
                    
                    print(f'Data di qrCode : {i}')
                    
                    konektor = database()
                    cur = konektor.cursor()
                    
                    data = """
                        INSERT INTO database_pengunjung(
                            nomor_induk,
                            nama,
                            kelas,
                            jurusan
                        ) VALUES (
                            %s,
                            %s,
                            %s,
                            %s
                        )
                    """
                    
                    cur.execute(data, qrCode)
                    konektor.commit()
                    
                    print(f'Data sudah ada di database {konektor}')
                else:
                    print("Data QR code tidak valid.")
    except Exception as e:
        print(f'Error : {e}')

def proses_data(decodeInfo):
    try:
        qr_data = {
            'Nomor Induk': '',
            'Nama': '',
            'Kelas': '',
            'Jurusan': ''
        }
        
        lines = decodeInfo.split('\n')
        for line in lines:
            if ':' in line:
                key, value = line.split(':', 1)
                qr_data[key.strip()] = value.strip()
        
        i = f"""
            Nomor Induk : {qr_data['Nomor Induk']}, \n
            Nama        : {qr_data['Nama']}, \n
            Kelas       : {qr_data['Kelas']}, \n
            Jurusan     : {qr_data['Jurusan']}, \n
        """
        
        psg.popup(f'QrCode data : \n {i}')
        
        return qr_data
    except Exception as e:
        print(f'Error: {e}')
        return None

def generateFrame():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if success:
            scan_and_save(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            if not buffer.any(): 
                print('Error encoding to JPEG format')
                break
            else:
                frame = buffer.tobytes()
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            break
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    for i in generateFrame():
        True
