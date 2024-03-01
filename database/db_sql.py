import mysql.connector
import assets.admin as admin
import app


def pinjam():
    try:
        konektor = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='user',
            port= 3306
        )

        cur = konektor.cursor()

        nama = app.session.get('nama')
        kelas = app.session.get('kelas')
        pinjam = app.session.get('pinjam')
        kembali = app.session.get('kembali')

    
        db = """
            INSERT INTO pinjam (nama,kelas,pinjam,kembali) VALUES(%s,%s,%s,%s)
        """
    
        db_value = (nama,kelas,pinjam,kembali)
    
        cur.execute(db,db_value)
        konektor.commit()
        
    except mysql.connector.errors as e:
        print(f'Erorr {e}')
    else:
        print('success')
        