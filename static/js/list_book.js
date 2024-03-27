const imgBuku = [];

const editButtonsDesktop = document.querySelectorAll(".LB-Desktop .btn");
const editButtonsMobile = document.querySelectorAll(".LB-Mobile .btn");
const myAlert = document.getElementById("myAlert");
const namaBukuInput = document.getElementById("nama_buku_input");
const namaBuku = document.getElementById("nama_buku");
const bookIdInput = document.getElementById("book_id");
const sisaBukuInput = document.getElementById("sisa_buku");
const bookFromMobile = document.querySelectorAll('.LB-Mobile .list-item img').forEach(function(imgElement) {
    imgBuku.push(imgElement.getAttribute('src'));
});

editButtonsDesktop.forEach(function (button, index) {
    button.addEventListener("click", function () {
        myAlert.style.display = "block";
        const bookId = this.getAttribute("data-book-id");
        const bookName = this.getAttribute("data-book-name");

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = bookName;
        
        document
            .getElementById("nama_buku_image")
            .setAttribute("src", imgBuku[index]);
    });
});

editButtonsMobile.forEach(function (button, index) {
    button.addEventListener("click", function () {
        myAlert.style.display = "block";

        const bookId = this.getAttribute("data-book-id");
        const bookName = this.getAttribute("data-book-name");
        const bookImageSrc = this.closest(".list-item")
            .querySelector("img")
            .getAttribute("src");

        bookIdInput.value = bookId;
        namaBukuInput.value = bookName;
        namaBuku.innerText = bookName;
        document
            .getElementById("nama_buku_image")
            .setAttribute("src", bookImageSrc);
    });
});

const cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", function () {
    myAlert.style.display = "none";
});

const saveBtn = document.querySelector("#btn-save");
saveBtn.addEventListener("click", function () {
    const bookId = bookIdInput.value
    const bookName = namaBukuInput.value
    const newCount = sisaBukuInput.value

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
            newCount: newCount,
            nama: bookName,
        });
        xhr.send(data);
    }
});
