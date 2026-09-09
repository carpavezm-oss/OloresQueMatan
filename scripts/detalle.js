const paramsDetalle = new URLSearchParams(window.location.search);
const idDetalle = Number(paramsDetalle.get("id"));

const productoDetalle = productos.find(p => p.id === idDetalle);

const contenedorDetalle = document.getElementById("detalleProducto");

if (contenedorDetalle) {

    if (!productoDetalle) {

        contenedorDetalle.innerHTML = `
            <div class="detalle-info">
                <h1>Producto no encontrado</h1>
                <p>El producto que buscas no existe.</p>
                <a href="productos.html">Volver a productos</a>
            </div>
        `;

    } else {

        contenedorDetalle.innerHTML = `
            <div class="detalle-imagen">
                <img src="${productoDetalle.imagen}" alt="${productoDetalle.nombre}">
            </div>

            <div class="detalle-info">

                <span class="categoria">
                    ${productoDetalle.categoria}
                </span>

                <h1>
                    ${productoDetalle.nombre}
                </h1>

                <p>
                    ${productoDetalle.descripcion}
                </p>

                <p class="detalle-descripcion">
                    Una fragancia seleccionada por Olores que matan
                    para acompañar tus momentos especiales.
                    Stock disponible: ${productoDetalle.stock} unidades.
                </p>

                <strong class="precio-detalle">
                    ${formatoPrecio(productoDetalle.precio)}
                </strong>

                <button 
                    class="btn-principal" 
                    onclick="agregarAlCarrito(${productoDetalle.id})">
                    Añadir al carrito
                </button>

            </div>
        `;
    }
}