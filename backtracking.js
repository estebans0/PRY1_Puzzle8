//tablero 3x3
var tableroFinal = [[1,2,3],[4,5,6],[7,8,0]];
var tableroInicial = 
[[1,2,3],
 [4,5,6],
 [0,7,8]];
//tablero 4x4
//var tableroFinal = [
//    [1,2,3,4],
//    [5,6,7,8],
//    [9,10,11,12],
//    [13,14,15,0]];
//var tableroInicial = [
//    [1,2,3,4],
//    [5,7,0,8],
//    [10,6,11,12],
//    [9,13,14,15]];
// tablero 5x5
//var tableroFinal = [
//    [1,2,3,4,5],
//    [6,7,8,9,10],
//    [11,12,13,14,15],
//   [16,17,18,19,20],
//    [21,22,23,24,0]];
//var tableroInicial = [
//   [1,2,3,4,0],
//    [6,7,8,9,5],
//    [11,12,13,14,10],
//    [16,17,18,19,15],
//    [21,22,23,24,20]];
//var tableroInicial = [
//    [1,2,3,4,5],
//    [6,0,8,9,10],
//    [11,7,13,14,15],
//    [16,12,17,18,20],
//    [21,22,23,19,24]];
// tablero 6x6
//var tableroFinal = [
//    [1,2,3,4,5,6],
//    [7,8,9,10,11,12],
//    [13,14,15,16,17,18],
//    [19,20,21,22,23,24],
//    [25,26,27,28,29,30],
//   [31,32,33,34,35,0]];
//var tableroInicial = [
//    [1,2,3,4,5,6],
//    [7,8,9,10,11,12],
//    [13,14,15,16,17,0],
//    [19,20,21,22,23,18],
//   [25,26,27,28,29,24],
//   [31,32,33,34,35,30]];
var tamanoMatriz = tableroInicial[0].length - 1;
var arbol = [];
var tableros = [];
var solucionado = false;
var indiceSolucion = 0;
var listaSolucion = [];

function convertirMatrizId(tablero){
    let id = ''
    for (let i = 0; i < tablero.length; i++){
        for (let j = 0; j < tablero[i].length; j++){
            id += tablero[i][j].toString();
        }
    }
    return id  
}

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
    [[],]
function generarPosiblesTableros(tablero) {
    let matrizPadre=tablero[0][1];
    tablero=tablero[1];
    let posiblesTableros = [];
    if (tablero[1][0] == -1) { // Caso de tableros negativos. Genera hijos negativos
        for (let i = 0; i < tablero[0].length; i++) {
           
            matrizActual=convertirMatrizId(tablero);
            nodo=[[matrizPadre,matrizActual],tablero];
            posiblesTableros.push(nodo);
        }
        return posiblesTableros;
    }
    let posiblesMovimientos = generarPosiblesMovimientos(tablero);
    let posicionCero = obtenerPosicionCero(tablero);
    for (let i = 0; i < posiblesMovimientos.length; i++) {
        let fila = posiblesMovimientos[i][0];
        let columna = posiblesMovimientos[i][1];
        if (fila == -1 || columna == -1) { // Movimiento imposible
            matrizNula = matrizMovimientoImposible(tableroInicial.length, tableroInicial[0].length)
            matrizActual=convertirMatrizId(matrizNula);
            nodo=[[matrizPadre,matrizActual],matrizNula]
            posiblesTableros.push(nodo);
            continue;
        }
        let tableroCopia = tablero.map((arr) => arr.slice());
        tableroCopia[fila][columna] = 0;
        tableroCopia[posicionCero[0]][posicionCero[1]] = tablero[fila][columna];
        matrizActual=convertirMatrizId(tableroCopia);
        nodo=[[matrizPadre,matrizActual],tableroCopia]
        posiblesTableros.push(nodo); // Agrega el tablero generado a la lista de posibles tableros
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
        console.log(padre)
        listaSolucion.push(arbol[padre]);
        indiceSolucion = padre;
    }
    return listaSolucion;
}

// Backtracking
// [[matrizPadre, matrizActual], matriz]
function backtracking(k){
    // Genera los posibles tableros de cada posible tablero generado en el paso anterior y los agrega al arbol
    
    tableros = generarPosiblesTableros(arbol[k]);
    llenarArbol(tableros);
    for (let i = 0; i < tableros.length; i++) {
        if (esSolucion(tableros[i][1])) { // Esto hay que cambiarlo
            let tam=arbol.length;
            let ruta=[];


            let nodoActual=arbol[tam-1];
            let idSig=nodoActual[0][0];
            ruta.push(nodoActual);
            for (let i = tam - 1; i >= 0; i--){
                nodoActual = arbol[i];
        
                if (nodoActual[0][1] == idSig){
                    ruta.push(nodoActual);
                    idSig = nodoActual[0][0];
                }  
            }
            ruta[0]=[[0,convertirMatrizId(tableroFinal)],tableroFinal];
            return ruta;
            //indiceSolucion = (k*4)+i+1;
            //listaSolucion.push(tableros[i]);
            //return obtenerMovimientos(indiceSolucion);
        }
    }
    //return arbol;
    return backtracking(k+1);
}

// Agrega el tablero inicial al arbol
arbol.push([[0,convertirMatrizId(tableroInicial)],tableroInicial]);
console.log(backtracking(0));