from flask import (
    render_template, 
    request, 
    send_file, 
    session,
    url_for,
    Response,
    redirect,
    jsonify
)
import app
import database.SQL.connect_to_SQL as database
import config.import_json as fileJson
import config.admin.scannerQRCODE as adminQr
import app

list_Book = fileJson.listBook

apk = app.app

def home():
    user = app.session.get('user')
    return render_template('admin/dashboard.html', userName=user)

def peminjaman():
    user = app.session.get('user')
    
    if request.method == 'POST':
        return render_template('admin/pinjam_admin.html', userName=user, success='Data berhasil masuk')   
    return render_template('admin/pinjam_admin.html', userName=user)

def profil():
    user = app.session.get('user')
    
    return render_template('admin/profil.html', user=user, nomor='-',kelas='-', userName=user)
        
def list_book():
    user = app.session.get('user')
    bookSisa = []
    book = list_Book
    
    for key, val in book.items():
        for title, fill in val.items():
            book_id = fill['id']
            nama_buku = fill['nama']
            sisa = database.selectBook(book_id, nama_buku)
            bookSisa.append({'fill': fill, 'sisa': sisa})
            
            for books in bookSisa:
                if books['sisa'] is None:
                    books['sisa'] = 'Data tidak tersedia'
                    
    return render_template('admin/book_admin.html', userName=user, bookSisa=bookSisa, bookClick=books)


# def dataPengunjung():
#     file = 'D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx'
    
#     return send_file(file, as_attachment=True)

def scanner():
    return render_template('admin/scanner.html', video=app.video_feed())

def dataPengunjung():
    user = app.session.get('user')
    
    data = database.dataPengunjung()
    
    print(data)
    return render_template('admin/data_pengunjung.html', userName=user, data=data)

def tataTertib():
    user = app.session.get('user')
    
    dataTartib = fileJson.tataTertib
    return render_template('admin/tata_tertib.html', userName=user, tataTertib=dataTartib)