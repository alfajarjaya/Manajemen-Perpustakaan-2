const btnRemove = document.querySelectorAll(".btn-remove");

btnRemove.forEach((button) => {
    button.addEventListener("click", function (event) {
        let tableName = this.getAttribute("data-name");
        let confirmation = confirm(
            `Apakah Anda yakin ingin menghapus tabel ${tableName} ?`
        );
        if (confirmation) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/remove_table", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let tableRow = event.target.closest(".t-row");
                    tableRow.parentNode.removeChild(tableRow);
                    alert(`Tabel ${tableName} telah dihapus.`);
                    window.location.reload();
                } else {
                    alert(`Gagal menghapus tabel ${tableName}.`);
                }
            };
            xhr.send(JSON.stringify({ tableName: tableName }));
        }
    });
});

const myAlert = document.getElementById("myAlert");
const btnDetails = document.querySelectorAll(".btn-details");
btnDetails.forEach((btn) => {
    btn.addEventListener("click", function () {
        let info = btn.getAttribute("data-info");
        info = info.slice(1, -1); 
        const arrayForInfo = info.split(',').map(item => item.trim().replace(/'/g, '')); 

        let dataPinjamUser = document.querySelector(".data-pinjam-user");
        dataPinjamUser.innerHTML = "";
        dataPinjamUser.innerHTML = `
                <p>ID Buku : <u class="id">${arrayForInfo[0]}</u></p>
                <p>Judul Buku : <u>${arrayForInfo[1]}</u></p>
                <p>Nama : <u class="nam">${arrayForInfo[2]}</u></p>
                <p>Kelas : <u>${arrayForInfo[3]}</u></p>
                <p>NISN : <u>${arrayForInfo[4]}</u></p>
                <p>Tgl Pinjam : <u>${arrayForInfo[5]}</u></p>
                <p>Tgl Kembali : <u>${arrayForInfo[6]}</u></p>
        `;
        myAlert.style.display = "block";
    });
});

const btnKembali = document.getElementById("btn-cancel");
btnKembali.addEventListener("click", function () {
    myAlert.style.display = "none";
});

const btnRemoveDataTabel = document.getElementById('btn-rmv');

btnRemoveDataTabel.addEventListener('click', () => {
    const name = document.querySelector('p .nam').textContent;
    const id = document.querySelector('p .id').textContent;

    const confirmation = confirm(
        `Apakah kamu yakin ingin menghapus data dari ${name} dengan buku id ${id} ?`
    )

    if(confirmation) {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/remove_data', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                alert(response.message);
                window.location.reload();
            } else {
                alert('Data gagal dihapus');
            }
        };
        xhr.send(JSON.stringify(
            {
                name: name, 
                id: id 
            })
        );
    }
})