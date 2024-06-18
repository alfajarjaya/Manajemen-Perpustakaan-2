const alert = document.createElement('script');
alert.src = '/static/modules/sweetalert.js';
document.head.appendChild(alert);
alert.onload = () => {
    const [username, password, nama, nomor, kelas] = document.getElementsByTagName('input');

    const button = document.getElementById('submit-btn');

    button.addEventListener('click', (e) => {
        if (username.value === '' || password.value === '' || nama.value === '' || nomor.value === '' || kelas.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua field harus diisi!',
            })
            e.preventDefault();
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/add-new-user', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.status === 200 && xhr.status === 'success') {
                    const response = JSON.parse(xhr.responseText);
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: response.message,
                        showConfirmButton: false,
                    });
                }
                data = JSON.stringify({
                    username: username.value,
                    password: password.value,
                    nama: nama.value,
                    nomor: nomor.value,
                    kelas: kelas.value,
                })
                xhr.send(data)
                console.log(data)
                [username, password, nama, nomor, kelas].forEach(e => e.value = '');
            }
        }
    })
}