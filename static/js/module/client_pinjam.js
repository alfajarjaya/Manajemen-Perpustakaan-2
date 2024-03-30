const btnPinjam = document.querySelectorAll('#btn-pinjam');
const myAlert = document.querySelector('.overlay');

btnPinjam.forEach(function(btnPinjamClient) {
    btnPinjamClient.addEventListener("click", () => {
        myAlert.style.display = "block";
    });
});

const cancelBtn = document.querySelector("#btn-cancel");
cancelBtn.addEventListener("click", function () {
    myAlert.style.display = "none";
})