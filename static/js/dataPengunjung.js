const btnRemove = document.querySelectorAll(".btn-remove");

btnRemove.forEach((btnRemove) => {
    btnRemove.addEventListener('click', (event) => {
        const buttonData = btnRemove.getAttribute('data');
        let arrayForButtonData = buttonDatan
        console.log(arrayForButtonData)
        confirm(
            `Apakah kamu ingin menghapus data dari ${arrayForButtonData} ?`
        )
        
    });
});