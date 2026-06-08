document.addEventListener("DOMContentLoaded", () => {
    // cargamos la lista de eventos
    cargarEventosXML();

    
    const inputMes = document.getElementById("input-mes");
    const btnLimpiar = document.getElementById("btn-limpiar-eventos");

    if (inputMes) {
        inputMes.addEventListener("input", () => {
            const valorFiltro = inputMes.value.toLowerCase();
            filtrarEventos(valorFiltro);
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            inputMes.value = "";
            filtrarEventos("");
        });
    }
});


function cargarEventosXML() {
    fetch("datos.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const eventos = xmlDoc.getElementsByTagName("evento");
            
            const cuerpoTabla = document.getElementById("cuerpo-eventos");
            let htmlFilas = "";

            // recorrer el arreglo de eventos del archivo xml
            for (let i = 0; i < eventos.length; i++) {
                const nombre = eventos[i].getElementsByTagName("nombre")[0].textContent;
                const mes = eventos[i].getElementsByTagName("mes")[0].textContent;
                const lugar = eventos[i].getElementsByTagName("lugar")[0].textContent;
                const precio = eventos[i].getElementsByTagName("precio")[0].textContent;

                htmlFilas += `
                    <tr>
                        <td><strong>${nombre}</strong></td>
                        <td class="col-mes">${mes}</td>
                        <td>${lugar}</td>
                        <td>${precio}</td>
                    </tr>
                `;
            }

            if (cuerpoTabla) {
                cuerpoTabla.innerHTML = htmlFilas;
            }
        })
        .catch(error => console.error("Error al cargar el XML de eventos:", error));
}

//  funcio n para hacer la busqueda interactivo
function filtrarEventos(filtro) {
    const filas = document.querySelectorAll("#cuerpo-eventos tr");
    
    filas.forEach(fila => {
        const celdaMes = fila.querySelector(".col-mes");
        if (celdaMes) {
            const textoMes = celdaMes.textContent.toLowerCase();
            if (textoMes.includes(filtro)) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        }
    });
}