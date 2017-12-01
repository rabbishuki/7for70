app.component('shFb', {
    bindings: {},
    templateUrl: 'about/fb/fb.html',
    controller: function () {
        this.select = function (elem) {
            if (this.selected == elem) {
                this.selected = 0;
            } else {
                this.selected = elem;
            }
        }.bind(this);
    },
});