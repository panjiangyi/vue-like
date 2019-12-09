class MVVM {
    constructor(option) {
        this.$el = document.querySelector(option.el);
        this.$data = option.data
        this.init()
    }
    init() {
        new Compiler(this.$el, this);
        new Observer(this);
    }
}