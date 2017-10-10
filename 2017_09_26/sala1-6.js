// Tarefa 3.6: Object literal e JSON
// Autor: Erick Kelvin

// JSON é um formato de dados, assim como o XML, e é originado da notação de object literal do Javascript.
// Object literals do Javascript fazem parte da linguagem e, assim, podem ser lidos e manuseados facilmente.
// Uma string JSON pode ser convertida num object literal usando o método JSON.parse e um object literal
// pode ser convertido numa string JSON usando o método JSON.stringify, como mostrado abaixo:

let json1 = '{"foo": "bar", "bar" : "baz"}';
let obj1 = JSON.parse(json1);

let obj2 =  {foo: 'bar', bar : 'baz'};
let json2 = JSON.stringify(obj2);