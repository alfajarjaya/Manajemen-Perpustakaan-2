document.addEventListener("DOMContentLoaded", function () {
    var tersisaElement = document.querySelector('.tersisa');
    var tersisaValueInput = document.querySelector('.tersisa_value');
    var btnPlus = document.querySelector('.plus');
    var btnMinus = document.querySelector('.minus');
    var jumlahTersisa = 0;

    function tambahJumlah() {
        jumlahTersisa++;
        updateTersisa();
    }

    function kurangJumlah() {
        if (jumlahTersisa > 0) {
            jumlahTersisa--;
            updateTersisa();
        }
    }

    function updateTersisa() {
        tersisaElement.forEach(function(sisa) {
            sisa.textContent = "Tersisa : " + jumlahTersisa;
            tersisaValueInput.value = jumlahTersisa;
        })
    }

    btnPlus.addEventListener('click', () => {
        tambahJumlah()
    })

    btnMinus.addEventListener('click', () => {
        kurangJumlah()
    })
});
