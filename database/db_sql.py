import mysql.connector
import app

def add_login():
    try:
        konektor = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='user',
            port=3306
        )

        cur = konektor.cursor()

        nama = app.session.get('user')
        password = app.session.get('password')

        check_query = "SELECT COUNT(*) FROM login WHERE nama = %s"
        cur.execute(check_query, (nama,))
        result = cur.fetchone()[0]

        if result == 0:
            insert_query = "INSERT INTO login (nama, password) VALUES (%s, %s)"
            insert_values = (nama, password)
            cur.execute(insert_query, insert_values)
            konektor.commit()
            print('Login berhasil disimpan')
        else:
            print('Login sudah ada di database')

        konektor.close()
    except mysql.connector.errors as e:
        print(f'Error : {e}')
        

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
        konektor.close()
        
    except mysql.connector.errors as e:
        print(f'Erorr {e}')
    else:
        print('Data Peminjaman berhasil di simpan')
        