export function pintarLoading(contenedor) {
  contenedor.innerHTML = `<div class="estado-msg">⏳ Cargando incidencias...</div>`;
}

export function pintarError(contenedor, mensaje) {
  contenedor.innerHTML = `
    <div class="estado-msg" style="color: #b91c1c; border-color: #fca5a5;">
      ❌ ${mensaje} <br><br>
      <button data-accion="reintentar">🔄 Reintentar</button>
    </div>
  `;
}

export function pintarIncidencias(contenedor, lista) {
  // Estado Empty
  if (!lista.length) {
    contenedor.innerHTML = `<div class="estado-msg">📭 Sin incidencias activas.</div>`;
    return;
  }

  // Estado Success (renderizado limpio de tarjetas)
  contenedor.innerHTML = lista.map(inc => `
    <article class="card ${inc.estado === 'cerrada' ? 'cerrada' : ''}">
      <span class="badge">${inc.categoria}</span>
      <h4>${inc.titulo}</h4>
      <p><small>Estado: <strong>${inc.estado.toUpperCase()}</strong></small></p>
      ${inc.adjunto ? `<p><small>📎 Adjunto: ${inc.adjunto}</small></p>` : ''}
      <div class="acciones">
        ${inc.estado !== 'cerrada'
          ? `<button class="btn-cerrar" data-accion="cerrar" data-id="${inc.id}">✔ Cerrar</button>`
          : ''}
        <button class="btn-borrar" data-accion="borrar" data-id="${inc.id}">🗑️</button>
      </div>
    </article>
  `).join('');
}