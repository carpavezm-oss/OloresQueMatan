const productos = [
    {
        id: 1,
        codigo: 'PER001',
        nombre: 'Eucalipto Fresh',
        descripcion: 'Fragancia fresca con notas de eucalipto y cítricos.',
        precio: 29990,
        stock: 15,
        stockCritico: 5,
        categoria: 'Unisex',
        imagen: 'https://st.depositphotos.com/10614052/57417/i/450/depositphotos_574177618-stock-photo-bottle-aromatic-perfume-white-background.jpg'
    },
    {
        id: 2,
        codigo: 'PER002',
        nombre: 'Frambuesa Velvet',
        descripcion: 'Perfume dulce con notas de frambuesa y vainilla.',
        precio: 34990,
        stock: 10,
        stockCritico: 3,
        categoria: 'Femenino',
        imagen: 'https://i.pinimg.com/736x/db/67/7b/db677b5fc6dd2906086d9a95c69ce762.jpg'
    },
    {
        id: 3,
        codigo: 'PER003',
        nombre: 'Manzana Fresh',
        descripcion: 'Aroma fresco con notas de manzana verde y flores.',
        precio: 27990,
        stock: 20,
        stockCritico: 5,
        categoria: 'Unisex',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-54yzPYdkD6EA_3mq6xbVoMcWxeN-xaDr6dB33u14tSp0lhsIwflEJDrV&s=10'
    },
    {
        id: 4,
        codigo: 'PER004',
        nombre: 'Menta Intense',
        descripcion: 'Fragancia refrescante con notas de menta y madera.',
        precio: 31990,
        stock: 8,
        stockCritico: 3,
        categoria: 'Masculino',
        imagen: 'https://i5.walmartimages.com/asr/c7752dc8-2016-4226-9fbf-b0d00bad2f64.a66a9e4589c8ec7b7215b2fe636f45ee.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    },
    {
        id: 5,
        codigo: 'PER005',
        nombre: 'Rosa Elegance',
        descripcion: 'Aroma floral con rosa, peonía y almizcle.',
        precio: 38990,
        stock: 12,
        stockCritico: 4,
        categoria: 'Femenino',
        imagen: 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/914278999/variant/images/b610de59-160b-4f96-bf0e-b5c1932c02b9/914278999-0000-005.jpg'
    },
    {
        id: 6,
        codigo: 'PER006',
        nombre: 'Cedro Noir',
        descripcion: 'Fragancia intensa con cedro, ámbar y especias.',
        precio: 42990,
        stock: 7,
        stockCritico: 3,
        categoria: 'Masculino',
        imagen: 'https://hips.hearstapps.com/hmg-prod/images/perfumes-vainilla-6459484490104.jpg?crop=0.668xw:1.00xh;0,0&resize=1200:*'
    }
];

function formatoPrecio(valor) {
    return Number(valor).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    });
}

function tarjetaProducto(producto) {

    let rutaDetalle;

    if (window.location.pathname.includes('/tiendaOnline/')) {
        rutaDetalle = `detalleProducto.html?id=${producto.id}`;
    } else {
        rutaDetalle = `tiendaOnline/detalleProducto.html?id=${producto.id}`;
    }

    return `
        <article class="producto-card">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="producto-info">

                <span class="categoria">
                    ${producto.categoria}
                </span>

                <h2>
                    ${producto.nombre}
                </h2>

                <p>
                    ${producto.descripcion}
                </p>

                <strong>
                    ${formatoPrecio(producto.precio)}
                </strong>

                <div class="acciones">

                    <a
                        href="${rutaDetalle}"
                        class="btn-detalle">
                        Ver detalle
                    </a>

                    <button
                        type="button"
                        onclick="agregarAlCarrito(${producto.id})"
                        class="btn-carrito">
                        Agregar
                    </button>

                </div>

            </div>

        </article>
    `;
}

function mostrarProductos(contenedorId, limite = productos.length) {

    const contenedor = document.getElementById(contenedorId);

    if (!contenedor) return;

    contenedor.innerHTML = productos
        .slice(0, limite)
        .map(tarjetaProducto)
        .join('');
}

mostrarProductos('listaProductos');

mostrarProductos('productosDestacados', 4);