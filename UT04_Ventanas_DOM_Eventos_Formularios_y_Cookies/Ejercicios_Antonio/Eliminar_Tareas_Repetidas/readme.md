2. Sets y Control de Flujo con for...of (2.5 Puntos)

Dado el siguiente conjunto de datos, que representa una lista de tareas pendientes:
JavaScript
const tareasConDuplicados = ["Comprar pan", "Programar", "Estudiar JS", "Comprar pan", "Estudiar JS", "Comer"];

Tarea:Cree un nuevo Set llamado tareasUnicas a partir del array dado, eliminando automáticamente los duplicados.
Utilice un bucle for...of para iterar sobre tareasUnicas.Dentro del bucle, implemente la lógica para saltarse (no imprimir) 
la tarea que contenga la palabra "pan" y para detener la ejecución del bucle tan pronto como se encuentre la tarea "Comer".
Imprima las tareas restantes en la consola.