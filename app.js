document.addEventListener('DOMContentLoaded', () => {
    const botonTamano = document.getElementById('generar');
    var tablero = [];
    var tamano = 3;
    var decremento = 0.3;

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
                casilla.id = f.toString() + "-" + c.toString();
                console.log(casilla.id);
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

    botonTamano.addEventListener("click", () =>{
        limpiarTablero();
        tamano = document.getElementById("tamano").value;
        decremento = 0.315 * (tamano-3)
        mostrarTablero();
    });
});