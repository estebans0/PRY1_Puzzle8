var tableroFinal = [[1,2,3],[4,5,6],[7,8,0]];
var tableroInicial = [
    [1,4,3],
    [5,0,8],
    [7,6,3]];
var arbol = [];

main()

/**
 * Esta función retorna el índice del padre de un tablero (Movimiento previo) y sus hijos (Movimientos siguientes).
 * @param {number} n 
 * @returns {Array<number>}
 */
function obtenerPadreHijos(n) {
    let padre = Math.floor((n-1)/4);
    let hijo1 = 4*n + 1;
    let hijo2 = 4*n + 2;
    let hijo3 = 4*n + 3;
    let hijo4 = 4*n + 4;
    return [padre, hijo1, hijo2, hijo3, hijo4];
}
/**
 * Recorre todo el arreglo hasta encontrar un cero. Para así retornar la posición de este.
 * @param {Array<Array<number>>} tablero 
 * @returns {Array[number]} - Posicion del 0 en el tablero
 */
function obtenerPosicionCero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == 0) {
                return [i,j];
            }
        }
    }
}

/**
 * Retorna matriz de tamanno nxm para que sea usada como indicador en el arbol de que ese movimiento es inválido.
 * @param {*} n 
 * @param {*} m 
 * @returns {Array<Array<number>>}
 */
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


/**
 * Retorna una lista de tuplas con los movimientos que se pueden realizar en un tablero a partir de la posicion en la que se encuentra el 0.
 * Si un movimiento no es posible, se agrega la tupla [-1,-1]
 * @param {Array<Array<number>>} tablero 
 * @returns {Array<Array<number>>}
 */
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

/**
 * Retorna una lista de los tableros que se pueden generar a partir de la posicion en la que se encuentra el 0.
 * @param {Array<Array<number>>} tablero 
 * @returns {Array<Array<Array<number>>>}
 */
function generarPosiblesTableros(tablero) {
    let posiblesTableros = [];
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

/**
 * A partir de una lista de tableros, los agrega al arbol.
 * @param {Array<Array<number>>} posiblesTableros 
 */
function llenarArbol(posiblesTableros) {
    for (let i = 0; i < posiblesTableros.length; i++) {
        arbol.push(posiblesTableros[i]);
    }
}

function main(){
    // Agrega el tablero inicial al arbol
    arbol.push(tableroInicial);

    let solucionEncontrada = false;
    let corte = 0;
    while(!solucionEncontrada){
        for (let i = corte; i < arbol.length(); i++){

        }
    }

    // Genera los posibles tableros a partir del tablero inicial y los agrega al arbol
    let tableros = generarPosiblesTableros(tableroInicial);
    llenarArbol(tableros);

    // Genera los posibles tableros de cada posible tablero generado en el paso anterior y los agrega al arbol
    tableros = generarPosiblesTableros(arbol[1]);
    llenarArbol(tableros);

    tableros = generarPosiblesTableros(arbol[2]);
    llenarArbol(tableros);

    tableros = generarPosiblesTableros(arbol[3]);
    llenarArbol(tableros);

    tableros = generarPosiblesTableros(arbol[4]);
    llenarArbol(tableros);

    // Imprime el arbol
    console.log(arbol);

    // Imprime el padre y los hijos de cada nodo
    console.log(obtenerPadreHijos(1));
    prueba = obtenerPadreHijos(1)

    for(let i = 0; i < prueba.length; i++){
        console.log(arbol[prueba[i]]);
    }

    //console.log(obtenerPadreHijos(2));
    //console.log(obtenerPadreHijos(3));
    //console.log(obtenerPadreHijos(4));
}