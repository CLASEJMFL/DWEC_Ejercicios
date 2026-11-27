const BASE_URL = 'http://localhost:3000/incidencias';

export const IncidenciasService = {
  // GET con soporte para búsqueda (?q=) y cancelación (AbortSignal)
  async listar(query = '', signal) {
    const url = query
      ? `${BASE_URL}?q=${encodeURIComponent(query)}`
      : BASE_URL;

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Error HTTP ${res.status} al cargar incidencias`);
    return res.json();
  },

  // POST con FormData para soportar adjuntos
  async crear(formData) {
    // Nota: json-server básico espera JSON, así que si enviamos a json-server
    // extraemos los campos; en un backend real (Node/PHP/FastAPI) se envía formData directo.
    const datos = {
      titulo: formData.get('titulo'),
      categoria: formData.get('categoria'),
      estado: 'abierta',
      adjunto: formData.get('archivo')?.name || null
    };

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!res.ok) throw new Error('Error al registrar la incidencia');
    return res.json();
  },

  // PATCH para actualización parcial de estado
  async cerrar(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'cerrada' })
    });
    if (!res.ok) throw new Error('No se pudo cerrar la incidencia');
    return res.json();
  },

  // DELETE para eliminar el registro
  async eliminar(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('No se pudo eliminar la incidencia');
    return res.status === 204 ? true : res.json();
  }
};