app.component('shApp', {
    bindings: {},
    templateUrl: 'app/app.html',
    controller: function($translate, $state) {
        $translate.use($state.params.lang);
    }
});