document.addEventListener("DOMContentLoaded", () => {
    // referencias a los elementos del html
    const btnXalapa = document.getElementById("btn-mapa-xalapa");
    const btnOrizaba = document.getElementById("btn-mapa-orizaba");
    const btnNaolinco = document.getElementById("btn-mapa-naolinco");
    
    const tituloMapa = document.getElementById("titulo-mapa");
    const iframeMapa = document.getElementById("iframe-mapa");
    const descripcionMapa = document.getElementById("descripcion-mapa");

    // URLs de googlr maps
    const urlXalapa = "https://maps.google.com/maps?q=Xalapa,%20Veracruz&t=&z=13&ie=UTF8&iwloc=&output=embed";
    const urlOrizaba = "https://maps.google.com/maps?q=Orizaba,%20Veracruz&t=&z=13&ie=UTF8&iwloc=&output=embed";
    const urlNaolinco = "https://maps.google.com/maps?q=Naolinco,%20Veracruz&t=&z=14&ie=UTF8&iwloc=&output=embed";

    // configurar eventos interactivos para cada botón
    if (btnXalapa && iframeMapa && tituloMapa && descripcionMapa) {
        btnXalapa.addEventListener("click", () => {
            tituloMapa.textContent = "Mostrando: Región de Xalapa";
            iframeMapa.src = urlXalapa;
            descripcionMapa.textContent = "Descripción: Mostrando el mapa interactivo de Xalapa-Enríquez, destacando la zona centro, sus parques y avenidas principales.";
        });
    }

    if (btnOrizaba && iframeMapa && tituloMapa && descripcionMapa) {
        btnOrizaba.addEventListener("click", () => {
            tituloMapa.textContent = "Mostrando: Región de Orizaba";
            iframeMapa.src = urlOrizaba;
            descripcionMapa.textContent = "Descripción: Mostrando el mapa interactivo de Orizaba, permitiendo ubicar la zona del teleférico y las faldas del Pico de Orizaba.";
        });
    }

    if (btnNaolinco && iframeMapa && tituloMapa && descripcionMapa) {
        btnNaolinco.addEventListener("click", () => {
            tituloMapa.textContent = "Mostrando: Región de Naolinco";
            iframeMapa.src = urlNaolinco;
            descripcionMapa.textContent = "Descripción: Mostrando el mapa interactivo de Naolinco de Victoria, enfocando el centro histórico y sus famosas calles de artesanos del calzado.";
        });
    }
});