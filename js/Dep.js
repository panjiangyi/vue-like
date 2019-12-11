export default class Dep {
    constructor(){
        this.arr = [];
    }
    add(item){
        this.arr.push(item)
    }
    publish(){
        this.arr.forEach(k=>k.update());
    }
}