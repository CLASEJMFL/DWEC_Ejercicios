const perfil = document.getElementById('perfil-usuario');

const usuario = {
    nombre: 'Pedrito el de los huevitos negritos',
    avatar: 'avatar.jpeg',
    biografia: 'Desarrollador de tulamax y actor profesional'
};

perfil.innerHTML = `<img src="${usuario.avatar}" alt="Foto de ${usuario.nombre}"><h3>${usuario.nombre}</h3><p>${usuario.biografia}</p>`;