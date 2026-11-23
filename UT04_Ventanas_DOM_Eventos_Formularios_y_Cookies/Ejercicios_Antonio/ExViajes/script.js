let viajes = [
    {
        clase_pais: "italia",
        ciudad_h2: "Roma",
        detalle_precio_total: "500 €",
        detalle_num_noches: "5 noches",
        precio_noche: "100 € por noche",
        ruta_imagen: "../imagenes/roma.jpg",
        pie_imagen: "Coliseo de Roma"
    },
    {
        clase_pais: "francia",
        ciudad_h2: "París",
        detalle_precio_total: "600 €",
        detalle_num_noches: "4 noches",
        precio_noche: "150 € por noche",
        ruta_imagen: "../imagenes/francia.jpeg",
        pie_imagen: "Torre Eiffel"
    },
    {
        clase_pais: "españa",
        ciudad_h2: "Sevilla",
        detalle_precio_total: "300 €",
        detalle_num_noches: "3 noches",
        precio_noche: "100 € por noche",
        ruta_imagen: "../imagenes/sevilla.jpg",
        pie_imagen: "La Giralda"
    }
];

let mostrar = document.getElementById("mostrar");

let contenedor = null;

mostrar.addEventListener("click", function() {

    if (contenedor === null) {

        contenedor = document.createElement("div");
        contenedor.id = "contenedor";

        for (let i = 0; i < viajes.length; i++) {

            let viaje = document.createElement("div");
            viaje.classList.add("viaje");
            viaje.classList.add(viajes[i].clase_pais);

            let ciudad = document.createElement("h2");
            ciudad.textContent = viajes[i].ciudad_h2;

            let precioTotal = document.createElement("p");
            precioTotal.textContent = "Precio total: " + viajes[i].detalle_precio_total;

            let noches = document.createElement("p");
            noches.textContent = "Número de noches: " + viajes[i].detalle_num_noches;

            let precioNoche = document.createElement("p");
            precioNoche.textContent = viajes[i].precio_noche;

            let imagen = document.createElement("img");
            imagen.src = viajes[i].ruta_imagen;
            imagen.alt = viajes[i].pie_imagen;

            let pieFoto = document.createElement("p");
            pieFoto.textContent = viajes[i].pie_imagen;

            imagen.addEventListener("mouseover", function() {
                precioNoche.classList.add("destacado");
            });

            imagen.addEventListener("mouseout", function() {
                precioNoche.classList.remove("destacado");
            });

            pieFoto.addEventListener("mouseover", function() {
                precioNoche.classList.add("destacado");
            });

            pieFoto.addEventListener("mouseout", function() {
                precioNoche.classList.remove("destacado");
            });

            let botonReservar = document.createElement("button");
            botonReservar.textContent = "Resérvalo ya!";

            botonReservar.addEventListener("click", function() {

                if (viaje.querySelector(".formulario") === null) {

                    let formulario = document.createElement("div");
                    formulario.classList.add("formulario");

                    let campoNombre = document.createElement("input");
                    campoNombre.type = "text";
                    campoNombre.placeholder = "Introduce tu nombre";

                    let botonAceptar = document.createElement("button");
                    botonAceptar.textContent = "Aceptar";

                    botonAceptar.addEventListener("click", function() {

                        let nombre = campoNombre.value.trim();

                        if (nombre !== "") {

                            localStorage.setItem("nombreUsuario", nombre);

                            alert("Nombre guardado correctamente: " + nombre);

                            formulario.remove();

                        } else {
                            alert("Debes introducir un nombre.");
                        }

                    });

                    formulario.appendChild(campoNombre);
                    formulario.appendChild(botonAceptar);

                    viaje.appendChild(formulario);
                }

            });

            viaje.appendChild(ciudad);
            viaje.appendChild(precioTotal);
            viaje.appendChild(noches);
            viaje.appendChild(precioNoche);
            viaje.appendChild(imagen);
            viaje.appendChild(pieFoto);
            viaje.appendChild(botonReservar);

            contenedor.appendChild(viaje);
        }

        document.body.appendChild(contenedor);

        mostrar.textContent = "OCULTAR VIAJES";

    } else {

        contenedor.remove();

        contenedor = null;

        mostrar.textContent = "MOSTRAR VIAJES";
    }

});