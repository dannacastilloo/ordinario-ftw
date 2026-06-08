document.addEventListener("DOMContentLoaded", () => {
    cargarHeader();
    cargarFooter();
});

function cargarHeader() {
    const headerElement = document.getElementById("header-componente");
    if (headerElement) {
        headerElement.innerHTML = `
            <header>
                <div class="logo-container">
                    <h1>Página de Turismo</h1>
                </div>
                <nav aria-label="Navegación principal">
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="destinos.html">Destinos</a></li>
                        <li><a href="restaurantes.html">Restaurantes</a></li>
                        <li><a href="eventos.html">Eventos</a></li>
                        <li><a href="mapas.html">Mapas</a></li>
                        <li><a href="favoritos.html">Favoritos</a></li>
                        <li><a href="planeador.html">Planeador de viaje</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

function cargarFooter() {
    const footerElement = document.getElementById("footer-componente");
    if (footerElement) {
        footerElement.innerHTML = `
            <footer>
                <p>&copy; 2026 Página de Turismo - Fundamentos de Tecnologías Web </p>
            </footer>
        `;
    }
}