import mysql.connector
from flask import jsonify

class client_valid():
    def __init__(self) -> None:
        self.database = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='sistemperpustakaan_admin',
        )
        self.cursor = self.database.cursor()

    def selectUser(self, username):
        self.cursor.execute("SELECT username FROM database_client WHERE username = %s", (username,))
        result = self.cursor.fetchone()
        return result is not None

    def selectUser_Password(self, username, password):
        self.cursor.execute("SELECT username, password FROM database_client WHERE username = %s AND password = %s", (username, password))
        result = self.cursor.fetchone()
        return result is not None

    def profilUser(self, username):
        self.cursor.execute("SELECT * FROM database_client WHERE username = %s", (username,))
        result = self.cursor.fetchone()
        return result

    def insertNewUser(self, username, password, nama, nisn, kelas):
        self.cursor.execute("INSERT INTO database_client (username, password, nama, nomor_induk, kelas) VALUES (%s, %s, %s, %s, %s)", (username, password, nama, nisn, kelas))
        self.database.commit()
        self.database.close()