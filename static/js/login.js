const btnLogin = document.getElementById("btn");

btnLogin.addEventListener("click", () => {
    window.location.href = window.Login;
});

const btnCheckPw = document.getElementById("checkPw");

btnCheckPw.addEventListener("click", () => {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
        pw.type = "text";
    } else {
        pw.type = "password";
    }
});
