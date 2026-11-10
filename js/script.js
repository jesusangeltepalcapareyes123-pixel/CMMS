// ===============================
// LOGIN DE DEMOSTRACION
// ===============================

const loginForm = document.getElementById("loginForm");

const mensajeLogin = document.getElementById("mensajeLogin");

loginForm.addEventListener("submit", function (event) {

    // Evitar que se recargue la pagina
    event.preventDefault();

    // Obtener los datos del formulario
    const usuario = document.getElementById("usuario").value;

    const password = document.getElementById("password").value;

    // Credenciales temporales de prueba
    const usuarioAdmin = "admin";

    const passwordAdmin = "CMMS2026";

    // Validar las credenciales
    if (
        usuario === usuarioAdmin &&
        password === passwordAdmin
    )  else {

        mensajeLogin.textContent =
            "Usuario o contraseña incorrectos.";

        mensajeLogin.style.color = "#ff8b8b";

    }

});