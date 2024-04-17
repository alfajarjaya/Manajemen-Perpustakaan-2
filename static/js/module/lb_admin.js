const editButtonsDesktop = document.querySelectorAll(".LB-Desktop .btn");
const editButtonsMobile = document.querySelectorAll(".LB-Mobile .btn");
const myAlert = document.getElementById("myAlert");

const namaBukuInput = document.getElementById("nama_buku_input");
const namaBuku = document.getElementById("nama_buku");

const bookIdInput = document.getElementById("book_id");

const sisaBukuInput = document.getElementById("sisa_buku");
const sisaBukuAttribute = document.getElementById("sisa");

const penerbitBukuTag = document.getElementById("penerbit");

const cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", () => {
    myAlert.style.display = "none";
    bookIdInput.value = "";
    namaBukuInput.value = "";
    namaBuku.innerText = "";
    penerbitBukuTag.innerText = "";
    sisaBukuAttribute.innerText = "";
    sisaBukuInput.value = "";
});

for (const button of editButtonsDesktop) {
    button.addEventListener("click", (event) => {
        const clickedButton = event.currentTarget;
        myAlert.style.display = "block";
        const bookId = clickedButton.getAttribute("data-book-id");
        const bookName = clickedButton.getAttribute("data-book-name");
        const authorName = clickedButton.getAttribute("data-book-author");
        const sisa = clickedButton
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = `Judul : ${bookName}`;
        penerbitBukuTag.innerText = `Penerbit : ${authorName}`;
        sisaBukuAttribute.innerText = `Sisa : ${sisa}`;
    });
}

for (const button of editButtonsMobile) {
    button.addEventListener("click", (event) => {
        const clickedButton = event.currentTarget;
        myAlert.style.display = "block";
        const bookId = clickedButton.getAttribute("data-book-id");
        const bookName = clickedButton.getAttribute("data-book-name");
        const authorName = clickedButton.getAttribute("data-book-author");
        const sisa = clickedButton
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = `Judul : ${bookName}`;
        penerbitBukuTag.innerText = `Penerbit : ${authorName}`;
        sisaBukuAttribute.innerText = `Sisa : ${sisa}`;
    });
}

const saveBtn = document.querySelector("#btn-save");
saveBtn.addEventListener("click", () => {
    const bookId = bookIdInput.value;
    const bookName = namaBukuInput.value;
    const newCount = sisaBukuInput.value;

    if (newCount !== null) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/updateBookCount", true);
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
                                            <button type="button" class="btn" id="btn-ok-done">
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

                    document.getElementById('btn-ok-done').addEventListener('click', () => {
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
                                            <button type="button" class="btn" id="btn-ok-done2">
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

                    document.getElementById('btn-ok-done2').addEventListener('click', () => {
                        document.querySelector('.ovly').remove();
                    });
                }
            }
        };
        const data = JSON.stringify({
            bookId: bookId,
            nama: bookName,
            newCount: newCount,
        });
        xhr.send(data);
        sisaBukuInput.value = '';
    }
});