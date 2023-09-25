var tableroFinal = [[1,2,3],[4,5,6],[7,8,0]];
var tableroInicial = [
    [1,2,3],
    [4,5,6],
    [7,0,8]];
var arbol = [];

main()

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
    if (tablero[0][0] != -1){
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
    }else{
        for (let i = 0; i < 4; i++){
            matrizNula = matrizMovimientoImposible(tableroInicial.length, tableroInicial[0].length)
            posiblesTableros.push(matrizNula);
        }
    }
    return posiblesTableros;
}

function llenarArbol(posiblesTableros) {
    for (let i = 0; i < posiblesTableros.length; i++) {
        arbol.push(posiblesTableros[i]);
    }
}

function main(){
    // Agrega el tablero inicial al arbol
    arbol.push(tableroInicial);

    // Genera los posibles tableros a partir del tablero inicial y los agrega al arbol
    let tableros = generarPosiblesTableros(tableroInicial);
    llenarArbol(tableros);

    for (let i = 0; i < tableros.length; i++){
        console.log(tableroFinal == tableros[i])
        //console.log(tableros[i])
        if (tableroFinal == tableros[i]){
            return; 
        }
    }

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