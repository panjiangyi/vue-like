import Dep from './Dep';
export default class Observer {
    constructor(vm) {
        this.transform(vm.$data, vm);
    }
    transform(data, vm) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(k => {
            let value = data[k]
            if (typeof value === 'object') {
                this.transform(value, vm)
            }
            const dep = new Dep();
            Object.defineProperty(data, k, {
                enumerable: true,
                configurable: true,
                get() {
                    Dep.target && dep.add(Dep.target)
                    return value
                },
                set(newValue) {
                    const oldValue = value;
                    vm.beforeUpdate.call(vm, oldValue, newValue)
                    if (newValue === value) return;
                    if (typeof newValue === 'object') {
                        this.transform(newValue, vm)
                    }
                    value = newValue;
                    dep.publish();
                    vm.updated.call(vm, oldValue, newValue);
                    return value;
                }
            })
        })
    }
}