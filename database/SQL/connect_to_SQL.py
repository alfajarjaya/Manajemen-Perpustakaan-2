import mysql.connector
import app

def connect_to_database():
    return mysql.connector.connect(
        host='localhost',
        user='root', 
        password='', 
        database='sistemperpustakaan_admin',
        port=3306
    )
def add_login():
    try:
        konektor = connect_to_database()
        cur = konektor.cursor()

        cur.execute("""
                    CREATE TABLE IF NOT EXISTS database_login (
                        id_login INT PRIMARY KEY AUTO_INCREMENT,
                        nama VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL
                    )
                    
                    """)

        nama = app.session.get('user')
        password = app.session.get('password')

        check_query = "SELECT COUNT(*) FROM database_login WHERE nama = %s"
        cur.execute(check_query, (nama,))
        result = cur.fetchone()[0]

        if result == 0:
            insert_query = "INSERT INTO database_login (nama, password) VALUES (%s, %s)"
            insert_values = (nama, password)
            cur.execute(insert_query, insert_values)
            konektor.commit()
            print('Login berhasil disimpan')
        else:
            print('Login sudah ada di database')

        konektor.close()
    except Exception as e:
        print(f'Error : {e}')
        
def update_book_count_and_save_to_database(book_id, book_name, new_count):
    try:
        connection = connect_to_database()
        cursor = connection.cursor()
        
        cursor.execute("SELECT id_buku FROM database_buku WHERE id_buku = %s", (book_id,))
        existing_book = cursor.fetchone()

        if existing_book:
            cursor.execute("UPDATE database_buku SET sisa = %s WHERE id_buku = %s", (new_count, book_id))
            print("Data buku berhasil diperbarui.")
        else:
            cursor.execute("INSERT INTO database_buku (id_buku, nama_buku, penerbit_buku, sisa) VALUES (%s, %s, %s,%s)", (book_id, book_name, new_count))
            print("Data buku baru berhasil ditambahkan.")

        connection.commit()

        cursor.execute("SELECT id_buku, nama_buku, penerbit_buku, sisa FROM database_buku WHERE id_buku = %s", (book_id,))
        book_data = cursor.fetchone()

        if book_data:
            print("Data buku yang diperbarui atau ditambahkan:", book_data)
        
        cursor.close()
        connection.close()

    except Exception as e:
        print("Gagal memperbarui atau menambahkan data buku:", e)
def selectBook(book_id, book_name):
    try:
        connection = connect_to_database()
        cursor = connection.cursor()
        
        sql = "SELECT sisa FROM `database_buku` WHERE id_buku = %s AND nama_buku = %s"
        cursor.execute(sql, (book_id, book_name,))
        
        book_data = cursor.fetchone()
        
        cursor.close()
        connection.close()

        return book_data[0]
    except Exception as e:
        print("Error while fetching book data:", e)
        return None

def pinjam():
    try:
        konektor = connect_to_database()

        cur = konektor.cursor()

        nama = app.session.get('nama')
        kelas = app.session.get('kelas')
        pinjam = app.session.get('pinjam')
        kembali = app.session.get('kembali')

    
        db = """
            INSERT INTO data_pinjam (nama,kelas,tanggal_peminjaman1,tanggal_pengembalian) VALUES(%s,%s,%s,%s)
        """
    
        db_value = (nama,kelas,pinjam,kembali)
    
        cur.execute(db,db_value)
        konektor.commit()
        konektor.close()
        
    except mysql.connector.errors as e:
        print(f'Erorr {e}')
    else:
        print('Data Peminjaman berhasil di simpan')
        
def dataPengunjung():
    try:
        konektor = connect_to_database()
        cur = konektor.cursor()
        
        cur.execute('SELECT * FROM `database_pengunjung`')
        result = cur.fetchall()

        hasil = []
        
        for data in result:
            nomor_induk = data[0]
            nama = data[1]
            kelas = data[2]
            jurusan = data[3]

            data_user = [
                nomor_induk,
                nama,
                kelas,
                jurusan
            ]
            
            hasil.append(data_user)
            
        return hasil
    except Exception as e:
        print(f'Error : {e}')