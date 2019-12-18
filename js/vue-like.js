import Component from './Component';
const globalComponents = {};
export default class Vue {
    constructor(option) {
        new Component(option);
    }
    static component(name, option) {
        globalComponents[name] = option;
    }
}
export const getGlobalComponents = () => globalComponents;
// code for debug
window.globalComponents = getGlobalComponents;