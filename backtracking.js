var tableroFinal = [];
var tableroInicial = [];
//var tableroFinal = [[1,2,3],[4,5,6],[7,8,0]];
//var tableroInicial = 
//[[1,2,3],
// [4,5,6],
// [0,7,8]];
var tamanoMatriz = 0
var arbol = [];
var tableros = [];
var solucionado = false;
var indiceSolucion = 0;
var rutaB = [];

// Agrega el tablero inicial al arbol
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

function convertirMatrizIdB(tablero){
    let id = ''
    for (let i = 0; i < tablero.length; i++){
        for (let j = 0; j < tablero[i].length; j++){
            id += tablero[i][j].toString();
        }
    }
    return id  
}

function obtenerPosicionCeroB(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] == 0) {
                return [i,j];
            }
        }
    }
}

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
    [[],]
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

function llenarArbolB(posiblesTableros) {
    for (let i = 0; i < posiblesTableros.length; i++) {
        arbol.push(posiblesTableros[i]);
    }
}

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

function obtenerMovimientosB(indiceSolucion) {
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
    
    tableros = generarPosiblesTablerosB(arbol[k]);
    llenarArbolB(tableros);
    for (let i = 0; i < tableros.length; i++) {
        if (esSolucionB(tableros[i][1])) { // Esto hay que cambiarlo
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
            //indiceSolucion = (k*4)+i+1;
            //listaSolucion.push(tableros[i]);
            //return obtenerMovimientosB(indiceSolucion);
        }
    }
    //return arbol;
    return backtracking(k+1);
}

