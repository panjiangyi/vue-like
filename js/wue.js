import Component from './Component';
const globalComponents = {};
export default class wue {
    constructor(option) {
        document.querySelector(option.el).append(new Component(option).render());
    }
    static component(name, option) {
        globalComponents[name] = option;
    }
}
export const getGlobalComponents = () => globalComponents;
// code for debug
window.globalComponents = getGlobalComponents;