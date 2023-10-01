/* Autores:
    - Brandon Calderon Cubero
    - Esteban Solano Araya
    - Gerardo Gomez Brenes
    - Pamela Fernandez Mora
*/

var inicio = [];
var tablero_solucion = [];

var cerrados = [];
var abiertos = [];
var tamanoMatriz = 0;
var ruta = [];

/**
 * Reinicia las variables globales y llama a la funcion a_star()
 * @param {*} tableroInicial 
 * @param {*} tamano 
 * @returns 
 */
function a_starMain(tableroInicial, tamano) {
    ruta = [];
    cerrados = [];
    abiertos = [];
    inicio = tableroInicial.map((arr) => arr.slice());
    tablero_solucion = crearTableroSolucion([], tamano);
    tamanoMatriz = inicio[0].length - 1;
    a_star();
    return ruta;
}

/**
 * Retorna el tablero solucion segun el tamanno indicado en el parametro 
 * @param {Array<Array<number>>} tablero 
 * @param {number} tamano 
 * @returns {Array<Array<number>>}
 */
function crearTableroSolucion(tablero, tamano) {
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
 * Obtiene la posicion del cero en el tablero. Y lo retorna como una lista de dos elementos [fila,col].
 * @param {Array<Array<number>>} tablero 
 * @returns {number}
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
 * Retorna la posicion de un numero en el tablero.
 * @param {Array<Array<number>>} tablero 
 * @param {number} elemento 
 * @returns {Array<number>}
 */
function obtenerPosicionElemento(tablero, elemento) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == elemento) {
                return [i,j];
            }
        }
    }
}

/**
 * Genera una lista de los posibles movimientos que pueden realizarse en el tablero.
 * @param {Array<Array<number>>} tablero 
 * @returns Array<Array<number>>
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
    if (fila < tamanoMatriz) {
        posiblesMovimientos.push([fila+1, columna]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna > 0) {
        posiblesMovimientos.push([fila, columna-1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    if (columna < tamanoMatriz) {
        posiblesMovimientos.push([fila, columna+1]);
    } else {
        posiblesMovimientos.push([-1,-1]);
    }
    return posiblesMovimientos;
}

/**
 * Si el tablero actual existe en la lista de tableros cerrados, retorna true. De lo contrario retorna false.
 * @param {} listaCerrados 
 * @param {} tablero 
 * @returns 
 */
function tableroYaFueRevisado(listaCerrados, tablero) {
    for (let i = 0; i < listaCerrados.length; i++) {
        if (listaCerrados[i][1].toString() == tablero.toString()) {
            return true;
        }
    }
    return false;
}

/**
 * Retorna una lista con los todos los posibles tableros de acuerdo a los posibles movimientos.
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
            continue;
        }
        let tableroCopia = tablero.map((arr) => arr.slice());
        tableroCopia[fila][columna] = 0;
        tableroCopia[posicionCero[0]][posicionCero[1]] = tablero[fila][columna];
        if (tableroYaFueRevisado(cerrados, tableroCopia)) {
            continue;
        }
        posiblesTableros.push(tableroCopia);
    }
    return posiblesTableros;
}

/**
 * Calcula la distancia Manhattan de un tablero de su posicion actual a su posicion final.
 * @param {Array<Array<number>>} tablero 
 * @returns number
 */
function h(tablero){
    let h = 0
    for (let i = 0; i < tablero.length; i++)
        for (let j = 0; j < tablero[i].length; j++){
            let pos = obtenerPosicionElemento(tablero_solucion, tablero[i][j])
            h += Math.abs(pos[0]-i) + Math.abs(pos[1]-j)
        }
    return h;
}

/**
 * Funcion f del algoritmo A*. Retorna la suma de la funcion h y la funcion g (el nivel en el que se encuentra el tablero).
 * @param {Array<Array<number>>} tablero 
 * @param {number} g 
 * @returns {number}
 */
function f(tablero, g){
    return h(tablero) + g;
}

/**
 * Convierte matriz a id.
 * @param {*} tablero 
 * @returns {String}
 */
function convertirMatrizId(tablero){
    let id = ''
    for (let i = 0; i < tablero.length; i++){
        for (let j = 0; j < tablero[i].length; j++){
            id += tablero[i][j].toString();
        }
    }
    return id  
}

/**
 * Crea lista con los nodos hijos de un tablero.
 * @param {Array<number>} hijos 
 * @param {Array<number>} padre 
 * @param {number} nivel 
 * @returns 
 */
function crearNodosHijos(hijos, padre, nivel){
    let nodosHijos = [];
    for (let i = 0; i < hijos.length; i++){
        let matrizNodo = hijos[i];
        let nodo = [[padre, convertirMatrizId(matrizNodo)], matrizNodo, f(matrizNodo, nivel), nivel];
        nodosHijos.push(nodo);
    }
    return nodosHijos;
}

/**
 * Ordena los hijos de un tablero de menor a mayor, de acuerdo a su f.
 * @param {Array<Array<number>>} hijos 
 * @returns {Array<Array<number>>}
 */
function sortNodos(hijos){
    for (let i = 0; i < hijos.length; i++) {
        for (let j = 0; j < hijos.length; j++) {
            if (hijos[i][2] < hijos[j][2]) {
                let temp = hijos[i]
                hijos[i] = hijos[j]
                hijos[j] = temp
            }
        }
    }
    return hijos
}

/**
 * Usando las funciones definidas arriba, lleva a cabo la solucion del tablero usando el algoritmo A*
 * y genera una ruta de solución. 
 * Estructura del nodo usado: [[matrizPadre, matrizActual], matriz, f, nivel]
 * @returns {Array<Array<number>>}
 */
function a_star(){
    let raiz = [[0, convertirMatrizId(inicio)], inicio, f(inicio, 0), 0];
    abiertos.push(raiz);
    let actual = abiertos[0];
    while (h(actual[1]) != 0){
        actual = abiertos[0];

        let hijos = generarPosiblesTableros(actual[1]);
        let nodosHijos = crearNodosHijos(hijos, actual[0][1], actual[3]+1);
        let hijosOrdenados = sortNodos(nodosHijos);

        for (let i = 0; i < hijosOrdenados.length; i++){
            abiertos.push(hijosOrdenados[i]);
        }

        cerrados.push(actual);
        abiertos.shift();
        abiertos = sortNodos(abiertos);
    }
    let tam = cerrados.length;
    let movimiento = ""

    let nodoActual = cerrados[tam - 1];
    let idSig = nodoActual[0][0];
    ruta.push(nodoActual);

    for (let i = tam - 1; i >= 0; i--){
        nodoActual = cerrados[i];

        if (nodoActual[0][1] == idSig){
            ruta.push(nodoActual);
            idSig = nodoActual[0][0];
        }
    }
    return;
}
