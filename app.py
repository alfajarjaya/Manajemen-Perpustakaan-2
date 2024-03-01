from flask import Flask, render_template, request, session, redirect, url_for
import assets.admin as admin
import assets.client as client
import assets.import_json as json
import database.db_sql as db

app = Flask(__name__)
app.secret_key = '1'

dataAdmin = json.adminUser
dataClient = json.clientUser


@app.route('/', methods=['POST', 'GET'])
def login():
    user = request.form.get('username')
    password = request.form.get('password')

    if request.method == 'POST':
        for key, values in dataAdmin.items():
            name = values['user']
            pw = values['password']

            if user == name and password == pw:
                session['user'] = user
                return dashboard.home()

        for keys, value in dataClient.items():
            namec = value['user']
            pwc = value['password']

            if user == namec and password == pwc:
                session['user'] = user
                return dashboard.home()

        return render_template('login.html', error='username / password is wrong')

    return render_template('login.html')

class dashboard:
    @app.route('/dashboard', methods=['POST','GET'])
    def home():
        user = session.get('user')
        for key, value in dataAdmin.items():
            name = value['user']
            if user == name:
                return admin.home()
            else:
                return client.home_user()
            
@app.route('/admin_pinjam', methods=['POST','GET'])
def pinjam_admin():
    
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
        
    return admin.peminjaman()

@app.route('/profil')
def profil_admin():
    return admin.profil()

@app.route('/daftarBuku')
def list_book_admin():
    return admin.listBook()

@app.route('/data-pengunjung')
def dataPengunjung():
    return admin.dataPengunjung()

        
if __name__ == '__main__':
    app.run(
        host='localhost',
        debug=True
    )