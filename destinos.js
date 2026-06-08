document.addEventListener("DOMContentLoaded", () => {
    // cargar los datos de la pagina
    cargarDestinosXML();

    
    const inputBuscar = document.getElementById("input-buscar");
    const btnLimpiar = document.getElementById("btn-limpiar");

    if (inputBuscar) {
        inputBuscar.addEventListener("input", () => {
            const valorFiltro = inputBuscar.value.toLowerCase();
            filtrarTabla(valorFiltro);
        });
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            inputBuscar.value = "";
            filtrarTabla("");
        });
    }
});

// leer el archivo xml
function cargarDestinosXML() {
    fetch("datos.xml")
        .then(response => response.text())
        .then(data => {
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const destinos = xmlDoc.getElementsByTagName("destino");
            
            const cuerpoTabla = document.getElementById("cuerpo-tabla");
            let htmlFilas = "";

            // recorrer los destinos de xml
            for (let i = 0; i < destinos.length; i++) {
                const nombre = destinos[i].getElementsByTagName("nombre")[0].textContent;
                const tipo = destinos[i].getElementsByTagName("tipo")[0].textContent;
                const clima = destinos[i].getElementsByTagName("clima")[0].textContent;
                const descripcion = destinos[i].getElementsByTagName("descripcion")[0].textContent;

                htmlFilas += `
                    <tr>
                        <td><strong>${nombre}</strong></td>
                        <td class="col-tipo">${tipo}</td>
                        <td>${clima}</td>
                        <td>${descripcion}</td>
                    </tr>
                `;
            }

            if (cuerpoTabla) {
                cuerpoTabla.innerHTML = htmlFilas;
            }
        })
        .catch(error => console.error("Error al leer el archivo xml de destinos", error));
}


function filtrarTabla(filtro) {
    const filas = document.querySelectorAll("#cuerpo-tabla tr");
    
    filas.forEach(fila => {
        
        const celdaTipo = fila.querySelector(".col-tipo");
        if (celdaTipo) {
            const textoTipo = celdaTipo.textContent.toLowerCase();
            
            if (textoTipo.includes(filtro)) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        }
    });
}