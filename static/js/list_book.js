var sisaBukuAttribute = document.getElementById("sisa");
const editButtonsDesktop = document.querySelectorAll(".LB-Desktop .btn");
const editButtonsMobile = document.querySelectorAll(".LB-Mobile .btn");
const myAlert = document.getElementById("myAlert");
const namaBukuInput = document.getElementById("nama_buku_input");
const namaBuku = document.getElementById("nama_buku");
const bookIdInput = document.getElementById("book_id");
const sisaBukuInput = document.getElementById("sisa_buku");
const penerbitBukuTag = document.getElementById("penerbit");
const authorNameInput = document.querySelectorAll('.list input');
const authorNameAttribute = authorNameInput[1].getAttribute('data-author-value');

console.log(authorNameAttribute);

var cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", function () {
    myAlert.style.display = "none";
    bookIdInput.value = "";
    namaBukuInput.value = "";
    namaBuku.innerText = "";
    penerbitBukuTag.innerText = "";
    sisaBukuAttribute.innerText = "";
});

editButtonsDesktop.forEach(function (button, index) {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";
        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = "Judul : " + bookName;
        penerbitBukuTag.innerText = "Penerbit : " + authorName;
        sisaBukuAttribute.innerText = "Sisa : " + sisa;

    });
});

editButtonsMobile.forEach(function (button, index) {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";

        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button
            .closest(".list")
            .querySelector('[name="sisa_buku_input"]').value;

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = "Judul : " + bookName;
        penerbitBukuTag.innerText = "Penerbit: " + authorName;
        sisaBukuAttribute.innerText = "Sisa : " + sisa;
    });
});

const saveBtn = document.querySelector("#btn-save");
saveBtn.addEventListener("click", () => {
    const bookId = bookIdInput.value;
    const bookName = namaBukuInput.value;
    const newCount = sisaBukuInput.value;

    const authorName = authorNameInput.value;

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
            author: authorName,
            newCount: newCount,
        });
        xhr.send(data);
        sisaBukuInput.value = "";
    }
});
