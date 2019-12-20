import Component from './Component';
const globalComponents = {};
export default class Vue {
    constructor(option) {
        document.querySelector(option.el).append(new Component(option).compile());
    }
    static component(name, option) {
        globalComponents[name] = option;
    }
}
export const getGlobalComponents = () => globalComponents;
// code for debug
window.globalComponents = getGlobalComponents;