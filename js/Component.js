import Observer from './Observer';
import Compiler from './compiler';
class componentTree {
    constructor(){
        this.$children = [];
    }
    addChild(child){
        this.$children.push(child);
    }
}
let vid = 0;
export default class Component extends componentTree {
    constructor(option) {
        super();

        // unique id for each component;
        this.$vid = vid++;

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
        const dom = compilerInstance.getCompiledFragement();
        //root dom of current component
        this.$el = dom.children[0];
        return dom
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