import Dep from './Dep';
export default class Watcher {
    constructor(node, expr, vm, cb) {
        this.node = node;
        this.expr = expr;
        this.vm = vm;
        this.cb = cb || (() => { })
        Dep.target = this;
        this.oldValue = this.getValue()
        Dep.target = null;
    }
    getValue() {
        return this.expr.split('.').reduce((last, k) => {
            return last[k]
        }, this.vm.$data)
    }
    update() {
        const newValue = this.getValue();
        if (newValue === this.oldValue) return;
        this.oldValue = newValue;
        this.cb(newValue)
    }
}