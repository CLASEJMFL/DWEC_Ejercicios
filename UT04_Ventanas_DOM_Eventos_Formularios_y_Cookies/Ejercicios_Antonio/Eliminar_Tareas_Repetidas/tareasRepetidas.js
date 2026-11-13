const tareasConDuplicados = ["Comprar pan", "Programar", "Estudiar JS", "Comprar pan", "Estudiar JS", "Comer"];

const tareasUnicas = new Set(tareasConDuplicados);

for (const tarea of tareasUnicas) {

    if (tarea.includes("pan")) {
        continue;
    }

    if (tarea === "Comer") {
        break;
    }

    console.log(tarea);
}