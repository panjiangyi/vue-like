import Component from './Component';
import emitor from './emitor';
import { RE_RENDER } from './constants';
const globalComponents = {};
export default class wue extends emitor {
    constructor(option) {
        super();
        
        const $root = this.$root = new Component(option);

        //specify root component's father as wue
        $root.$parent = this;

        // linstener on re-render;
        this.$on(RE_RENDER, this.render)

        const dom = $root.render();
        this.$rootNode = document.querySelector(option.el)
        this.$rootNode.append(dom);
    }
    render() {
        console.log('re-render', this)
    }
    static component(name, option) {
        globalComponents[name] = option;
    }
}
export const getGlobalComponents = () => globalComponents;
// code for debug
window.globalComponents = getGlobalComponents;