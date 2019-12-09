class Watcher{ // 因为要获取老值 所以需要 "数据" 和 "表达式"
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 先获取一下老的值 保留起来
        this.value = this.get();
    }
    // 老套路获取值的方法，这里先不进行封装
    getVal(vm, expr) { 
        expr = expr.split('.'); 
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    }
    get(){
        Dep.target = this;
        let value = this.getVal(this.vm,this.expr);
        Dep.target = null;
        return value;
    }
    // 对外暴露的方法，如果值改变就可以调用这个方法来更新
    update(){
        let newValue = this.getVal(this.vm, this.expr);
        let oldValue = this.value;
        if(newValue != oldValue){
            this.cb(newValue); // 对应watch的callback
        }
    }
}
