import Dep from './Dep';
import Watcher from './watcher';
export default class Compiler {
    constructor(el, vm) {
        this.el = el;
        this.vm = vm;
        this.node2fragement()
        this.compile(this.fragement.childNodes)
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
    nodeInteractive(node, expr) {
        node.addEventListener('input', (e) => {
            const exprArr = expr.split('.');
            const len = exprArr.length;
            let idx = 0;
            exprArr.reduce((last, k) => {
                idx++
                if (idx === len) {
                    last[k] = e.target.value;
                    return
                }
                return last[k]
            }, this.vm.$data)
        })
    }
    compileNode(node) {
        const attrlist = node.attributes;
        [...attrlist].forEach(({ name, value }) => {
            if (!this.isDetective(name)) return;
            const commander = name.replace('v-', '')
            new Watcher(node, value, this.vm, () => {
                utils[commander](node, this.getValueByExp(value))
            });
            utils[commander](node, this.getValueByExp(value));
            this.nodeInteractive(node, value)
        })
         // 递归处理node节点的子节点
         this.compile(node.childNodes);
    }
    updateText(node, expr) {
        node.textContent = expr.replace(/{{([^}]+)}}/g, (...k) => {
            return this.getValueByExp(k[1])
        })
    }
    compileText(node) {
        const expr = node.textContent;
        node.textContent = expr.replace(/{{([^}]+)}}/g, (...k) => {
            new Watcher(node, k[1], this.vm, () => {
                this.updateText(node, expr)
            });
            return this.getValueByExp(k[1])
        })
    }
    compile(children) {
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