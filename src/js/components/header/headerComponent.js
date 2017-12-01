app.component("shHeader", {
    bindings: {},
    templateUrl: "header/header.html",
    controller: function (Configuration, $timeout) {
        var vm = this;

        Configuration.get('imageHeader').then(function (result) {
            vm.length = [].constructor(result);
            
            // Ugly way to be sure the flexSlider gets initialized.
            $timeout(function () {
                $(".flexslider").flexslider();
            }, 0);
        });
    }
});
