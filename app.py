from flask import (
    Flask,
    render_template,
    request,
    session,
    redirect,
    url_for,
    Response,
    jsonify
)

import config.admin.admin as admin
import config.client.client as client
from config.client.client_valid import name_and_pw_client
from config.client.client_valid import user_client_valid
import config.import_json as json
import database.db_sql as db
from database.client import user as userClient
from config.admin import qrCodeAdmin as adminQr
import os
import openpyxl
import config.admin.val_admin as validateUserAdmin

app = Flask(__name__)
app.secret_key = '1'

dataAdmin = json.adminUser
dataClient = json.clientUser


@app.route('/', methods=['POST', 'GET'])
def login():
    user = request.form.get('username')
    password = request.form.get('password')

    if request.method == 'POST':
        if validateUserAdmin.val_user_and_pw_admin(user, password):
            session['user'] = user
            session['password'] = password
                
            db.add_login()
            return redirect(url_for('home'))
            
        elif name_and_pw_client(user, password):

            session['user'] = user
            session['password'] = password
                    
            db.add_login()
            return redirect(url_for('home'))
        
        else:
            return render_template('login.html', nf='Username not found')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['POST', 'GET'])
def home():
    user = session.get('user')

    if user:
        if validateUserAdmin.val_user_admin(user):
            return admin.home()

        if user_client_valid(user):
            return client.home_user()

    return redirect(url_for('login'))

                
@app.route('/admin_pinjam', methods=['POST','GET'])
def pinjam_admin():
    user = session.get('user')
        
    if validateUserAdmin.val_user_admin(user):
        if request.method == 'POST':
            nama = request.form.get('nama')
            kelas = request.form.get('kelas')
            pinjam = request.form.get('pinjam')
            kembali  = request.form.get('kembali')
        
            session['nama'] = nama
            session['kelas'] = kelas
            session['pinjam'] = pinjam
            session['kembali'] = kembali

            db.pinjam()
        
            return admin.peminjaman()
            
        if request.method == 'GET':
            return admin.peminjaman()
        
    else:
        return login()


class profil():
    @app.route('/profil')
    def profil():
        user = session.get('user')

        if validateUserAdmin.val_user_admin(user):
            return admin.profil()
        if user_client_valid(user):
            return client.profil_users()
        else:
            return redirect(url_for('login'))
            
        
@app.route('/daftarBuku', methods=['POST', 'GET'])
def list_book_admin():
    user = session.get('user')
    
    if validateUserAdmin.val_user_admin(user):
        
        session['user'] = user
        
        if request.method == 'POST':
            return admin.list_book()
        else:
            return admin.list_book()
    
    return redirect(url_for('login'))

@app.route('/updateBookCount', methods=['POST'])
def update_book_count():
    if request.method == 'POST':
        data = request.json
        namaBuku = data.get('nama')
        bookId = data.get('bookId')
        author = data.get('author')
        newCount = data.get('newCount')

        if bookId is not None and newCount is not None:
            db.update_book_count_and_save_to_database(bookId, namaBuku, author, newCount)
            
            session['bookId'] = bookId
            session['namaBuku'] = namaBuku
            
            return jsonify({'message': 'Jumlah buku berhasil diperbarui dan disimpan ke database.'}), 200
        else:
            return jsonify({'message': 'Data yang diperlukan tidak lengkap.'}), 400
        
    return redirect(url_for('list_book_admin'))
            
@app.route('/data-pengunjung')
def dataPengunjung():
    return admin.dataPengunjung()

@app.route('/daftar-buku')
def list_book_client():
    return client.listBook()

@app.route('/Scanner')
def scanner_qrCode():
    return admin.scanner()

@app.route('/video_feed')
def video_feed():
    return Response(adminQr.generateFrame(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
if __name__ == '__main__':
    
    if os.path.exists('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx'):
        workbook = openpyxl.load_workbook('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\data_pengunjung\\data.xlsx')
        worksheet = workbook.active    
    else:
        workbook = openpyxl.Workbook()
        worksheet = workbook.active

    app.run(
        host='localhost',
        debug=True
    )