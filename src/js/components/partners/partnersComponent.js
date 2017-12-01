app.component('shPartners', {
    bindings: {},
    templateUrl: 'partners/partners.html',
    controller: function (Configuration) {
        var vm = this;

        Configuration.get('partners').then(function (result) {
            vm.length = [].constructor(result);
        });
    }
});