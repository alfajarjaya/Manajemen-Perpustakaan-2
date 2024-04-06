const pinjamButtonsDesktop = document.querySelectorAll(".LB-Desktop .btn");
const pinjamButtonsMobile = document.querySelectorAll(".LB-Mobile .btn");
const myAlert = document.querySelector('.overlay');

const namaBukuInp = document.getElementById("nama_buku_input");
const namaBukuTag = document.getElementById("nama_buku");

const bookIdInp = document.getElementById("book_id");

const sisaBukuInput = document.getElementById("sisa_buku_hidden");
const sisaBukuAtt = document.getElementById("sisa");

const penerbitBukuTagHtml = document.getElementById("penerbit");


pinjamButtonsDesktop.forEach((button, index) => {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";
        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button.closest(".list").querySelector('[name="sisa_buku_input"]').value;

        bookIdInp.value = bookId;
        namaBukuInp.value = bookName;
        namaBukuTag.innerText = "Judul : " + bookName;
        penerbitBukuTagHtml.innerText = "Penerbit : " + authorName;
        sisaBukuAtt.innerText = "Sisa : " + sisa; 
    });
});

pinjamButtonsMobile.forEach((button, index) => {
    button.addEventListener("click", () => {
        myAlert.style.display = "block";
        const bookId = button.getAttribute("data-book-id");
        const bookName = button.getAttribute("data-book-name");
        const authorName = button.getAttribute("data-book-author");
        const sisa = button.closest(".list").querySelector('[name="sisa_buku_input"]').value;
        
        bookIdInp.value = bookId;
        namaBukuInp.value = bookName;
        namaBukuTag.innerText = "Judul : " + bookName;
        penerbitBukuTagHtml.innerText = "Penerbit : " + authorName;
        sisaBukuAtt.innerText = "Sisa : " + sisa;
    });
});


const cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", function () {
    myAlert.style.display = "none";
})