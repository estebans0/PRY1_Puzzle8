/* Autores:
    - Brandon Calderon Cubero
    - Esteban Solano Araya
    - Gerardo Gomez Brenes
    - Pamela Fernandez Mora
*/

var tableroFinal = [];
var tableroInicial = [];
var tamanoMatriz = 0
var arbol = [];
var tableros = [];
var solucionado = false;
var indiceSolucion = 0;
var rutaB = [];

/**
 * Reinicia las variables globales, agrega el tablero inicial al arbol
 * y llama a la funcion backtracking()
 * @param {Array<Array<number>>} tablero 
 * @param {number} tamano 
 * @returns  {Array}
 */
function backtrackingMain(tablero, tamano) {
    rutaB = [];
    arbol = [];
    tableroInicial = tablero.map((arr) => arr.slice());
    tamanoMatriz = tableroInicial[0].length - 1;
    tableroFinal = crearTableroSolucionB([], tamano);
    arbol.push([[0,convertirMatrizIdB(tableroInicial)],tableroInicial]);
    backtracking(0);
    return rutaB;
}
/**
 * Retorna el tablero solucion segun la variable tablero y tamano entrando como parametros.
 * @param {Array<Array<number>>} tablero 
 * @param {number} tamano 
 * @returns {Array<Array<number>>}
 */
function crearTableroSolucionB(tablero, tamano) {
    for (let f = 0; f < tamano; f++) {
        tablero[f] = [];
        for (let c = 0; c < tamano; c++) {
            tablero[f][c] = f*tamano + c + 1;
        }
    }
    tablero[tamano-1][tamano-1] = 0;
    return tablero;
}

/**
 * Convierte la matriz en un string para que sea usado como id.
 * @param {Array<Array<number>>} tablero 
 * @returns {string}
 */
function convertirMatrizIdB(tablero){
    let id = ''
    for (let i = 0; i < tablero.length; i++){
        for (let j = 0; j < tablero[i].length; j++){
            id += tablero[i][j].toString();
        }
    }
    return id  
}

/**
 * Obtiene la posicion del cero en el tablero. Y lo retorna como una lista de dos elementos [fila,col].
 * @param {Array<Array<number>>} tablero 
 * @returns number
 */
function obtenerPosicionCeroB(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == 0) {
                return [i,j];
            }
        }
    }
}

/**
 * Retorna matriz llena de -1 indicando que el movimiento hacia esa posicion es invalido.
 * @param {number} n 
 * @param {number} m 
 * @returns Array<Array<number>>
 */
function matrizMovimientoImposibleB(n, m) {
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
 * Genera una lista de los posibles movimientos que pueden realizarse en el tablero.
 * @param {number} n 
 * @param {number} m 
 * @returns Array<Array<number>>
 */
function generarPosiblesMovimientosB(tablero) {
    let posiblesMovimientos = [];
    let posCero = obtenerPosicionCeroB(tablero);
    let fila = posCero[0];
    let columna = posCero[1];
    if (fila > 0) { // Movimiento abajo
        posiblesMovimientos.push([fila-1, columna]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (fila < tamanoMatriz) {  // Movimiento arriba
        posiblesMovimientos.push([fila+1, columna]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna > 0) { // Movimiento izquierda
        posiblesMovimientos.push([fila, columna-1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna < tamanoMatriz) { // Movimiento derecha
        posiblesMovimientos.push([fila, columna+1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    return posiblesMovimientos;
}

/**
 * Retorna una lista con los todos los posibles tableros de acuerdo a los posibles movimientos.
 * @param {Array<Array<number>>} tablero 
 * @returns Array<Array<number>>
 */
function generarPosiblesTablerosB(tablero) {
    let matrizPadre=tablero[0][1];
    tablero=tablero[1];
    let posiblesTableros = [];
    if (tablero[1][0] == -1) { // Caso de tableros negativos. Genera hijos negativos
        for (let i = 0; i < tablero[0].length; i++) {
           
            matrizActual=convertirMatrizIdB(tablero);
            nodo=[[matrizPadre,matrizActual],tablero];
            posiblesTableros.push(nodo);
        }
        return posiblesTableros;
    }
    let posiblesMovimientos = generarPosiblesMovimientosB(tablero);
    let posicionCero = obtenerPosicionCeroB(tablero);
    for (let i = 0; i < posiblesMovimientos.length; i++) {
        let fila = posiblesMovimientos[i][0];
        let columna = posiblesMovimientos[i][1];
        if (fila == -1 || columna == -1) { // Movimiento imposible
            matrizNula = matrizMovimientoImposibleB(tableroInicial.length, tableroInicial[0].length)
            matrizActual=convertirMatrizIdB(matrizNula);
            nodo=[[matrizPadre,matrizActual],matrizNula]
            posiblesTableros.push(nodo);
            continue;
        }
        let tableroCopia = tablero.map((arr) => arr.slice());
        tableroCopia[fila][columna] = 0;
        tableroCopia[posicionCero[0]][posicionCero[1]] = tablero[fila][columna];
        matrizActual=convertirMatrizIdB(tableroCopia);
        nodo=[[matrizPadre,matrizActual],tableroCopia]
        posiblesTableros.push(nodo); // Agrega el tablero generado a la lista de posibles tableros
    }
    return posiblesTableros;
}

/**
 * Agrega los posibles tableros al arbol.
 * @param {Array<Array<number>>} posiblesTableros 
 */
function llenarArbolB(posiblesTableros) {
    for (let i = 0; i < posiblesTableros.length; i++) {
        arbol.push(posiblesTableros[i]);
    }
}

/**
 * Si el estado de un tablero es igual al tablero final retorna true. De lo contrario retorna false.
 * @param {Array<number>} estado 
 * @returns {Boolean} 
 */
function esSolucionB(estado) {
    for (let i = 0; i < estado.length; i++) {
        for (let j = 0; j < estado[i].length; j++) {
            if (estado[i][j] != tableroFinal[i][j]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Funcion que junto las demas definidas anteriormente, cumple con el proposito de solucionar el tablero
 * y llevar registro de los pasos que se usaron para hacerlo. Usa recursividad.
 * Estructura del nodo usado: [[matrizPadre, matrizActual], matriz]  
 * @param {*} k 
 * @returns {Array<Array<number>>}
 */
function backtracking(k){
    // Genera los posibles tableros de cada posible tablero generado en el paso anterior y los agrega al arbol
    tableros = generarPosiblesTablerosB(arbol[k]);
    llenarArbolB(tableros);
    for (let i = 0; i < tableros.length; i++) {
        if (esSolucionB(tableros[i][1])) {
            let tam=arbol.length;

            let nodoActual=arbol[tam-1];
            let idSig=nodoActual[0][0];
            rutaB.push(nodoActual);
            for (let i = tam - 1; i >= 0; i--){
                nodoActual = arbol[i];
        
                if (nodoActual[0][1] == idSig){
                    rutaB.push(nodoActual);
                    idSig = nodoActual[0][0];
                }  
            }
            rutaB[0]=[[0,convertirMatrizIdB(tableroFinal)],tableroFinal];
            return rutaB;
        }
    }
    return backtracking(k+1);
}
