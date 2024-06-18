from flask import render_template
import app
import database.SQL.connect_to_SQL as database
import config.import_json as json
import config.client.client_valid as clientValid
from database.client import peminjaman as db_pinjam_user

valClient = clientValid.client_valid()

def home_user():
    user = app.session.get('user')
    return render_template('client/dashboard.html', userName=user)

def listBook():
    user = app.session.get('user')
    bookSisa = []
    book = json.listBook
    dataUser = valClient.profilUser(user)
    data = {
        'nama': dataUser[2],
        'nomor': dataUser[3],
        'kelas': dataUser[4]
    }
    
    for key, val in book.items():
        for title, fill in val.items():
            book_id = fill['id']
            nama_buku = fill['nama']
            sisa = database.selectBook(book_id, nama_buku)
            bookSisa.append({'fill': fill, 'sisa': sisa})
            
            for books in bookSisa:
                if books['sisa'] is None:
                    return '''
                            <div class="container">
                                <h2>Terjadi sedikit kesalahan</h2>
                                <hr>
                                <p>Data buku tidak tersedia</p>
                            </div>
                        '''
            
    return render_template(
        'client/book_user.html', 
        userName=user, 
        bookSisa=bookSisa, 
        book=book, 
        data=data
    )

def profil_users():
    user = app.session.get('user')
    data_user = valClient.profilUser(username=user)
    print(data_user)
    
    return render_template(
            'client/profil.html', 
            userName=user,
            nama=data_user[2],
            nomor=data_user[3],
            kelas=data_user[4]
        )
        
def peminjaman_buku():
    user = app.session.get('user')
    valueData = valClient.profilUser(user)
    valueDataName = valueData[2].lower()
    
    data = db_pinjam_user.selectUserDatabase(valueDataName)
    
    return render_template(
        'client/pinjam_user.html',
        userName=user,
        data=data
    )