document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btn-login");
    const btnCerrar = document.getElementById("btn-cerrar-sesion");

    if (btnLogin) {
        btnLogin.addEventListener("click", validarUsuarioXML);
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            // ocultar contenido y volver a mostrar el login
            document.getElementById("contenido-favoritos").style.display = "none";
            document.getElementById("contenedor-login").style.display = "block";
            document.getElementById("txt-usuario").value = "";
            document.getElementById("txt-password").value = "";
        });
    }
});

function validarUsuarioXML() {
    const userIngresado = document.getElementById("txt-usuario").value;
    const passIngresado = document.getElementById("txt-password").value;
    const mensajeError = document.getElementById("mensaje-error");

    fetch("datos.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const usuarios = xmlDoc.getElementsByTagName("usuario");
            
            let esValido = false;
            let nombreUsuario = "";

            // buscar en el xml si esta el usuario y la contraseña
            for (let i = 0; i < usuarios.length; i++) {
                const xmlUser = usuarios[i].getElementsByTagName("username")[0].textContent;
                const xmlPass = usuarios[i].getElementsByTagName("password")[0].textContent;
                const xmlNombre = usuarios[i].getElementsByTagName("nombre")[0].textContent;

                if (xmlUser === userIngresado && xmlPass === passIngresado) {
                    esValido = true;
                    nombreUsuario = xmlNombre;
                    break;
                }
            }

            if (esValido) {
                // si esta bien se pculta el ogin y muestra la tabla
                mensajeError.style.display = "none";
                document.getElementById("contenedor-login").style.display = "none";
                document.getElementById("contenido-favoritos").style.display = "block";
                document.getElementById("nombre-usuario-firmado").textContent = nombreUsuario;
            } else {
                // si esta mal se lanza el mensaje de error
                mensajeError.style.display = "block";
            }
        })
        .catch(error => console.error("Error al validar el usuario intente de nuevo:", error));
}