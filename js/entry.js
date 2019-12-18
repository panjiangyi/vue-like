import Vue from "./vue-like"
// global component
Vue.component('colorful-box', {
    template: `
    <div>
        <div>this is a {{color}} box {{e}}</div>
        <input v-model="color" />
    </div>
    `,
    data: function () {
        return { color: 'red', e: 1 }
    }
})
let vm = new Vue({
    el: '#app',
    data: {
        message: { a: 'j1111w' },
        b: 'holy shit',
        c: "cc111cc",
        d: 'ddd11d',
        e: "eeee"
    }
})
window.vm = vm;
window.Vue = Vue;