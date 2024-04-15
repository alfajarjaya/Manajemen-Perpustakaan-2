import mysql.connector
import json

with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\static\\json\\daftar_buku.json', 'r') as lb:
    listBook = json.load(lb)

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='sistemperpustakaan_admin',
    port=3306
)
cursor = conn.cursor()

try:
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS database_buku (
        id_buku VARCHAR(15) PRIMARY KEY,
        nama_buku TEXT,
        penerbit_buku TEXT,
        sisa INT
    )
    """)
except Exception as e:
    print(e)
finally:
    print('success')

for buku in listBook['listBook'].values():
    id = buku['id']
    nama = buku['nama']
    penerbit = buku['penerbit']
    sisa = 5
    
    cursor.execute("INSERT INTO database_buku (id_buku, nama_buku, penerbit_buku, sisa) VALUES (%s, %s, %s, %s)", (id, nama, penerbit, sisa))

conn.commit()
conn.close()