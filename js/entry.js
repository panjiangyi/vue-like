import MVVM from "./vue-like.js"
// 我们的数据一般都挂载在vm上
let vm = new MVVM({
    el: '#app',
    data: {
        message: { a: 'j1111w' },
        b: 'holy shit',
        c: "cc111cc",
        d: 'ddd11d'
    }
})