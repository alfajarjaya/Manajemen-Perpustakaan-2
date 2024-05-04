const myAlert = document.getElementById("myAlert");

const btnDetails = document.querySelectorAll(".btn-details");
btnDetails.forEach((btn) => {
    btn.addEventListener("click", () => {
        let info = btn.getAttribute("data-info");
        info = info.slice(1, -1);

        const arrayForInfo = info.split(',').map(item => item.trim().replace(/'/g, ''));

        let dataPinjamUser = document.querySelector(".data-pinjam-user");
        dataPinjamUser.innerHTML = "";

        dataPinjamUser.innerHTML = `
            <div class="desc">
                <h3>Informasi Peminjaman</h3>
                <hr>
                <p>ID Peminjaman : <span class="id">${arrayForInfo[0]}</span></p>
                <p>ID Buku : <span>${arrayForInfo[1]}</span></p>
                <p>Judul Buku : <span>${arrayForInfo[2]}</span></p>
                <p>Nama : <span class="nam">${arrayForInfo[3]}</span></p>
                <p>Kelas : <span>${arrayForInfo[4]}</span></p>
                <p>NISN : <span>${arrayForInfo[5]}</span></p>
                <p>Tgl Pinjam : <span>${arrayForInfo[6]}</span></p>
                <p>Tgl Kembali : <span>${arrayForInfo[7]}</span></p>
            </div>
        `;
        myAlert.style.display = "block";
    });
});

const btnRemoveDataTabel = document.getElementById('btn-rmv');

btnRemoveDataTabel.addEventListener('click', () => {
    const name = document.querySelector('p .nam').textContent;
    const id = document.querySelector('p .id').textContent;

    let confirmation = () => {
        return (
            `
            <section id="myAlert" class="ovly">
                <div class="cover-alert">
                    <div class="alert-book" style="top: 15px;">
                        <div class="data-pinjam-user">
                            <h5>Apakah anda yakin ingin menghapus data dari <u>'${name}'</u> dengan ID Peminjaman <u>'${id}'</u> ?</h5>
                        </div>
                        <div class="buttn">
                            <button type="button" class="btn" id="btn-rmv-conf">
                                ya
                            </button>
                            <button type="button" class="btn-2" id="btn-cncl-conf">
                                tidak
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            `
        )

    }
    document.body.insertAdjacentHTML('beforeend', confirmation());

    document.getElementById('btn-rmv-conf').addEventListener('click', () => {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/remove_data', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                document.querySelector('.ovly').remove();

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
                                            <button type="button" class="btn" id="btn-ok-conf">
                                                Oke
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        `
                    )
                }

                document.body.insertAdjacentHTML('beforeend', success());
                document.getElementById('btn-ok-conf').addEventListener('click', () => {
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
                                            <h5>Data gagal dihapus !!</h5>
                                        </div>
                                        <div class="buttn">
                                            <button type="button" class="btn" id="btn-ok-conf">
                                                Oke
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        `
                    )
                }

                document.body.insertAdjacentHTML('beforeend', error());
                document.getElementById('btn-ok-conf').addEventListener('click', () => {
                    document.querySelector('.ovly').remove();
                });
            }
        };
        xhr.send(JSON.stringify(
            {
                name: name,
                id: id
            })
        );
    });

    document.getElementById('btn-cncl-conf').addEventListener('click', () => {
        document.querySelector('.ovly').remove();
    });
});

const btnKembali = document.getElementById("btn-cancel");
btnKembali.addEventListener("click", function () {
    myAlert.style.display = "none";
});
