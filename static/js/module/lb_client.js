const pinjamButtonsDesktop = document.querySelectorAll(".LB-Desktop .btn");
const pinjamButtonsMobile = document.querySelectorAll(".LB-Mobile .btn");
const myAlert = document.querySelector(".overlay");

const namaBukuInp = document.getElementById("nama_buku_input");
const namaBukuTag = document.getElementById("nama_buku");

const bookIdInp = document.getElementById("book_id");

const sisaBukuAtt = document.getElementById("sisa");

const penerbitBukuTagHtml = document.getElementById("penerbit");

let globalSisa;

pinjamButtonsDesktop.forEach((button, index) => {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";
        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInp.value = bookId;
        namaBukuInp.value = bookName;
        namaBukuTag.innerText = "Judul : " + bookName;
        penerbitBukuTagHtml.innerText = "Penerbit : " + authorName;
        sisaBukuAtt.innerText = "Sisa : " + sisa;

        globalSisa = sisa;
    });
});

pinjamButtonsMobile.forEach((button, index) => {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";
        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInp.value = bookId;
        namaBukuInp.value = bookName;
        namaBukuTag.innerText = "Judul : " + bookName;
        penerbitBukuTagHtml.innerText = "Penerbit : " + authorName;
        sisaBukuAtt.innerText = "Sisa : " + sisa;

        globalSisa = sisa;
    });
});

const cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", () => {
    myAlert.style.display = "none";
});

const btnPinjam = document.getElementById("btn-pinjam");
const namaClient = document.getElementById("nama");
const kelasClient = document.getElementById("kelas");
const nisnClient = document.getElementById("NISN");
const tglPinjam = document.getElementById("pinjam");

btnPinjam.addEventListener("click", () => {
    const bookId = bookIdInp.value;
    const bookName = namaBukuInp.value;
    const nama = namaClient.value;
    const kelas = kelasClient.value;
    const nisn = nisnClient.value;
    const tglValue = tglPinjam.value;
    const newCount = globalSisa;

    if (newCount !== null) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/pinjamBuku", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    const success = () => {
                        return (
                            `
                            <section id="myAlert" class="ovly">
                                <div class="cover-alert">
                                    <div class="alert-book" style="top: 15px;">
                                        <div class="data-pinjam-user">
                                            <h5>${response.message}</h5>
                                        </div>
                                        <div class="buttn">
                                            <button type="button" class="btn" id="btn-ok">
                                                Oke
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <style>
                                .cover-alert {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                }
                                .data-pinjam-user {
                                    width: 90%;
                                    text-align: center;
                                }
                                    .buttn {
                                    display: flex;
                                    justify-content: space-evenly;
                                }
                                    .btn,
                                    .btn-2 {
                                    padding: 10px 20px;
                                }
                            </style>
                            `
                        )
                    }
                    document.body.insertAdjacentHTML('beforeend', success());

                    document.getElementById('btn-ok').addEventListener('click', () => {
                        document.querySelector('.ovly').remove();
                        window.location.reload();
                    });
                } else {
                    const error = () => {
                        return (
                            `
                            <section id="myAlert" class="ovly">
                                <div class="cover-alert">
                                    <div class="alert-book" style="top: 15px;">
                                        <div class="data-pinjam-user">
                                            <h5>${response.message}</h5>
                                        </div>
                                        <div class="buttn">
                                            <button type="button" class="btn" id="btn-ok-2">
                                                Oke
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <style>
                                .cover-alert {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                }
                                .data-pinjam-user {
                                    width: 90%;
                                    text-align: center;
                                }
                                    .buttn {
                                    display: flex;
                                    justify-content: space-evenly;
                                }
                                    .btn,
                                    .btn-2 {
                                    padding: 10px 20px;
                                }
                            </style>
                            `
                        )
                    }
                    document.body.insertAdjacentHTML('beforeend', error());

                    document.getElementById('btn-ok-2').addEventListener('click', () => {
                        document.querySelector('.ovly').remove();
                    });
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
