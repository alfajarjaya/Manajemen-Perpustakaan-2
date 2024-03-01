// var nama = document.getElementById('nama').value;
// var kelas = document.getElementById('kelas').value;
// var pinjam = document.getElementById('pinjam').value;
// var kembali = document.getElementById('kembali').value;
// var btnSend = document.getElementById('to-pinjam-user');

// function sendToDatabase() {
//     if (!nama || !kelas || !pinjam || !kembali) {
//         alert('Harap isi form terlebih dahulu')
//         return
//     } else {
//         alert('Data berhasil masuk')
//     }
// }

// btnSend.addEventListener('click', () => {
//     sendToDatabase()
// })


var user = document.getElementById('username');
var pw = document.getElementById('password');

if (!user || !pw) {
    alert('Isi dengan benar !')
    return
} else {
    alert('Good JOB')
}