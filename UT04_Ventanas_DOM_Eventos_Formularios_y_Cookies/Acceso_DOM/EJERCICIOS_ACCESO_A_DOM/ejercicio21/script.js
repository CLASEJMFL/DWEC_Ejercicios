const perfil = document.getElementById('contenedor-tabla');

const usuario1 = {
    ID: '1',
    NOMBRE: 'Pedrito',
    MAIL: 'pedrito@morenito.es',
    ROL: 'admin'
};

perfil.innerHTML = `
    <tr>
        <td>${usuario1.ID}</td>
        <td>${usuario1.NOMBRE}</td>
        <td>${usuario1.MAIL}</td>
        <td>${usuario1.ROL}</td>
    </tr>
`;

