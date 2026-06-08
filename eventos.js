document.addEventListener("DOMContentLoaded", () => {
    // datos del xml
    cargarEventosXML();

    //configurar la barra de busqueda
    const inputMes = document.querySelector(".buscador-contenedor input[type='text']");
    const btnMostrarTodos = document.querySelector(".buscador-contenedor button");

    if (inputMes) {
        inputMes.addEventListener("input", () => {
            const textoMes = inputMes.value.trim().toLowerCase();
            filtrarEventosPorMes(textoMes);
        });
    }

    if (btnMostrarTodos && inputMes) {
        btnMostrarTodos.addEventListener("click", () => {
            inputMes.value = ""; // limpia el buscador
            filtrarEventosPorMes(""); //muestra
        });
    }
});

function cargarEventosXML() {
    const cuerpoTabla = document.getElementById("cuerpo-eventos");
    if (!cuerpoTabla) return;

    fetch("datos.xml")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar datos");
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const eventos = xmlDoc.getElementsByTagName("evento");
o
            if (eventos.length === 0) {
                cargarEventosRespaldo();
                return;
            }

            let htmlFilas = "";
            for (let i = 0; i < eventos.length; i++) {
                const nombre = eventos[i].getElementsByTagName("nombre")[0]?.textContent || "Evento sin nombre";
                const mes = eventos[i].getElementsByTagName("mes")[0]?.textContent || "No especificado";
                const lugar = eventos[i].getElementsByTagName("lugar")[0]?.textContent || "Por confirmar";
                // Soporta tanto <precio> como <costo> por si acaso
                const precio = eventos[i].getElementsByTagName("precio")[0]?.textContent || 
                               eventos[i].getElementsByTagName("costo")[0]?.textContent || "Gratuito";

                htmlFilas += `
                    <tr data-mes="${mes.toLowerCase()}">
                        <td><strong>${nombre}</strong></td>
                        <td>${mes}</td>
                        <td>${lugar}</td>
                        <td>${precio}</td>
                    </tr>
                `;
            }
            cuerpoTabla.innerHTML = htmlFilas;
        })
        .catch(error => {
            console.warn("Cargando eventos locales de respaldo...", error);
            cargarEventosRespaldo();
        });
}


function cargarEventosRespaldo() {
    const cuerpoTabla = document.getElementById("cuerpo-eventos");
    if (!cuerpoTabla) return;

    const eventosRespaldo = [
        { nombre: "La cantada", mes: "Noviembre", lugar: "Naolinco", precio: "Gratuito" },
        { nombre: "Fiestas Patronales de San Mateo", mes: "Septiembre", lugar: "Naolinco", precio: "Gratuito" },
        { nombre: "Feria del pambazo", mes: "Agosto", lugar: "Xalapa", precio: "Gratuito" },
        { nombre: "Festival de Jazz de la UV", mes: "Octubre", lugar: "Xalapa", precio: "Varios precios" },
        { nombre: "Noche de Leyendas en el Palacio de Hierro", mes: "Cada fin de semana", lugar: "Orizaba", precio: "$50 MXN" },
        { nombre: "Festival del Aire y Teleférico", mes: "Marzo", lugar: "Orizaba", precio: "Gratuito / Acceso con costo" }
    ];

    let htmlFilas = "";
    eventosRespaldo.forEach(ev => {
        htmlFilas += `
            <tr data-mes="${ev.mes.toLowerCase()}">
                <td><strong>${ev.nombre}</strong></td>
                <td>${ev.mes}</td>
                <td>${ev.lugar}</td>
                <td>${ev.precio}</td>
            </tr>
        `;
    });
    cuerpoTabla.innerHTML = htmlFilas;
}

function filtrarEventosPorMes(texto) {
    const filas = document.querySelectorAll("#cuerpo-eventos tr");
    filas.forEach(fila => {
        const mesFila = fila.getAttribute("data-mes") || "";
        if (texto === "" || mesFila.includes(texto)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}