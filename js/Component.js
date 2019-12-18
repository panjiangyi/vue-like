import Observer from './Observer';
import Compiler from './compiler';
export default class Component {
    constructor(option) {
        this.$data = option.data
        if (option.el != null) {
            this.$el = document.querySelector(option.el);
        }
        if (option.template != null) {
            this.$el = this.compileTemplate(option);
        }
        this.proxyData();
        this.init()
    }
    compileTemplate(option){
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = option.template;
        const fragement = document.createDocumentFragment();
        while(tmpDiv.firstChild){
            fragement.append(tmpDiv.firstChild)
        }
        return fragement
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