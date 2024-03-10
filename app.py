from flask import (
    Flask,
    render_template,
    request,
    session,
    redirect,
    url_for
)

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
                session['password'] = password
                
                db.add_login()
                
                return dashboard.home()
            else:
                render_template('login.html', nf='Username not found')
                
            for keys, value in dataClient.items():
                namec = value['user']
                pwc = value['password']

                if user == namec and password == pwc:
                    session['user'] = user
                    session['password'] = password
                    
                    db.add_login()
                    return dashboard.home()
                else:
                    return render_template('login.html', nf='Username not found')

        return render_template('login.html', error='username / password is wrong')

    return render_template('login.html')

class dashboard:
    @app.route('/dashboard', methods=['POST', 'GET'])
    def home():
        user = session.get('user')

        if user:
            for key, value in dataAdmin.items():
                name = value['user']
                if user == name:
                    return admin.home()

            for keys, values in dataClient.items():
                name = values['user']
                if user == name:
                    return client.home_user()

        return login()

                
@app.route('/admin_pinjam', methods=['POST','GET'])
def pinjam_admin():
    user = session.get('user')
    
    for key, val in dataAdmin.items():
        name = val['user']
        
        if user == name:
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

    
    return admin.peminjaman()

@app.route('/profil')
def profil_admin():
    user = session.get('user')
    
    for key,val in dataAdmin.items():
        name = val['user']
        
        if user == name:
            return admin.profil()
        else:
            return render_template('login.html', nf='Username not found')
        
@app.route('/daftarBuku', methods=['POST', 'GET'])
def list_book_admin():
    tersisa_inp = request.form.get('tersisa_inp')
    session['tersisa_inp'] = tersisa_inp
    
    user = session.get('user')
    
    for key,val in dataAdmin.items():
        name = val['user']
        
        if user == name:
            if request.method == 'POST':
        
                admin.listBook()
                db.insert_listBook()
                
            return admin.listBook()
            
        return render_template('login.html', nf='Username not found')
            
@app.route('/data-pengunjung')
def dataPengunjung():
    return admin.dataPengunjung()

@app.route('/daftar-buku')
def list_book_client():
    return client.listBook()

        
if __name__ == '__main__':
    app.run(
        host='localhost',
        debug=True
    )