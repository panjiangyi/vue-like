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
            new Watcher(node, value, this.vm, () => {
                utils[commander](node, this.getValueByExp(value))
            });
            utils[commander](node, this.getValueByExp(value))
        })
    }
    updateText(node, expr) {
        node.textContent = expr.replace(/{{([^}]+)}}/g, (...k) => {
            return this.getValueByExp(k[1])
        })
    }
    compileText(node) {
        console.log('-123--', node.textContent)
        const expr = node.textContent;
        node.textContent = expr.replace(/{{([^}]+)}}/g, (...k) => {
            new Watcher(node, k[1], this.vm, () => {
                this.updateText(node, expr)
            });
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