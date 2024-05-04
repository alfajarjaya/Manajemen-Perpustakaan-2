const script = document.createElement("script");
// script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
script.src = "/static/modules/sweetalert.js";
document.head.appendChild(script);

const btnRemove = document.querySelectorAll(".btn-remove");

btnRemove.forEach((button) => {
    button.addEventListener("click", (event) => {
        let tableName = button.getAttribute("data-name");

        const confirmation = script.onload = () => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                }
            });
        };
        // const confirmation = () => {
        //     return `
        //         <section id="myAlert" class="ovly">
        //             <div class="cover-alert">
        //                 <div class="alert-book" style="top: 15px;">
        //                     <div class="data-pinjam-user">
        //                         <h5>Apakah anda yakin ingin menghapus tabel <u>'${tableName}'</u> ?</h5>
        //                     </div>
        //                     <div class="buttn">
        //                         <button type="button" class="btn" id="btn-rmv">
        //                             remove
        //                         </button>
        //                         <button type="button" class="btn-2" id="btn-cancel">
        //                             back
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //         <style>
        //             .cover-alert {
        //                 display: flex;
        //                 justify-content: center;
        //                 align-items: center;
        //                 height: 100vh;
        //             }
        //             .data-pinjam-user {
        //                 width: 90%;
        //                 text-align: center;
        //             }
        //             .buttn {
        //                 display: flex;
        //                 justify-content: space-evenly;
        //             }
        //             .btn,
        //             .btn-2 {
        //                 padding: 10px 20px;
        //             }
        //         </style>
        //         `;
        // };

        // document.body.insertAdjacentHTML("beforeend", confirmation());

        document.getElementById("btn-rmv").addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/remove_table", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    let tableRow = event.target.closest(".t-row");
                    tableRow.parentNode.removeChild(tableRow);
                    const success = () => {
                        return `
                            <section id="myAlert" class="ovly">
                                <div class="cover-alert">
                                    <div class="alert-book" style="top: 15px;">
                                        <div class="data-pinjam-user">
                                            <h5>Tabel <u>'${tableName}'</u> berhasil dihapus</h5>
                                        </div>
                                    <div class="buttn">
                                        <button type="button" class="btn" id="btn-ok">
                                            Oke
                                        </button>
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
                            `;
                    };

                    document.body.insertAdjacentHTML("beforeend", success());

                    document.getElementById("btn-ok").addEventListener("click", () => {
                        document.querySelector(".ovly").remove();
                        window.location.reload();
                    });
                } else {
                    const error = () => {
                        return `
                            <section id="myAlert" class="ovly">
                                <div class="cover-alert">
                                    <div class="alert-book" style="top: 15px;">
                                        <div class="data-pinjam-user">
                                            <h5>Tabel <u>'${tableName}'</u> gagal dihapus</h5>
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
                            
                            `;
                    };
                    document.body.insertAdjacentHTML("beforeend", error());

                    document.getElementById("btn-ok").addEventListener("click", () => {
                        document.querySelector(".ovly").remove();
                    });
                }
            };
            xhr.send(JSON.stringify({ tableName: tableName }));
            document.querySelector(".ovly").remove();
        });

        document.getElementById("btn-cancel").addEventListener("click", () => {
            document.querySelector(".ovly").remove();
        });
    });
});
