from flask import render_template, request
import app
import database.db_sql as database
import assets.import_json as json

def home_user():
    user = app.session.get('user')
    return render_template('user/dashboard.html', userName=user)

def listBook():
    user = app.session.get('user')
    book = json.listBook
    return render_template('user/book_user.html', userName=user, book=book)