Ejercicio 1: Generación dinámica de una lista de viajes con JavaScript
Objetivo: Crear una página web que muestre dinámicamente una lista de viajes utilizando JavaScript y manipulación del DOM.
1. Mostrar y ocultar viajes (4,5 puntos)
    - [ x ]En el HTML solo se permite añadir:
        * La línea para enlazar el archivo JavaScript.
        * Una etiqueta con el texto «MOSTRAR VIAJES».
    - [  ]Al cargar la página, la lista estará oculta.
    - [  ]Al hacer clic en «MOSTRAR VIAJES», se creará el DOM dinámicamente y aparecerán los viajes.
    - [  ]El texto cambiará a «OCULTAR VIAJES».
    - [  ]Al hacer clic en «OCULTAR VIAJES», se eliminará el DOM de la lista.
    - [  ]Los viajes se obtienen de un array de objetos con 7 propiedades:
        * clase_pais
        * ciudad_h2
        * detalle_precio_total
        * detalle_num_noches
        * precio_noche
        * ruta_imagen
        * pie_imagen
2. Efectos con eventos del ratón (2 puntos)
    - [  ]Al pasar el ratón por encima de una imagen o del pie de foto, se añadirá la clase CSS destacado al texto del precio por noche.
    - [  ]Al retirar el ratón, se eliminará dicha clase.
    - [  ]Se utilizarán eventos mouseover y mouseout.
3. Reserva y almacenamiento del usuario (3,5 puntos)
    - [  ]Al pulsar el botón «Resérvalo ya!», aparecerán:
        * Un campo de texto para introducir el nombre.
        * Un botón «Aceptar».
    - [  ]No se permite utilizar el atributo required.
    - [  ]Solo se guardará el nombre si el campo contiene texto.
    - [  ]El nombre se almacenará permanentemente en el navegador mediante localStorage.

==============================================================================================================================================================
Conceptos de JavaScript que debes utilizar
    - Manipulación del DOM: createElement(), appendChild(), remove().
    - Eventos: click, mouseover, mouseout.
    - Atributos y clases: classList.add() y classList.remove().
    - Almacenamiento: localStorage.setItem().