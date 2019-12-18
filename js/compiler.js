import Watcher from './watcher';
import Component from './Component';
import { getGlobalComponents } from './vue-like';
let idx = 0; //临时禁止过多嵌套
export default class Compiler {
    constructor(el, vm) {
        this.el = el;
        this.vm = vm;
        this.node2fragementHOC()
        this.compile(this.fragement.childNodes)
        this.el.append(this.fragement)
    }
    node2fragementHOC() {
        const fragement = this.fragement = document.createDocumentFragment();
        this.node2fragement(this.el, fragement)
    }
    node2fragement(source, fragement) {
        while (source.firstChild) {
            const nodeName = source.firstChild.nodeName.toLowerCase();
            // const com = getGlobalComponents()[nodeName];
            // if (com) {
            // const vm = com();
            // fragement.append(vm.$el);
            // source.firstChild.parentNode.removeChild(source.firstChild)
            // } else {
            fragement.append(source.firstChild)
            // }
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
        console.log('---', node)
        if (node.getAttribute('v') != null) return;
        const nodeName = node.nodeName.toLowerCase();
        node.setAttribute('v', '');
        const comOption = getGlobalComponents()[nodeName];
        if (idx < 2 && comOption != null) {
            idx++
            const comVM = new Component(comOption);
            node.replaceWith(comVM.$el);

        }
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