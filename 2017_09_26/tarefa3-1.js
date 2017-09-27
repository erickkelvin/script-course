// Tarefa 3.1: Classe (ES6)
// Autor: Erick Kelvin

class Ordena {
    constructor(v, p) {
        this.v = v;
        this.p = p;
    }

    get ordenar() {
        return this.calculaOrdem();
    }  

    calculaOrdem() {
        if (v[0].isNaN) v.sort();
        else v.sort(function(a,b) { return a-b; });
        if (p=="d") v.reverse();
        return v;
    }
}

let v = [10,-6,37,5];
let p = "d";

const teste = new Ordena(v, p);

console.log(teste.ordenar);