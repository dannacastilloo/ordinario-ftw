document.addEventListener("DOMContentLoaded", () => {
    //  cargamos los restaurantes al momento de cargar la pagina
    cargarRestaurantesXML();
    // boton para saber cuando el usuario cambie la opcion de select
    const selectZona = document.getElementById("select-zona");
    if (selectZona) {
        selectZona.addEventListener("change", () => {
            const zonaSeleccionada = selectZona.value;
            filtrarRestaurantes(zonaSeleccionada);
        });
    }
});

// funcion para leer el xml
function cargarRestaurantesXML() {
    fetch("datos.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const restaurantes = xmlDoc.getElementsByTagName("restaurante");
            
            const cuerpoTabla = document.getElementById("cuerpo-restaurantes");
            let htmlFilas = "";

            // recorrer los restaurantes del xml
            for (let i = 0; i < restaurantes.length; i++) {
                const nombre = restaurantes[i].getElementsByTagName("nombre")[0].textContent;
                const tipo = restaurantes[i].getElementsByTagName("tipo")[0].textContent;
                const zona = restaurantes[i].getElementsByTagName("zona")[0].textContent;
                const especialidad = restaurantes[i].getElementsByTagName("especialidad")[0].textContent;

                
                htmlFilas += `
                    <tr data-zona="${zona}">
                        <td><strong>${nombre}</strong></td>
                        <td>${tipo}</td>
                        <td>${especialidad}</td>
                        <td>${zona}</td>
                    </tr>
                `;
            }

            if (cuerpoTabla) {
                cuerpoTabla.innerHTML = htmlFilas;
            }
        })
        .catch(error => console.error("Error al cargar los restaurantes:", error));
}

// funcion que muestra o oculta las filas segun la zona q seleccionen
function filtrarRestaurantes(zona) {
    const filas = document.querySelectorAll("#cuerpo-restaurantes tr");
    
    filas.forEach(fila => {
        const zonaFila = fila.getAttribute("data-zona");
        
        //se muestran los datos
        if (zona === "todos" || zonaFila === zona) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}