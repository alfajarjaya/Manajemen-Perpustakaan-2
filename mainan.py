import os
import mysql.connector

def upload_images_to_mysql():
    try:
        # Koneksi ke database
        connection = mysql.connector.connect(
            host='localhost',
            database='uji',
            user='root',
            password=''
        )

        cursor = connection.cursor()

        c = cursor.execute('SELECT `mwah` FROM `keok` WHERE CHAR_LENGTH(`keok`.`mwah`)  = 3379')
        result = cursor.fetchall()
        print(result)

        

    except mysql.connector.Error as error:
        print(f'Error: {error}')

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Koneksi ke MySQL ditutup.")

upload_images_to_mysql()

