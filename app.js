const contenedor_puzzle = document.querySelector("#contenedor_puzzle");
let puzzle = [];
let tamano_puzzle = 3;

generarPuzzle();

function obtenerFila(posicion) {
    return Math.ceil(posicion / tamano_puzzle);
}

function obtenerColumna(posicion) {
    let col = posicion % tamano_puzzle;
    if (col == 0) {
        return tamano_puzzle; }
    return col;
}

function generarPuzzle() {
    for (let i = 1; i < tamano_puzzle * tamano_puzzle; i++) {
        puzzle.push({
            valor: i,
            posicion: i,
            x: (obtenerColumna(i) - 1) * 200,
            y: (obtenerFila(i) - 1) * 200,
        });
    }
    console.log(puzzle);
}
