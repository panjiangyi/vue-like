import Vue from "./vue-like"
Vue.component('colorful-div', {
    template: `
        <div>
            {{color}}
            <blue-div></blue-div>
            <input v-model="color" />
        </div>
    `,
    data() {
        return {
            color: 'red'
        }
    }
})

Vue.component('blue-div', {
    template: `
        <div style="color:blue">
            {{color}}
        </div>
    `,
    data() {
        return {
            color: 'blue'
        }
    }
})

let vm = new Vue({
    el: '#app',
    template: `
    <div>
        <input id="input1" type="text" v-model="message.a">
        <input id="input2" v-model="e" />
        {{message.a}} {{b}} {{c}} {{d}} {{e}}
        <div id='div1'>
            {{message.a}}
        </div>
        <colorful-div> </colorful-div>
        <blue-div></blue-div>
    </div>
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