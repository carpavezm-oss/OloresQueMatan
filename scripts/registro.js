const regionesComunas = {
    'Región Metropolitana': ['Santiago', 'Maipú', 'Puente Alto', 'Las Condes', 'Ñuñoa'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio'],
    'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles'],
    'La Araucanía': ['Temuco', 'Villarrica', 'Angol']
};

function cargarRegiones() {
    const region = document.getElementById('region');

    if (!region) return;

    region.innerHTML =
        '<option value="">Seleccione una región</option>' +
        Object.keys(regionesComunas)
            .map(r => `<option value="${r}">${r}</option>`)
            .join('');
}

function cargarComunas() {
    const region = document.getElementById('region');
    const comuna = document.getElementById('comuna');

    if (!region || !comuna) return;

    const lista = regionesComunas[region.value] || [];

    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>' +
        lista
            .map(c => `<option value="${c}">${c}</option>`)
            .join('');
}

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function guardarUsuario(form) {
    const usuarios = obtenerUsuarios();

    const usuario = Object.fromEntries(
        new FormData(form).entries()
    );

    usuario.id = Date.now();

    usuarios.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function validarUsuario(event) {
    event.preventDefault();

    const form = event.target;

    const run = form.run.value.trim();
    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const correo = form.correo.value.trim();
    const correoConfirmacion = form.correoConfirmacion.value.trim();
    const contrasena = form.contrasena.value;
    const contrasenaConfirmacion = form.contrasenaConfirmacion.value;
    const fechaNacimiento = form.fechaNacimiento.value;
    const direccion = form.direccion.value.trim();
    const region = form.region.value;
    const comuna = form.comuna.value;

    if (!run || !nombre || !apellidos || !correo || !correoConfirmacion ||
        !contrasena || !contrasenaConfirmacion || !direccion ||
        !region || !comuna) {
        alert('Completa todos los campos obligatorios.');
        return;
    }

    if (correo !== correoConfirmacion) {
        alert('Los correos electrónicos no coinciden.');
        return;
    }

    if (contrasena !== contrasenaConfirmacion) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (contrasena.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    const usuarios = obtenerUsuarios();

    const runExiste = usuarios.some(
        usuario => usuario.run.toLowerCase() === run.toLowerCase()
    );

    if (runExiste) {
        alert('Ya existe un usuario registrado con ese RUN.');
        return;
    }

    const correoExiste = usuarios.some(
        usuario => usuario.correo.toLowerCase() === correo.toLowerCase()
    );

    if (correoExiste) {
        alert('Ya existe un usuario registrado con ese correo.');
        return;
    }

    guardarUsuario(form);

    alert('Cuenta creada correctamente.');

    window.location.href = 'login.html';
}

cargarRegiones();

document.getElementById('region')?.addEventListener(
    'change',
    cargarComunas
);