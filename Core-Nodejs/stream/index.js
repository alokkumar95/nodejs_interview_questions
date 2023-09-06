class Person{
    constructor(name){
        this.name=name
    }
}

const alok = new Person('sudanshu');


const buffer = new Buffer.from(alok.name);
console.log(buffer.toJSON())