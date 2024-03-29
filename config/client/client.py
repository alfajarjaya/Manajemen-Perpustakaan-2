from flask import render_template, request
import app
import database.db_sql as database
import config.import_json as json
from config.client import client_valid as valClient

def home_user():
    user = app.session.get('user')
    return render_template('client/dashboard.html', userName=user)

def listBook():
    user = app.session.get('user')
    bookSisa = []
    book = json.listBook
    
    for key, val in book.items():
        for title, fill in val.items():
            book_id = fill['id']
            nama_buku = fill['nama']
            sisa = database.selectBook(book_id, nama_buku)
            bookSisa.append({'fill': fill, 'sisa': sisa})
            
            for books in bookSisa:
                if books['sisa'] is None:
                    books['sisa'] = 'Data tidak tersedia'
            
    return render_template('client/book_user.html', userName=user, bookSisa=bookSisa, book=book)

def profil_users():
    user = app.session.get('user')
    data_user = valClient.databaseProfil(user)
    
    if data_user:   
        return render_template(
            'client/profil.html', 
                               userName=user,
                               nama=data_user['nama'],
                               kelas=data_user['kelas'],
                               nomor=data_user['nomor']
                           )
    else:
        return "Username tidak ditemukan"