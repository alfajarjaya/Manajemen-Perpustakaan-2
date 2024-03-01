from flask import render_template, request
import app
import database.db_sql as database

def home_user():
    user = app.session.get('user')
    return render_template('user/dashboard.html', userName=user)