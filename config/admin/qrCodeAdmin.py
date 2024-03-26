import PySimpleGUI as psg
import numpy as np
import mysql.connector as mysql
import cv2
from flask import Flask
import database.db_sql as db
import app

def scan_and_save_qrcode(frame, worksheet):
    try:
        color = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        detector_qrcode = cv2.QRCodeDetector()
        
        retval, decode_info, points, straight_qrcode = detector_qrcode.detectAndDecode(color)
        
        if retval:
            for i in range(len(points)):
                cx = int(np.mean(points[i][:, 0]))
                cy = int(np.mean(points[i][:, 1]))
                
                points_int32 = points[i].astype(np.int32)
                
                cv2.polylines(frame, [points_int32], isClosed=True, color=(0, 255, 0), thickness=2)
                qr_data = proses_data(decode_info[i])
                
                i = f"""
                    Nomor Induk : {qr_data['Nomor Induk']}, \n
                    Nama        : {qr_data['Nama']}, \n
                    Kelas       : {qr_data['Kelas']}, \n
                    Jurusan     : {qr_data['Jurusan']}, \n
                """
                print(f'Data di qrCode : {i}')
                
                if any(qr_data.values()):
                    if worksheet.max_row == 1:
                        worksheet.append(
                            ['Nomor Induk', 'Nama', 'Kelas', 'Jurusan']
                        )
                    
                    valueDataQRCode = [
                        qr_data['Nomor Induk'],
                        qr_data['Nama'],
                        qr_data['Kelas'],
                        qr_data['Jurusan']
                    ]
                    
                    worksheet.append(valueDataQRCode)
                    
                    sql = """
                        INSERT INTO ...... (Nomor Induk, Nama, Kelas, Jurusan) VALUES (%s, %s, %s, %s)
                    """
                    
                    # Eksekusi
                    # Commmit 
                    
                    book = app.workbook
                    
                    book.save('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx')
                    
                    print(f'data sudah tersimpan di {book}')
    except Exception as e:
        print(f'Error di qrCode : {e}')
    finally:
        cv2.waitKey(1)
        print('success')
        
def proses_data(frame):
    try:
        color = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        detector_qrcode = cv2.QRCodeDetector()
        retval, decode_info, points, straight_qrcode = detector_qrcode.detectAndDecode(color)
        
        if retval:
            for i in range(len(points)):
                qr_data = {
                    'Nomor Induk': '',
                    'Nama': '',
                    'Kelas': '',
                    'Jurusan': ''
                }
                
                lines = decode_info[i].split('\n')
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
                
                if any(qr_data.values()):
                    if app.worksheet.max_row == 1:
                        worksheet.append(['Nomor Induk', 'Nama', 'Kelas', 'Jurusan'])
                    
                    valueDataQRCode = [
                        qr_data['Nomor Induk'],
                        qr_data['Nama'],
                        qr_data['Kelas'],
                        qr_data['Jurusan']
                    ]
                    worksheet.append(valueDataQRCode)

                    sql = """
                        INSERT INTO ...... (Nomor Induk, Nama, Kelas, Jurusan) VALUES (%s, %s, %s, %s)
                    """
                    # Eksekusi
                    # Commmit
                    
                    app.workbook.save('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx')
                    
                    psg.popup(f'data sudah tersimpan di {workbook}')
        else:
            print("QR Code tidak ditemukan pada gambar.")
    except Exception as e:
        print(f'Error di proses : {e}')
    finally:
        cv2.waitKey(1)
        print('success')


def generateFrame():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if success:
            proses_data(frame)
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

if __name__ == "__main__":
    apk = psg.FlexForm('QR Code Scanner')
    layout = [[psg.Image(filename='', key='image')]]
    apk.Layout(layout)
    
    workbook = app.workbook
    worksheet = app.worksheet
    
    window = app.Window('QR Code Scanner').Layout(layout).Finalize()
    
    for frame in generateFrame():
        event, values = window.Read(timeout=20)
        window.FindElement('image').Update(data=frame)
        if event == psg.WIN_CLOSED:
            break
    
    window.Close()
