import mysql.connector

def borrow_book(cursor, user_id, book_id, loan_date, return_date):
    table_name = f"user_{user_id}_loans"
    create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                id_peminjaman INT NOT NULL AUTO_INCREMENT,
                id_buku INT NOT NULL,
                nama_buku TEXT NOT NULL,
                nisn INT NOT NULL,
                PRIMARY KEY (id_peminjaman)
            )
    """
    insert_query = 'INSERT INTO user_oke_loans (id_peminjaman, id_buku, nama_bus, nisn) VALUES (%s, %s, %s,%s)'
    try:
        cursor.execute(create_table_query)
        print(f"Table '{table_name}' created successfully.")

        cursor.execute(insert_query, (book_id, loan_date, return_date))
        print("Data peminjaman buku berhasil disimpan.")
    except Exception as e:
        print("Error:", e)

user_id = 'oke'
book_id = 101
loan_date = "2024-04-02"
return_date = "2024-04-16"

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tkj-1"
)
cursor = connection.cursor()

borrow_book(cursor, user_id, book_id, loan_date, return_date)

connection.commit()
cursor.close()
connection.close()
