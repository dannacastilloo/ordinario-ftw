document.addEventListener("DOMContentLoaded", () => {
    cargarHeader();
    cargarFooter();
});

function cargarHeader() {
    const headerElement = document.getElementById("header-componente");
    if (headerElement) {
        headerElement.innerHTML = `
            <header>
                <div class="logo-container" style="display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap;">
                    <img src="https://www.eluniversal.com.mx/resizer/v2/ENLDJ4FJB5DBDAVEYWVTKHO43M.jpg?auth=399ce271733aaf53637fc7f29dc5ee413a1b20c636fed7cf8c93ec1e5153bef5&smart=true&height=666" 
                         style="border-radius: 50%; width: 45px; height: 45px; object-fit: cover; border: 2px solid #ffffff;">
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
                <p>© 2026 Página de Turismo - Fundamentos de Tecnologías Web</p>
            </footer>
        `;
    }
}