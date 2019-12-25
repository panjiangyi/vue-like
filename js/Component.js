import Observer from './Observer';
import Compiler from './compiler';
export default class Component {
    constructor(option) {
        this.$data = option.data;
        if (typeof option.data === 'function') {
            this.$data = option.data();
        }
        this.initLifeCircle(option);
        this.proxyData();
        this.$template = this.compileTemplate(option);
        new Observer(this);
        this.created()
    }
    initLifeCircle(option) {
        [
            'created',
            'beforeMounted',
            'mounted',
            'beforeUpdate',
            'updated',
            'beforeDestory',
            'destoryed',
        ].forEach(k => this[k] = option[k] || (() => { }))
    }
    render() {
        const compilerInstance = new Compiler(this.$template, this);
        delete this.$template;
        return compilerInstance.getCompiledFragement();
    }
    compileTemplate(option) {
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = option.template;
        const fragement = document.createDocumentFragment();
        while (tmpDiv.firstChild) {
            fragement.append(tmpDiv.firstChild)
        }
        return fragement
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