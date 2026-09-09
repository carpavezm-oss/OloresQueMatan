function mostrarError(input, mensaje) {
    let error = input.parentElement.querySelector('.mensaje-error');
    if (!error) {
        error = document.createElement('small');
        error.className = 'mensaje-error';
        input.parentElement.appendChild(error);
    }
    error.textContent = mensaje;
    input.classList.add('input-error');
}

function limpiarError(input) {
    const error = input.parentElement.querySelector('.mensaje-error');
    if (error) error.remove();
    input.classList.remove('input-error');
}

function correoValido(correo) {
    return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
}

function runValido(run) {
    const limpio = run.replace(/[.\-]/g, '').toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    let suma = 0, multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
    return dv === esperado;
}

function validarFormularioLogin(event) {
    event.preventDefault();
    const form = event.target;
    const correo = form.correo;
    const password = form.password;
    let valido = true;
    limpiarError(correo); limpiarError(password);

    if (!correo.value.trim()) { mostrarError(correo, 'El correo es obligatorio.'); valido = false; }
    else if (correo.value.length > 100) { mostrarError(correo, 'Máximo 100 caracteres.'); valido = false; }
    else if (!correoValido(correo.value.trim())) { mostrarError(correo, 'Use @duoc.cl, @profesor.duoc.cl o @gmail.com.'); valido = false; }

    if (!password.value) { mostrarError(password, 'La contraseña es obligatoria.'); valido = false; }
    else if (password.value.length < 4 || password.value.length > 10) { mostrarError(password, 'La contraseña debe tener entre 4 y 10 caracteres.'); valido = false; }

    if (valido) {
        localStorage.setItem('usuarioSesion', correo.value.trim());
        alert('Inicio de sesión correcto.');
        window.location.href = '../index.html';
    }
    return valido;
}

function validarContacto(event) {
    event.preventDefault();
    const form = event.target;
    const nombre = form.nombre, correo = form.correo, comentario = form.comentario;
    let valido = true;
    [nombre, correo, comentario].forEach(limpiarError);

    if (!nombre.value.trim()) { mostrarError(nombre, 'El nombre es obligatorio.'); valido = false; }
    else if (nombre.value.length > 100) { mostrarError(nombre, 'Máximo 100 caracteres.'); valido = false; }
    if (correo.value && (correo.value.length > 100 || !correoValido(correo.value.trim()))) { mostrarError(correo, 'Ingrese un correo permitido.'); valido = false; }
    if (!comentario.value.trim()) { mostrarError(comentario, 'El comentario es obligatorio.'); valido = false; }
    else if (comentario.value.length > 500) { mostrarError(comentario, 'Máximo 500 caracteres.'); valido = false; }

    if (valido) { alert('Mensaje enviado correctamente.'); form.reset(); }
    return valido;
}

function validarUsuario(event) {
    event.preventDefault();
    const form = event.target;
    const campos = [...form.querySelectorAll('[required]')];
    let valido = true;
    campos.forEach(limpiarError);
    campos.forEach(campo => {
        if (!campo.value.trim()) { mostrarError(campo, 'Este campo es obligatorio.'); valido = false; }
    });
    const correo = form.correo;
    const run = form.run;
    if (correo.value && (correo.value.length > 100 || !correoValido(correo.value.trim()))) { mostrarError(correo, 'Correo no permitido o demasiado largo.'); valido = false; }
    if (run.value && !runValido(run.value)) { mostrarError(run, 'RUN inválido. Ejemplo: 19011022K.'); valido = false; }
    if (valido) { guardarUsuario(form); alert('Usuario guardado correctamente.'); form.reset(); }
    return valido;
}
