var tableroFinal = [[1,2,3],[4,5,6],[7,8,0]];
var tableroInicial = [
    [4,1,3],
    [0,2,6],
    [7,5,8]];
var arbol = [];
var tableros = [];
var solucionado = false;
var indiceSolucion = 0;
var listaSolucion = [];

// Agrega el tablero inicial al arbol
arbol.push(tableroInicial);
console.log(backtracking(0))
//console.log(arbol);

function obtenerPadreHijos(n) {
    let padre = Math.floor((n-1)/4);
    let hijo1 = 4*n + 1;
    let hijo2 = 4*n + 2;
    let hijo3 = 4*n + 3;
    let hijo4 = 4*n + 4;
    return [padre, hijo1, hijo2, hijo3, hijo4];
}

function obtenerPosicionCero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == 0) {
                return [i,j];
            }
        }
    }
}

function matrizMovimientoImposible(n, m) {
    const matriz = [];
    for (let i = 0; i < n; i++) {
      matriz[i] = [];
      for (let j = 0; j < m; j++) {
        matriz[i][j] = -1;
      }
    }
    return matriz;
}


function generarPosiblesMovimientos(tablero) {
    let posiblesMovimientos = [];
    let posCero = obtenerPosicionCero(tablero);
    let fila = posCero[0];
    let columna = posCero[1];
    if (fila > 0) {
        posiblesMovimientos.push([fila-1, columna]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (fila < 2) {
        posiblesMovimientos.push([fila+1, columna]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna > 0) {
        posiblesMovimientos.push([fila, columna-1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna < 2) {
        posiblesMovimientos.push([fila, columna+1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    return posiblesMovimientos;
}

function generarPosiblesTableros(tablero) {
    let posiblesTableros = [];
    if (tablero[0][0] == -1) {
        for (let i = 0; i < 4; i++) {
            posiblesTableros.push(tablero);
        }
        return posiblesTableros;
    }
    let posiblesMovimientos = generarPosiblesMovimientos(tablero);
    let posicionCero = obtenerPosicionCero(tablero);
    for (let i = 0; i < posiblesMovimientos.length; i++) {
        let fila = posiblesMovimientos[i][0];
        let columna = posiblesMovimientos[i][1];
        if (fila == -1 || columna == -1) {
            matrizNula = matrizMovimientoImposible(tableroInicial.length, tableroInicial[0].length)
            posiblesTableros.push(matrizNula);
            continue;
        }
        let tableroCopia = tablero.map((arr) => arr.slice());
        tableroCopia[fila][columna] = 0;
        tableroCopia[posicionCero[0]][posicionCero[1]] = tablero[fila][columna];
        posiblesTableros.push(tableroCopia);
    }
    return posiblesTableros;
}

function llenarArbol(posiblesTableros) {
    for (let i = 0; i < posiblesTableros.length; i++) {
        arbol.push(posiblesTableros[i]);
    }
}

function esSolucion(estado) {
    for (let i = 0; i < estado.length; i++) {
        for (let j = 0; j < estado[i].length; j++) {
            if (estado[i][j] != tableroFinal[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function obtenerMovimientos(indiceSolucion) {
    while (indiceSolucion > 0) {
        let padre = Math.floor((indiceSolucion-1)/4);
        listaSolucion.push(arbol[padre]);
        indiceSolucion = padre;
    }
    return listaSolucion;
}

function backtracking(k){
    // Genera los posibles tableros de cada posible tablero generado en el paso anterior y los agrega al arbol
    tableros = generarPosiblesTableros(arbol[k]);
    llenarArbol(tableros);
    for (let i = 0; i < tableros.length; i++) {
        if (esSolucion(tableros[i])) {
            indiceSolucion = (k*4)+i+1;
            listaSolucion.push(arbol[indiceSolucion]);
            return obtenerMovimientos(indiceSolucion);
        }
    }
    return backtracking(k+1);
}
