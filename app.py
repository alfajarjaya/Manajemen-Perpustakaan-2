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

import os
import openpyxl
import datetime

import config.admin.admin as admin
from config.admin import qrCodeAdmin as adminQr
import config.admin.val_admin as validateUserAdmin

import config.client.client as client
from config.client.client_valid import name_and_pw_client
from config.client.client_valid import user_client_valid
from database.client import peminjaman

import config.import_json as json
import database.SQL.connect_to_SQL as db

app = Flask(__name__)
app.secret_key = 'manajemen-perpustakaan-smkn-1-mjk'

dataAdmin = json.adminUser
dataClient = json.clientUser


@app.route('/', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form.get('username')
        password = request.form.get('password')

        if user:
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
                return render_template('login.html', nf='Username or Password is wrong')
    
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
        return redirect(url_for('login'))


@app.route('/profil')
def profil():
    user = session.get('user')

    if validateUserAdmin.val_user_admin(user):
        return admin.profil()
    if user_client_valid(user):
        return client.profil_users()
    
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
        newCount = data.get('newCount')

        if bookId is not None and newCount is not None:
            db.update_book_count_and_save_to_database(bookId, namaBuku, newCount)
            
            session['bookId'] = bookId
            session['namaBuku'] = namaBuku
            
            return jsonify({'message' : 'Jumlah buku telah berhasil dirubah'}), 200
        else:
            return jsonify({'message' : 'Jumlah buku gagal dirubah'}), 400
        
    return redirect(url_for('list_book_admin'))
            
@app.route('/data-pengunjung')
def dataPengunjung():
    return admin.dataPengunjung()

@app.route('/Scanner')
def scanner_qrCode():
    return admin.scanner()

@app.route('/video_feed')
def video_feed():
    return Response(adminQr.generateFrame(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/tata-tertib-perpustakaan-SMKN-1-Mojokerto')
def tartib():
    user = session.get('user')
    
    if validateUserAdmin.val_user_admin(user):
        return admin.tataTertib()
    
    return redirect(url_for('login'))

@app.route('/daftar-buku')
def list_book_client():
    return client.listBook()

@app.route('/pinjamBuku', methods=['POST', 'GET'])
def pinjam_buku():
    if request.method == 'POST':
        data = request.json
        idBuku = data['bookId']
        namaBuku = data['bookName']
        sisaBuku = data['newCount']
        
        namaUser = data['nama']
        kelasUser = data['kelas']
        nisnUser = data['nisn']
        tglPinjam = data['tglPinjam']
        
        formatTglPinjam = datetime.datetime.strptime(tglPinjam, '%Y-%m-%d').date()
        
        peminjaman.peminjamanBuku(
            idBuku, namaBuku, namaUser, kelasUser, nisnUser, formatTglPinjam
        )
        sisaBukuTerbaru = int(sisaBuku) - 1
        
        db.update_book_count_and_save_to_database(idBuku, namaBuku, sisaBukuTerbaru)
       
        
        
        return jsonify({'message' : 'Berhasil meminjam buku, segera ambil buku di Perpustakaan.'}), 200
    
    return redirect(url_for('dataPeminjaman'))

@app.route('/data-peminjaman')
def dataPeminjaman():
    return client.peminjaman_buku()
    
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