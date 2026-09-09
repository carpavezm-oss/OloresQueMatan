function obtenerProductosAdmin() {
    return JSON.parse(localStorage.getItem('productosAdmin')) || productos.map(p => ({...p}));
}
function guardarProductosAdmin(lista) { localStorage.setItem('productosAdmin', JSON.stringify(lista)); }
function eliminarProductoAdmin(id) { const lista = obtenerProductosAdmin().filter(p => p.id !== id); guardarProductosAdmin(lista); renderAdminProductos(); }
function renderAdminProductos() {
    const tbody = document.getElementById('tablaProductos'); if (!tbody) return;
    const lista = obtenerProductosAdmin();
    tbody.innerHTML = lista.map(p => `<tr><td>${p.codigo}</td><td>${p.nombre}</td><td>${formatoPrecio(p.precio)}</td><td>${p.stock}${p.stock <= p.stockCritico ? ' ⚠️' : ''}</td><td>${p.categoria}</td><td><a class="btn-tabla" href="productoNuevo.html?id=${p.id}">Editar</a> <button class="btn-tabla danger" onclick="eliminarProductoAdmin(${p.id})">Eliminar</button></td></tr>`).join('');
}
function cargarProductoAdmin() {
    const form = document.getElementById('formProducto'); if (!form) return;
    const id = Number(new URLSearchParams(location.search).get('id'));
    if (!id) return;
    const p = obtenerProductosAdmin().find(x => x.id === id); if (!p) return;
    Object.keys(p).forEach(k => { if (form[k]) form[k].value = p[k]; });
}
function guardarProductoAdmin(event) {
    event.preventDefault();
    const form = event.target;
    const lista = obtenerProductosAdmin();
    const id = Number(form.id.value) || Date.now();
    const producto = {
        id,
        codigo: form.codigo.value.trim(), nombre: form.nombre.value.trim(), descripcion: form.descripcion.value.trim(),
        precio: Number(form.precio.value), stock: Number(form.stock.value), stockCritico: Number(form.stockCritico.value || 0),
        categoria: form.categoria.value, imagen: form.imagen.value.trim() || '../img/perfumes/perfume1.svg'
    };
    const index = lista.findIndex(p => p.id === id);
    if (index >= 0) lista[index] = producto; else lista.push(producto);
    guardarProductosAdmin(lista); alert('Producto guardado correctamente.'); location.href = 'productos.html';
}
function renderUsuariosAdmin() {
    const tbody = document.getElementById('tablaUsuarios'); if (!tbody) return;
    const usuarios = obtenerUsuarios();
    tbody.innerHTML = usuarios.length ? usuarios.map(u => `<tr><td>${u.run || '-'}</td><td>${u.nombre || ''} ${u.apellidos || ''}</td><td>${u.correo || ''}</td><td>${u.tipoUsuario || 'Cliente'}</td><td>${u.comuna || '-'}</td></tr>`).join('') : '<tr><td colspan="5">No hay usuarios registrados todavía.</td></tr>';
}
renderAdminProductos();
cargarProductoAdmin();
renderUsuariosAdmin();
