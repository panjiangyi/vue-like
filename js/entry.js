import Vue from "./vue-like"
Vue.component('colorful-div', {
    template: `
        <div>
            {{color}}
            <input v-model="color" />
            <colorful-div />
        </div>
    `,
    data() {
        return {
            color: 'red'
        }
    }
})
let vm = new Vue({
    el: '#app',
    template: `
    <input id="input1" type="text" v-model="message.a">
    <input id="input2" v-model="e" />
    {{message.a}} {{b}} {{c}} {{d}} {{e}}
    <div id='div1'>
        {{message.a}}
    </div>
    <colorful-div />
    `,
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