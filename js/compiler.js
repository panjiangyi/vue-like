import Watcher from './watcher';
import Component from './Component';
import { getGlobalComponents } from './wue';
let idx = 0; //临时禁止过多嵌套
export default class Compiler {
    constructor(fragement, vm) {
        this.fragement = fragement;
        this.vm = vm;
        this.compile(this.fragement.childNodes)
    }
    getCompiledFragement() {
        return this.fragement;
    }
    isDetective(name) {
        return name.includes('v-');
    }
    isCustomComponent(node) {
        return getGlobalComponents()[node.nodeName.toLowerCase()];
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
    compileAttributes(node) {
        const attrlist = node.attributes;
        if (attrlist == null) return;
        [...attrlist].forEach(({ name, value }) => {
            if (!this.isDetective(name)) return;
            const commander = name.replace('v-', '')
            new Watcher(node, value, this.vm, () => {
                utils[commander](node, this.getValueByExp(value))
            });
            utils[commander](node, this.getValueByExp(value));
            this.nodeInteractive(node, value)
        })
    }
    compileComponentAttributes(node, childNodes) {
        const attrlist = node.attributes;
        if (attrlist == null) return;
        // ignore text nodex before and after the root node of components;
        const targetNode = childNodes[1];
        [...attrlist].forEach(({ name, value }) => {
            targetNode.setAttribute(name, value);
        })
        this.compileAttributes(targetNode)
    }
    compileComponent(node) {
        const nodeName = node.nodeName.toLowerCase();
        const comOption = getGlobalComponents()[nodeName];
        if (idx < 10 && comOption != null) {
            idx++

            // create sub-component, invoke lifecircle methods, push sub-component to father's children array.
            comOption.beforeCreated && comOption.beforeCreated();
            const comVm = new Component(comOption);

            // add new component to father's children array;
            this.vm.addChild(comVm);
            
            comVm.created();
            const comVMNodes = comVm.render();
            comVm.beforeMounted();
            const increasedLen = comVMNodes.childNodes.length;
            this.compileComponentAttributes(node, comVMNodes.childNodes)
            node.replaceWith(comVMNodes);
            comVm.mounted();
            return increasedLen
        }
    }
    compileNode(node) {
        if (node.getAttribute('v') != null) return;
        node.setAttribute('v', '');
        this.compileAttributes(node)
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
        // forEach to loop children cause some node been skipped. loop by for to maniplate the i and len to solve this bug.
        for (let i = 0, len = children.length; i < len; i++) {
            const node = children[i];
            if (this.isCustomComponent(node)) {
                const increasedLen = this.compileComponent(node) - 1;
                i += increasedLen;
                len += increasedLen;
            } else if (this.isElementNode(node)) {
                this.compileNode(node)
            } else {
                this.compileText(node)
            }
        }
    }
}

const utils = {
    model(node, value) {
        node.value = value;
    },
    show(node, bl) {
        if (bl) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    },
    if(node, bl) {
        return bl;
    }
}