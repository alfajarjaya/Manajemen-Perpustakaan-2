import json

with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\admin\\user.json', 'r') as ua:
    adminUser = json.load(ua)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\client\\user.json', 'r') as uc:
    clientUser = json.load(uc)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\database\\client\\profil.json', 'r') as dc:
    dataClient = json.load(dc)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\static\\json\\daftar_buku.json', 'r') as lb:
    listBook = json.load(lb)
    
with open('D:\\produktif bu Tya\\manajemen_perpustakaan-2\\static\\json\\buku.json', 'r') as lbg:
    listGambarBuku = json.load(lbg)
    