class MVVM {
    constructor(option) {
        this.$el = document.querySelector(option.el);
        this.$data = option.data
        this.init()
    }
    init() {
        new Observer(this);
        new Compiler(this.$el, this);
    }
}