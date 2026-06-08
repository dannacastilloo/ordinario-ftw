document.addEventListener("DOMContentLoaded", () => {
    // cargar los datos del xml
    cargarRestaurantesXML();

    // menu desplegable
    const selectZona = document.getElementById("select-zona");
    if (selectZona) {
        selectZona.addEventListener("change", () => {
            const zonaSeleccionada = selectZona.value;
            filtrarRestaurantes(zonaSeleccionada);
        });
    }
});

function cargarRestaurantesXML() {
    const cuerpoTabla = document.getElementById("cuerpo-restaurantes");
    if (!cuerpoTabla) return;

    fetch("datos.xml")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo acceder al archivo datos");
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const restaurantes = xmlDoc.getElementsByTagName("restaurante");
            
            
            if (restaurantes.length === 0) {
                cargarDatosAlternativos();
                return;
            }

            let htmlFilas = "";
            for (let i = 0; i < restaurantes.length; i++) {
                const nombre = restaurantes[i].getElementsByTagName("nombre")[0]?.textContent || "Sin nombre";
                const tipo = restaurantes[i].getElementsByTagName("tipo")[0]?.textContent || "General";
                const zona = restaurantes[i].getElementsByTagName("zona")[0]?.textContent || "Xalapa";
                const especialidad = restaurantes[i].getElementsByTagName("especialidad")[0]?.textContent || "Comida tradicional";

                htmlFilas += `
                    <tr data-zona="${zona}">
                        <td><strong>${nombre}</strong></td>
                        <td>${tipo}</td>
                        <td>${especialidad}</td>
                        <td>${zona}</td>
                    </tr>
                `;
            }
            cuerpoTabla.innerHTML = htmlFilas;
        })
        .catch(error => {
            console.warn("Leyendo datos locales de respaldo por seguridad...", error);
            
            cargarDatosAlternativos();
        });
}


function cargarDatosAlternativos() {
    const cuerpoTabla = document.getElementById("cuerpo-restaurantes");
    if (!cuerpoTabla) return;

    const datosRespaldo = [
        { nombre: "El Pilancón", tipo: "Tradicional", especialidad: "Cecina naolinqueña y chiles rellenos", zona: "Naolinco" },
        { nombre: "Asador El Salto", tipo: "Carnes", especialidad: "Cortes de carne a la leña", zona: "Xalapa" }
    ];

    let htmlFilas = "";
    datosRespaldo.forEach(restaurante => {
        htmlFilas += `
            <tr data-zona="${restaurante.zona}">
                <td><strong>${restaurante.nombre}</strong></td>
                <td>${restaurante.tipo}</td>
                <td>${restaurante.especialidad}</td>
                <td>${restaurante.zona}</td>
            </tr>
        `;
    });
    cuerpoTabla.innerHTML = htmlFilas;
}

function filtrarRestaurantes(zona) {
    const filas = document.querySelectorAll("#cuerpo-restaurantes tr");
    filas.forEach(fila => {
        const zonaFila = fila.getAttribute("data-zona");
        if (zona === "todos" || zonaFila === zona) {
            fila.style.display = ""; // muestra la fila
        } else {
            fila.style.display = "none"; // oculta la fila
        }
    });
}