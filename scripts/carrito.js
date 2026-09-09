function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    const existente = carrito.find(p => p.id === idProducto);

    if (existente) {
        if (existente.cantidad >= producto.stock) {
            alert('No hay más stock disponible de este producto.');
            return;
        }
        existente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    alert(`${producto.nombre} fue agregado al carrito.`);
}

function cambiarCantidad(idProducto, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === idProducto);
    const producto = productos.find(p => p.id === idProducto);
    if (!item || !producto) return;

    nuevaCantidad = Number(nuevaCantidad);
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }
    if (nuevaCantidad > producto.stock) {
        alert(`Stock disponible: ${producto.stock}`);
        renderizarCarrito();
        return;
    }
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    renderizarCarrito();
}

function eliminarDelCarrito(idProducto) {
    const carrito = obtenerCarrito().filter(p => p.id !== idProducto);
    guardarCarrito(carrito);
    renderizarCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (!contador) return;
    const cantidad = obtenerCarrito().reduce((total, p) => total + p.cantidad, 0);
    contador.textContent = cantidad;
}

function renderizarCarrito() {
    const contenedor = document.getElementById('listaCarrito');
    const resumen = document.getElementById('resumenCarrito');
    if (!contenedor) return;

   const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega una fragancia para comenzar.</p>
                <a class="btn-principal" href="productos.html">
                    Ver productos
                </a>
            </div>
        `;

        if (resumen) {
            resumen.innerHTML = `
                <div class="resumen-vacio">
                    <strong>Total: $0</strong>
                </div>
            `;
        }

        actualizarContadorCarrito();
        return;
}
    let total = 0;
    contenedor.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        return `
            <article class="item-carrito">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>${formatoPrecio(item.precio)} cada uno</p>
                    <label>Cantidad:
                        <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${item.id}, this.value)">
                    </label>
                </div>
                <strong>${formatoPrecio(subtotal)}</strong>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
            </article>`;
    }).join('');

    if (resumen) {
        resumen.innerHTML = `<p>Productos: ${carrito.reduce((s,p) => s+p.cantidad, 0)}</p><strong>Total: ${formatoPrecio(total)}</strong><button class="btn-carrito" onclick="finalizarCompra()">Finalizar compra</button>`;
    }
    actualizarContadorCarrito();
}

function finalizarCompra() {
    if (obtenerCarrito().length === 0) return;
    alert('Compra simulada correctamente. ¡Gracias por comprar en OLORES QUE MATAN!');
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

actualizarContadorCarrito();
renderizarCarrito();
