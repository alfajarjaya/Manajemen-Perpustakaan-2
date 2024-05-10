const menuIcon = document.getElementById('menu-icon');
const menuIconX = document.getElementById('menu-iconX');
const menuList = document.getElementById('menu-list');

menuIcon.addEventListener('click', function () {
    menuList.style.display = 'block';
    menuIcon.classList.toggle('hidden');
    menuIconX.classList.toggle('hidden');
});

menuIconX.addEventListener('click', function () {
    menuList.style.display = 'none';
    menuIcon.classList.toggle('hidden');
    menuIconX.classList.toggle('hidden');
});


document.addEventListener("DOMContentLoaded", function () {
    var menuLinks = document.querySelectorAll(".list-item a");

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                var hash = this.hash;
                var targetElement = document.querySelector(hash);

                if (targetElement) {
                    var targetOffset = targetElement.offsetTop;
                    var duration = 1500;
                    var startTime = performance.now();

                    function animateScroll(currentTime) {
                        var elapsed = currentTime - startTime;
                        window.scrollTo(
                            0,
                            easeInOutExpo(elapsed, 0, targetOffset, duration)
                        );

                        if (elapsed < duration) {
                            requestAnimationFrame(animateScroll);
                        }
                    }

                    function easeInOutExpo(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
                        t--;
                        return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
                    }

                    requestAnimationFrame(animateScroll);
                }
            }
        });
    });
});


const scAlert = document.createElement("script");
scAlert.src = "/assets/script/sweetalert.js";
document.body.appendChild(scAlert);

scAlert.onload = () => {
    if (window.location.href.indexOf('view-source:') > -1) {
        window.location.href = '/';
    } else if (
        document.addEventListener('contextmenu', function (event) {
            Swal.fire({
                title: 'Error!',
                text: 'You have pressed the right button.',
                icon: 'error',
                confirmButtonText: 'Oke'
            })
            event.preventDefault();
        })
    );

    const rdMr = document.getElementById('rd-mr');
    rdMr.onclick = () => {
        Swal.fire({
            title: '404',
            text: 'Maaf menu belum tersedia.',
            icon: 'info',
        })
    }
}