import Vue from "./vue-like"
Vue.component('colorful-div', {
    template: `
        <div>
            {{color}}
            <blue-div v-if="show"></blue-div>
            <input v-model="color" />
        </div>
    `,
    data() {
        return {
            color: 'red',
            show: false,
        }
    },
    mounted() {
        setInterval(() => {
            this.show = !this.show;
        }, 1500);
    }
})

Vue.component('blue-div', {
    template: `
        <div style="color:blue">
            {{color}}:{{idx}}
        </div>
    `,
    data() {
        return {
            color: 'blue',
            idx: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this.idx++;
        }, 500);
    },
})

let vm = new Vue({
    el: '#app',
    template: `
    <div>
        <input id="input1" type="text" v-model="message.a">
        <input id="input2" v-model="b" />
        {{message.a}} - {{b}}
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
    }
})
window.vm = vm;
window.Vue = Vue;