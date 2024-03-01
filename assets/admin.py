from flask import render_template, request, send_file
import app
import database.db_sql as database
import assets.import_json as fileJson

listBook = fileJson.listBook

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
    
    return render_template('admin/profil.html', user=user, nomor='-',kelas='-')

def listBook():
    user = app.session.get('user')
    
    return render_template('admin/book_admin.html', userName=user, book=listBook)

def dataPengunjung():
    file = 'D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx'
    
    return send_file(file, as_attachment=True)

def scanner():
    return 