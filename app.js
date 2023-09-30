document.addEventListener('DOMContentLoaded', () => {
    const botonTamano = document.getElementById('generar');
    const contenedorImagenes = document.querySelector(".contenedor_imagenes");
    const botonMezclar = document.getElementById('mezclar');
    const botonResolver = document.getElementById('resolver');
    var imagenSeleccionada = document.querySelectorAll("#img1");
    var tablero = [];
    var tamano = 3;
    var decremento = 0.3;
    var decrementoImg = 0.3;
    var casillaActual = 0;
    var fichaVacia = 0
    var nombreImagen = ""
    var piezas = []
    var dicTamDiv = {3 : "502px", 4 : "501.5px", 5 : "503px", 6 : "508px", 7 : "507px",
        8 : "506.5px", 9 : "508px", 10 : "505.5px", 11 : "507.5px", 12 : "508px", 13 : "510px",
        14 : "507px", 15 : "507px", 16 : "513px", 17 : "517px", 18 : "509px", 19 : "518px", 20 : "502px"};

    function crearTablero(){
        for (let f = 0; f < tamano; f++) {
            tablero[f] = [];
            for (let c = 0; c < tamano; c++) {
                tablero[f][c] = f*tamano + c + 1;
            }
        }
        return tablero;
    }

    function mostrarTablero(){
        let tablero = crearTablero();
        for (let f = 0; f < tamano; f++) {
            for (let c = 0; c < tamano; c++) {
                let casilla = document.createElement("div");
                casilla.id = (f*tamano + c + 1).toString();
                let num = tablero[f][c];
                casilla.innerHTML = num;
                casilla.classList.add("casilla");
                casilla.style.height = ((99-decremento) / tamano).toString() + "%";
                casilla.style.width = ((99-decremento) / tamano).toString() + "%";
                document.querySelector(".tablero").append(casilla);
            }
        }
    }

    function limpiarTablero(){
        let casillas = document.querySelectorAll(".casilla");
        casillas.forEach(casilla => {
            casilla.remove();
        });
    }

    document.getElementById("img1").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img1");
        nombreImagen = "pepe"
        obtenerPiezas();
    };
    document.getElementById("img2").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img2");
        nombreImagen = "brain"
        obtenerPiezas();
    };
    document.getElementById("img3").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img3");
        nombreImagen = "michi"
        obtenerPiezas();
    };
    document.getElementById("img4").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img4");
        nombreImagen = "elmo"
        obtenerPiezas();
    };

    function obtenerPiezas() {
        piezas = [];
        tamano = document.getElementById("tamano").value;
        decrementoImg = 0.3156 * (tamano-3);
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = imagenSeleccionada[0].src;

        let anchoImg = img.width / tamano - (decrementoImg*2);
        let altoImg = img.height / tamano - (decrementoImg*2);
        for (let c = 0; c < tamano; c++) {
            for (let f = 0; f < tamano; f++) {
                let x = f * anchoImg;
                let y = c * altoImg;
                canvas.width = anchoImg;
                canvas.height = altoImg;
                context.drawImage(img, x, y, anchoImg, altoImg, 0, 0, anchoImg, altoImg);
                let pieza = new Image();
                pieza.src = canvas.toDataURL();
                piezas.push(pieza);
            }
        }
    }

    function mostrarImagen(){
        let casillas = document.querySelectorAll(".casilla");
        let tableroo = document.querySelectorAll(".tablero")[0];
        let tamValue = dicTamDiv[tamano];
        let i = 0;
        casillas.forEach(casilla => {
            if (parseInt(casilla.innerHTML, 10) == fichaVacia) {
                casilla.style.backgroundImage = "";
                casilla.style.backgroundColor = "grey";
            } else {
                casilla.style.backgroundImage = "url(" + piezas[i].src + ")";
                casilla.style.backgroundSize = "cover";
                casilla.style.backgroundPosition = "center";
                tamValue = dicTamDiv[tamano];
                tableroo.style.height = tamValue;
                tableroo.style.width = tamValue;
            }
            i++;
        });
    }

    contenedorImagenes.addEventListener("click", () => {
        limpiarTablero();
        tamano = document.getElementById("tamano").value;
        decremento = 0.3156 * (tamano-3);
        casillaActual = Math.floor(Math.random() * (tamano*tamano))+1;
        mostrarTablero();
        mostrarImagen();
    });

    botonTamano.addEventListener("click", () =>{
        if (nombreImagen == "") {
            alert("Seleccione una imagen");
            return;
        }
        limpiarTablero();
        tamano = document.getElementById("tamano").value;
        decremento = 0.3156 * (tamano-3);
        casillaActual = Math.floor(Math.random() * (tamano*tamano))+1;
        fichaVacia = casillaActual
        mostrarTablero();
        mostrarImagen();
    });

    function mezclarTablero(){
        
    }

    botonMezclar.addEventListener("click", () => {
        mezclarTablero();
    });

    botonResolver.addEventListener("click", () => {
        
    });

    function changeImage(casillaModificar, casillaActual){
        casillaActual.style.backgroundImage = casillaModificar.style.backgroundImage;
        casillaModificar.style.backgroundImage = "";
        casillaModificar.style.backgroundColor = "grey";
    }

    function moverCasilla(direccion){
        let casilla = document.getElementById(casillaActual.toString());
        let casillaArriba = document.getElementById((casillaActual-parseInt(tamano, 10)).toString());
        let casillaAbajo = document.getElementById((casillaActual+parseInt(tamano, 10)).toString());
        let casillaIzq = document.getElementById((casillaActual-1).toString());
        let casillaDer = document.getElementById((casillaActual+1).toString());

        if (direccion == "arriba" && casillaArriba != null) {
            //casilla.innerHTML = casillaArriba.innerHTML;
            //casillaArriba.innerHTML = fichaVacia.toString();

            changeImage(casillaArriba, casilla);
            casillaActual -= parseInt(tamano, 10);
            
        } else if (direccion == "abajo" && casillaAbajo != null) {
            //casilla.innerHTML = casillaAbajo.innerHTML;
            //casillaAbajo.innerHTML = fichaVacia.toString();

            changeImage(casillaAbajo, casilla);
            casillaActual += parseInt(tamano, 10);

        } else if (direccion == "izq" && casillaIzq != null) {
            //casilla.innerHTML = casillaIzq.innerHTML;
            //casillaIzq.innerHTML = fichaVacia.toString();
            //mostrarImagen();
            changeImage(casillaIzq, casilla);
            casillaActual -= 1;
            
        } else if (direccion == "der" && casillaDer != null) {
            //casilla.innerHTML = casillaDer.innerHTML;
            //casillaDer.innerHTML = fichaVacia.toString();
            //mostrarImagen();
            changeImage(casillaDer, casilla);
            casillaActual += 1;
        } else {

        }
    }

    document.addEventListener("keyup", (evento) => {
        if (evento.code == "ArrowUp") {
            moverCasilla("arriba");
        } else if (evento.code == "ArrowDown") {
            moverCasilla("abajo");
        } else if (evento.code == "ArrowLeft") {
            moverCasilla("izq");
        } else if (evento.code == "ArrowRight") {
            moverCasilla("der");
        } else {

        }
    })

    mostrarTablero();
});
