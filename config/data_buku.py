import mysql.connector
import json

with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\client\\user.json', 'r') as lb:
    
    listBook = json.load(lb)





data = {
    "223062193872": {
        "nama": "FINA RAHMAWATI",
        "nomor": "3062193872",
        "kelas": "XI TKJ 2"
    },
    "220073072979": {
        "nama": "FIRSA PUTRI AMELIA DEWI",
        "nomor": "0073072979",
        "kelas": "XI TKJ 2"
    },
    "220095071044": {
        "nama": "FITRI NUR AZSAHRA",
        "nomor": "0095071044",
        "kelas": "XI TKJ 2"
    },
    "220065211738": {
        "nama": "GIDEON FIRMAN HUTOMO",
        "nomor": "0065211738",
        "kelas": "XI TKJ 2"
    },
    "220078020225": {
        "nama": "HESTY VALENTINO SANJAYA",
        "nomor": "0078020225",
        "kelas": "XI TKJ 2"
    },
    "220061948654": {
        "nama": "IBRA RAHMADA AN HARIST",
        "nomor": "0061948654",
        "kelas": "XI TKJ 2"
    },
    "220075420919": {
        "nama": "ILKHAFA AZIZATUR ROHMAH",
        "nomor": "0075420919",
        "kelas": "XI TKJ 2"
    },
    "220063331972": {
        "nama": "IMELDA AYUDIA NESA",
        "nomor": "0063331972",
        "kelas": "XI TKJ 2"
    },
    "220068791885": {
        "nama": "JOVITA FERISKA PUTRI",
        "nomor": "0068791885",
        "kelas": "XI TKJ 2"
    },
    "220065298464": {
        "nama": "KENZA AURELIA RINDIANI",
        "nomor": "0065298464",
        "kelas": "XI TKJ 2"
    },
    "220077666331": {
        "nama": "KEVIN LUCKY FATKUR FIRMANSYAH",
        "nomor": "0077666331",
        "kelas": "XI TKJ 2"
    },
    "220066882938": {
        "nama": "KIMI HUGO KOVALINEN",
        "nomor": "0066882938",
        "kelas": "XI TKJ 2"
    },
    "220064748354": {
        "nama": "KURNIA SANDI PERMANA",
        "nomor": "0064748354",
        "kelas": "XI TKJ 2"
    },
    "220074670648": {
        "nama": "LAILA SUKMA HENING ARIYANTI",
        "nomor": "0074670648",
        "kelas": "XI TKJ 2"
    },
    "220063450509": {
        "nama": "LAURA LADY PRATHISTA RANA",
        "nomor": "0063450509",
        "kelas": "XI TKJ 2"
    },
    "220074214171": {
        "nama": "LINTANG MARGI LESTARI",
        "nomor": "0074214171",
        "kelas": "XI TKJ 2"
    },
    "220072601683": {
        "nama": "LUCKY DWI ADIPRANATA",
        "nomor": "0072601683",
        "kelas": "XI TKJ 2"
    },
    "220068540266": {
        "nama": "MADINDA RISKA YUSIDA DEWI",
        "nomor": "0068540266",
        "kelas": "XI TKJ 2"
    },
    "220069270434": {
        "nama": "MARVELLA HARDIANA ABIWARDANI",
        "nomor": "0069270434",
        "kelas": "XI TKJ 2"
    },
    "220072070493": {
        "nama": "MIFTAQUL NURSABILA",
        "nomor": "0072070493",
        "kelas": "XI TKJ 2"
    },
    "220066954705": {
        "nama": "MOCHAMAD IRBAH TAUFIQURRAHMAN",
        "nomor": "0066954705",
        "kelas": "XI TKJ 2"
    },
    "220077079282": {
        "nama": "MOCHAMMAD ALFAJJAR SYACH PUTRA",
        "nomor": "0077079282",
        "kelas": "XI TKJ 2"
    }
}

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
    CREATE TABLE IF NOT EXISTS database_client (
        username VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        nama VARCHAR(255) NOT NULL,
        nomor_induk VARCHAR(255) NOT NULL,
        kelas VARCHAR(255) NOT NULL
    )
    """)
    
    for buku in data.items():
        username = buku[0]
        nama = buku[1]['nama']
        kelas = buku[1]['kelas']
        nomor_induk = buku[1]['nomor']

        cursor.execute('INSERT INTO database_client (username, password, nama, nomor_induk, kelas) VALUES (%s, %s, %s, %s, %s)', (username, username, nama, nomor_induk, kelas))
    
    conn.commit()
    cursor.close()
    conn.close()
    
except Exception as e:
    print('error')
finally:
    print('success')

# for b in data.items():
#     print(b[0], b[1]['nama'] , b[1]['nomor'], b[1]['kelas'])