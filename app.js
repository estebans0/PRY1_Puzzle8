var tablero = [];
var tamano = 3;

window.onload = function(){
    mostrarTablero();
}



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
            let num = tablero[f][c];
            casilla.innerHTML = num;
            casilla.classList.add("casilla");
            casilla.style.height = (90/tamano).toString() + "%";
            casilla.style.width = (90/tamano).toString() + "%";
            document.querySelector(".tablero").append(casilla);
        }
    }
}
