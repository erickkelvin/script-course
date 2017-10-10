// Tarefa 3.5: Object literal
// Autor: Erick Kelvin

class DataManager {
    constructor(obj) {
        this.obj = obj;
    }
    
    getAll() {
        return this.obj;
    }
    
    get(key) {
        return this.obj[key];
    }
    
    add(key, value) {
        return this.obj[key] = value;
    }
    
    edit(key, value) {
        return this.obj[key] = value;
    }
    
    delete(key) {
        return delete this.obj[key];
    }
    
    size() {
        return Object.keys(this.obj).length;
    }
}

let book = {
    name: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    language: "English",
    year: "1997"
};

let test = new DataManager(book);

console.log(test.edit('name','RAN'));

console.log(test.size());