import Vue from "./vue-like"
// global component
Vue.component('colorful-box', {
    template:`
        <div>this is a {{color}} box</div>
        <input v-model="color" />
    `,
    data: {
        color: 'red'
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