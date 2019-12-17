import Observer from './Observer';
import Compiler from './compiler';
export default class MVVM {
    constructor(option) {
        this.$el = document.querySelector(option.el);
        this.$data = option.data
        this.proxyData();
        this.init()
    }
    init() {
        new Observer(this);
        new Compiler(this.$el, this);
    }
    proxyData() {
        Object.keys(this.$data).forEach(k => {
            Object.defineProperty(this, k, {
                enumerable: true,
                configurable: true,
                get() {
                    return this.$data[k]
                },
                set(v) {
                    this.$data[k] = v;
                }
            })
        })
    }
}