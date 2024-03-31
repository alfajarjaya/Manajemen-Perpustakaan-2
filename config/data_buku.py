# import mysql.connector
# import json

# with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\static\\json\\daftar_buku.json', 'r') as lb:
#     listBook = json.load(lb)

# conn = mysql.connector.connect(
#     host='localhost',
#     user='root',
#     password='',
#     database='user'
# )
# cursor = conn.cursor()

# for buku in listBook['listBook'].values():
#     id = buku['id']
#     nama = buku['nama']
#     penerbit = buku['penerbit']
#     sisa = 11
    
#     cursor.execute("INSERT INTO data_buku (id_buku, nama_buku, penerbit_buku, sisa) VALUES (%s, %s, %s, %s)", (id, nama, penerbit, sisa))

# conn.commit()
# conn.close()
