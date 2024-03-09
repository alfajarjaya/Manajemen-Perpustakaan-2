import mysql.connector
import app
import assets.admin as admin
import assets.data_buku as db_buku

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
        
def insert_listBook():
    try:
        konektor = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='user',
            port=3306
        )

        cur = konektor.cursor()

        book_ids = [db_buku.Buku_1_id, db_buku.Buku_2_id]
        inp = admin.session.get('tersisa_inp')
        nama_buku = [db_buku.Buku_1_nama, db_buku.Buku_2_nama]

        for book_id, nama in zip(book_ids, nama_buku):
            check_query = "SELECT COUNT(*) FROM data_buku WHERE id_buku = %s"
            cur.execute(check_query, (book_id,))
            result = cur.fetchone()[0]

            if result == 0:
                insert_query = "INSERT INTO data_buku (id_buku, nama_buku, sisa) VALUES (%s, %s, %s)"
                insert_values = (book_id, nama, inp)
                cur.execute(insert_query, insert_values)
                konektor.commit()
                print(f'Buku dengan ID {book_id} berhasil ditambahkan')
            elif result > 0:
                update_query = "UPDATE data_buku SET sisa = %s WHERE id_buku = %s"
                update_values = (inp, book_id)
                cur.execute(update_query, update_values)
                konektor.commit()
                print(f'Buku dengan ID {book_id} berhasil diupdate')
            else:
                print(f'Error: Tidak dapat memeriksa status buku dengan ID {book_id}')

        konektor.close()
    except mysql.connector.errors as e:
        print(f'Error : {e}')
    else:
        print('Operasi berhasil')

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
        