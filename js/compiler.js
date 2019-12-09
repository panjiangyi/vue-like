class Compiler {
    constructor(el, vm) {
        this.el = el;
        this.vm = vm;
        this.node2fragement()
        this.compile()
        this.el.append(this.fragement)
    }
    node2fragement() {
        const fragement = this.fragement = document.createDocumentFragment();
        while (this.el.firstChild) {
            fragement.append(this.el.firstChild)
        }
        return fragement
    }
    isDetective(name) {
        return name.includes('v-');
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    getValueByExp(exp) {
        return exp.split('.').reduce((last, k) => {
            return last[k]
        }, this.vm.$data)
    }
    compileNode(node) {
        const attrlist = node.attributes;
        [...attrlist].forEach(({ name, value }) => {
            if (!this.isDetective(name)) return;
            const commander = name.replace('v-', '')
            utils[commander](node, this.getValueByExp(value))
        })
    }
    compileText(node) {
        node.textContent = node.textContent.replace(/{{([^}]+)}}/g, (...k) => {
            return this.getValueByExp(k[1])
        })
    }
    compile() {
        const children = this.fragement.childNodes;
        children.forEach(node => {
            if (this.isElementNode(node)) {
                this.compileNode(node)
            } else {
                this.compileText(node)
            }
        })
    }
}

const utils = {
    model(node, value) {
        node.value = value;
    }
}