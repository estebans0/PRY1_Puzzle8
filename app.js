document.addEventListener('DOMContentLoaded', () => {
    const botonTamano = document.getElementById('generar');
    const contenedorImagenes = document.querySelector(".contenedor_imagenes");
    const botonMezclar = document.getElementById('mezclar');
    const botonResolver = document.getElementById('resolver');
    var imagenSeleccionada = document.querySelectorAll("#img1");
    var tablero = [];
    var tamano = 3;
    var decremento = 0.3;
    var casillaActual = 0;
    fichaVacia = 0
    nombreImagen = ""

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
        console.log("este es el tablero ");
        console.log(tablero);
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
    };
    document.getElementById("img2").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img2");
    };
    document.getElementById("img3").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img3");
    };
    document.getElementById("img4").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img4");
    };
    document.getElementById("img5").onclick = function() {
        imagenSeleccionada = document.querySelectorAll("#img5");
    };

    function mostrarImagen(){
        let casillas = document.querySelectorAll(".casilla");
        let imagen = imagenSeleccionada[Math.floor(Math.random()*imagenSeleccionada.length)];
        casillas.forEach(casilla => {
            if (parseInt(casilla.innerHTML, 10) == fichaVacia) {
                casilla.style.backgroundImage = "";
                casilla.style.backgroundColor = "grey";
            } else {
            rutaImagen = "'imagenes/" + nombreImagen + tamano + "x" + tamano + casilla.innerHTML + ".jpg'"
            casilla.style.backgroundImage = "url(" + rutaImagen + ")";
            casilla.style.backgroundSize = "cover";
            casilla.style.backgroundPosition = "center"; }
        });
    }

    contenedorImagenes.addEventListener("click", () => {
        mostrarImagen();
    });

    botonTamano.addEventListener("click", () =>{
        limpiarTablero();
        tamano = document.getElementById("tamano").value;
        decremento = 0.3156 * (tamano-3);
        casillaActual = Math.floor(Math.random() * (tamano*tamano))+1;
        fichaVacia = casillaActual
        mostrarTablero();
        mostrarImagen();
    });
    function crearLista()
    {
        lista=[];
        for(i=1;i<10;i++)
        {   if(i!=fichaVacia)
            lista.push(i);

        }

        return lista;
    }
    function mezclarLista()
    {
        lista=crearLista();

        lista.sort(function() {
            return 0.5 - Math.random();
          });
          
        return lista;
        
    }
    function mezclarTablero(){
        iterador=0
        lista = mezclarLista();
        largo = lista.length;
        let casillas = document.querySelectorAll(".casilla");
        casillas.forEach(casilla => {
           //casillagris=document.getElementById(casillaActual.toString());
           cambio=document.getElementById((lista[iterador]).toString());
           //temp=casilla.id;
           temp2=casilla.innerHTML;
            //casilla.id=cambio.id;
           // cambio.id=temp;
           if (fichaVacia!=casilla.id ){
            casilla.innerHTML=cambio.innerHTML;
            cambio.innerHTML=temp2;
           }
            iterador+=1;
            mostrarImagen();
            console.log(casilla);
            
        });
    }

    botonMezclar.addEventListener("click", () => {
        mezclarTablero();
    });

    botonResolver.addEventListener("click", () => {
        
    });

    function moverCasilla(direccion){
        let casilla = document.getElementById(casillaActual.toString());
        //console.log(casilla.id);
        //console.log(casillaActual);
        console.log(tablero);
        let casillaArriba = document.getElementById((casillaActual-parseInt(tamano, 10)).toString());
        let casillaAbajo = document.getElementById((casillaActual+parseInt(tamano, 10)).toString());
        let casillaIzq = document.getElementById((casillaActual-1).toString());
        let casillaDer = document.getElementById((casillaActual+1).toString());

        if (direccion == "arriba" && casillaArriba != null) {
            casilla.innerHTML = casillaArriba.innerHTML;
            casillaArriba.innerHTML = fichaVacia.toString();
            casillaActual -= parseInt(tamano, 10);
            
        } else if (direccion == "abajo" && casillaAbajo != null) {
            casilla.innerHTML = casillaAbajo.innerHTML;
            casillaAbajo.innerHTML = fichaVacia.toString();
            casillaActual += parseInt(tamano, 10);

        } else if (direccion == "izq" && casillaIzq != null) {
            casilla.innerHTML = casillaIzq.innerHTML;
            casillaIzq.innerHTML = fichaVacia.toString();
            casillaActual -= 1;
            
        } else if (direccion == "der" && casillaDer != null) {
            casilla.innerHTML = casillaDer.innerHTML;
            casillaDer.innerHTML = fichaVacia.toString();
            casillaActual += 1;
        } else {

        }
        mostrarImagen();
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