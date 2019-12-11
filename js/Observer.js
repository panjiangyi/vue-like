import Dep from './Dep';
export default class Observer {
    constructor(vm) {
        this.transform(vm.$data);
    }
    transform(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(k => {
            let value = data[k]
            if (typeof value === 'object') {
                this.transform(value)
            }
            const dep = new Dep();
            Object.defineProperty(data, k, {
                enumerable: true,
                configurable: true,
                get() {
                    Dep.target && dep.add(Dep.target)
                    return value
                },
                set(v) {
                    if (v === value) return;
                    if (typeof v === 'object') {
                        this.transform(v)
                    }
                    value = v;
                    dep.publish();
                    return value;
                }
            })
        })
    }
}