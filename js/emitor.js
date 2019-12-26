export default class emitor {
    constructor() {
        this.pool = {

        }
    }
    initPool(event) {
        if (this.pool[event] == null) {
            this.pool[event] = [];
        }
        return this.pool[event];
    }
    $on(event, callback) {
        const pool = this.initPool(event);
        pool.push(callback);
    }

    $off(event, callback) {
        // remove all listener
        if (event == null && callback == null) return this.pool = {};
        // invalid event
        if (this.pool[event] == null) return;
        // remove all listener on specific event;
        if (callback == null) {
            this.pool[event] = [];
            return
        }
        this.pool[event] = this.pool[event].filter(cb => cb !== callback);
    }

    $once(event, callback) {
        const pool = this.initPool(event);
        const packageFn = (...args) => {
            callback(...args);
            this.$off(event, packageFn);
        }
        pool.push(packageFn)
    }

    $emit(event, ...args) {
        if (this.pool[event] == null) return;
        this.pool[event].forEach(cb => cb(...args));
    }
}