const namaBukuInpt = document.getElementById("nama_buku_input");
const idBuku = document.getElementById("book_id");
const sisaBuku = document.getElementById("sisa_buku");

const sisaTagHtml = document.querySelector('.tersisa');

// if (sisaTagHtml === -1){
//     sisaTagHtml.innerText = "Sisa : 0";
// }

function ListBookToDatabase() {
    const saveBtn = document.querySelector("#btn-save");
    saveBtn.addEventListener("click", () => {
        const bookId = idBuku.value;
        const bookName = namaBukuInpt.value;
        const newCount = sisaBuku.value;

        if (newCount !== null) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/updateBookCount", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        alert(response.message);
                        window.location.reload();
                    } else {
                        alert("Gagal memperbarui jumlah buku.");
                    }
                }
            };
            const data = JSON.stringify({
                bookId: bookId,
                nama: bookName,
                newCount: newCount,
            });
            xhr.send(data);
            sisaBukuInput.value = "";
        }
    });
}

function peminjamanBukuClient() {
    const btnPinjam = document.getElementById("btn-pinjam");
    const namaClient = document.getElementById("nama");
    const kelasClient = document.getElementById("kelas");
    const nisnClient = document.getElementById("NISN");
    const tglPinjam = document.getElementById("pinjam");
    const sisaBukuHidden = document.getElementById("sisa_buku_hidden");

    btnPinjam.addEventListener("click", () => {
        const bookId = idBuku.value;
        const bookName = namaBukuInpt.value;
        const nama = namaClient.value;
        const kelas = kelasClient.value;
        const nisn = nisnClient.value;
        const tglValue = tglPinjam.value;
        const newCount = sisaBukuHidden.value;

        if (newCount !== null) {
            console.log(tglValue);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/pinjamBuku", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        alert(response.message);
                        window.location.reload();
                    } else {
                        alert("Gagal meminjam buku.");
                    }
                }
            };
            const data = JSON.stringify({
                bookId: bookId,
                bookName: bookName,
                newCount: newCount,
                nama: nama,
                kelas: kelas,
                nisn: nisn,
                tglPinjam: tglValue,
            });
            xhr.send(data);
            tglPinjam.value = "";
        }
    });
}
