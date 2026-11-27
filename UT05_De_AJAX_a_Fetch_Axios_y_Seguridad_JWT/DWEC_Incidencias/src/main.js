import { IncidenciasService } from './services/incidenciasService.js';
import { pintarIncidencias, pintarLoading, pintarError } from './ui/renderIncidencias.js';

const grid = document.querySelector('#grid');
const form = document.querySelector('#formIncidencia');
const btnCrear = document.querySelector('#btnCrear');
const inputBuscar = document.querySelector('#inputBuscar');

let controladorBusqueda = null;

// Utilidad Debounce (Bloque 6)
function debounce(fn, espera = 350) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), espera);
  };
}

// Carga principal con gestión de estados y cancelación
async function cargarYRenderizar(filtro = '') {
  if (controladorBusqueda) controladorBusqueda.abort();
  controladorBusqueda = new AbortController();

  pintarLoading(grid);

  try {
    const datos = await IncidenciasService.listar(filtro, controladorBusqueda.signal);
    pintarIncidencias(grid, datos);
  } catch (err) {
    if (err.name === 'AbortError') return; // Ignoramos cancelaciones intencionadas
    pintarError(grid, err.message);
  }
}

// 1. Alta de incidencia (bloqueando botón para evitar duplicados)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnCrear.disabled = true;
  btnCrear.textContent = 'Guardando...';

  try {
    const formData = new FormData(form);
    await IncidenciasService.crear(formData);
    form.reset();
    await cargarYRenderizar(inputBuscar.value.trim());
  } catch (err) {
    alert(err.message);
  } finally {
    btnCrear.disabled = false;
    btnCrear.textContent = 'Registrar';
  }
});

// 2. Buscador inteligente (Debounce + AbortController)
const buscarConRetraso = debounce((texto) => cargarYRenderizar(texto.trim()), 400);
inputBuscar.addEventListener('input', (e) => buscarConRetraso(e.target.value));

// 3. Delegación de eventos en el grid (Cerrar, Borrar, Reintentar)
grid.addEventListener('click', async (e) => {
  const boton = e.target.closest('button[data-accion]');
  if (!boton) return;

  const { accion, id } = boton.dataset;

  try {
    if (accion === 'reintentar') {
      await cargarYRenderizar(inputBuscar.value.trim());
    } else if (accion === 'cerrar') {
      await IncidenciasService.cerrar(id);
      await cargarYRenderizar(inputBuscar.value.trim());
    } else if (accion === 'borrar') {
      await IncidenciasService.eliminar(id);
      boton.closest('.card').remove(); // Eliminación visual inmediata
    }
  } catch (err) {
    alert(err.message);
  }
});

// Arranque inicial
cargarYRenderizar();