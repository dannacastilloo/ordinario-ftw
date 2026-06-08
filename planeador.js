document.addEventListener("DOMContentLoaded", () => {
    const btnCalcular = document.getElementById("btn-calcular");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            // obtener los valores de los inputs del formulario
            const dias = parseInt(document.getElementById("num-dias").value) || 1;
            const fecha = document.getElementById("fecha-viaje").value;
            const chkGuia = document.getElementById("chk-Guia");
            const chkTransporte = document.getElementById("chk-Transporte");

            // costo base simulado por día de hospedaje/comida de $500
            let costoPorDia = 500;

            // sumar los adicionales si las casillas están marcadas
            if (chkGuia && chkGuia.checked) {
                costoPorDia += parseInt(chkGuia.value);
            }
            if (chkTransporte && chkTransporte.checked) {
                costoPorDia += parseInt(chkTransporte.value);
            }

            const total = dias * costoPorDia;

            // formatear los textos del contenedor de resultados
            document.getElementById("txt-resumen-dias").innerHTML = `• Duración de la travesía: <strong>${dias} día(s)</strong>.`;
            
            if (fecha) {
                
                const partes = fecha.split("-");
                document.getElementById("txt-resumen-fecha").innerHTML = `• Fecha de salida programada: <strong>${partes[2]}/${partes[1]}/${partes[0]}</strong>.`;
            } else {
                document.getElementById("txt-resumen-fecha").innerHTML = `• Fecha de salida: <strong>No especificada</strong>.`;
            }

            document.getElementById("total-estimado").textContent = `$${total}.00`;

            // mostrar el cuadro de resultados en la pantalla
            document.getElementById("resultado-plan").style.display = "block";
        });
    }
});