
document.addEventListener("DOMContentLoaded", function () {

    const admin = esAdministrador();

    // Identificar al usuario
    const nombre = document.getElementById("nombreUsuario");
    if (nombre) {
        nombre.textContent = admin ? "Administrador" : "Visitante";
    }

    // Cerrar sesión
    const logout = document.getElementById("logoutBtn");
    if (logout) {
        logout.style.display = admin ? "inline-flex" : "none";
        logout.addEventListener("click", cerrarSesion);
    }

    // Mostrar u ocultar botones administrativos
    document.querySelectorAll("[data-admin-only]").forEach(boton => {
        boton.style.display = admin ? "inline-flex" : "none";
    });

    // Configuración de las tres tablas
    const configuraciones = [
        {
            nombre: "unidades",
            tabla: "tablaUnidades",
            boton: "btnNuevaUnidad",
            campos: [
                "Número de serie",
                "Tipo de unidad",
                "Marca",
                "Modelo",
                "Placas",
                "Kilometraje u horas",
                "Estado"
            ]
        },
        {
            nombre: "combustible",
            tabla: "tablaCombustible",
            boton: "btnNuevaCarga",
            campos: [
                "Fecha",
                "Unidad",
                "Combustible",
                "Litros",
                "Precio por litro",
                "Total",
                "Responsable"
            ]
        },
        {
            nombre: "mantenimientos",
            tabla: "tablaMantenimientos",
            boton: "btnNuevaOrden",
            campos: [
                "Folio",
                "Unidad",
                "Tipo",
                "Descripción",
                "Fecha",
                "Costo",
                "Estado"
            ]
        }
    ];

    configuraciones.forEach(config => iniciarGestion(config));

    function iniciarGestion(config) {

        const tbody = document.getElementById(config.tabla);
        const boton = document.getElementById(config.boton);

        if (!tbody || !boton) {
            console.error("No se encontró la tabla o botón:", config.nombre);
            return;
        }

        const clave = "cmms_" + config.nombre;

        // Recuperar datos guardados o leer los datos iniciales del HTML
        let registros = JSON.parse(localStorage.getItem(clave));

        if (!Array.isArray(registros)) {
            registros = Array.from(tbody.querySelectorAll("tr")).map(fila =>
                Array.from(fila.cells).map(celda =>
                    celda.textContent.trim()
                )
            );

            guardar();
        }

        function guardar() {
            localStorage.setItem(clave, JSON.stringify(registros));
        }

        function dibujarTabla() {

            tbody.innerHTML = "";

            registros.forEach((registro, indice) => {

                const fila = document.createElement("tr");

                registro.forEach(valor => {
                    const celda = document.createElement("td");
                    celda.textContent = valor;
                    fila.appendChild(celda);
                });

                // Acciones únicamente para el administrador
                if (admin) {
                    const acciones = document.createElement("td");

                    const editar = document.createElement("button");
                    editar.type = "button";
                    editar.textContent = "Editar";
                    editar.className = "btn-action";
                    editar.style.marginRight = "6px";

                    editar.addEventListener("click", () => editarRegistro(indice));

                    const eliminar = document.createElement("button");
                    eliminar.type = "button";
                    eliminar.textContent = "Eliminar";
                    eliminar.className = "btn-action";
                    eliminar.style.background = "#c93636";

                    eliminar.addEventListener("click", () => eliminarRegistro(indice));

                    acciones.append(editar, eliminar);
                    fila.appendChild(acciones);
                }

                tbody.appendChild(fila);
            });
        }

        function nuevoRegistro() {

            const registro = [];

            for (const campo of config.campos) {
                const valor = prompt("Ingresa " + campo + ":");

                if (valor === null) return;

                if (!valor.trim()) {
                    alert("Debes completar todos los campos.");
                    return;
                }

                registro.push(valor.trim());
            }

            registros.push(registro);
            guardar();
            dibujarTabla();

            alert("Registro agregado correctamente.");
        }

        function editarRegistro(indice) {

            const registro = [...registros[indice]];

            for (let i = 0; i < config.campos.length; i++) {

                const valor = prompt(
                    "Modificar " + config.campos[i] + ":",
                    registro[i]
                );

                if (valor === null) return;

                if (!valor.trim()) {
                    alert("El campo no puede quedar vacío.");
                    return;
                }

                registro[i] = valor.trim();
            }

            registros[indice] = registro;
            guardar();
            dibujarTabla();

            alert("Registro actualizado.");
        }

        function eliminarRegistro(indice) {

            const confirmar = confirm(
                "¿Seguro que deseas eliminar este registro?"
            );

            if (!confirmar) return;

            registros.splice(indice, 1);
            guardar();
            dibujarTabla();

            alert("Registro eliminado.");
        }

        boton.addEventListener("click", nuevoRegistro);

        dibujarTabla();
    }

});
