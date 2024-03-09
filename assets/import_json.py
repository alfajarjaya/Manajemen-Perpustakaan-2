import json

with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\admin\\user.json', 'r') as user_admin:
    adminUser = json.load(user_admin)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\client\\user.json', 'r') as user_client:
    clientUser = json.load(user_client)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\static\\json\\daftar_buku.json', 'r') as list_book:
    listBook = json.load(list_book)