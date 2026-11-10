document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("No se encontró el formulario loginForm");
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value;
        const mensaje = document.getElementById("mensajeLogin");

        console.log("Intentando iniciar sesión...");

        if (usuario === "admin" && password === "CMMS2026") {

            localStorage.setItem("cmmsAdmin", "true");

            window.location.assign("./resultados.html");

        } else {

            mensaje.textContent = "Usuario o contraseña incorrectos.";
            mensaje.style.color = "red";

        }

    });

});