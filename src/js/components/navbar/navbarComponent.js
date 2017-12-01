app.component("shNavbar", {
    bindings: {},
    templateUrl: "navbar/navbar.html",
    controller: function ($translate, $state, Configuration) {
        var vm = this;
        
        vm.lang = $state.params.lang;
        vm.scrollTo = scrollTo;
        vm.goTo = goTo;
        vm.changeLanguage = changeLanguage;

        Configuration.get('subNav').then(function (result) {
            vm.length = [].constructor(result);
        });
        
        function changeLanguage(lang) {
            $translate.use(lang);
            vm.lang = lang;
            $state.go(".", { lang: lang });
        }

        function scrollTo(elem) {
            $("html,body").animate({ scrollTop: $(elem).offset().top });
        }

        function goTo(id) {
            $translate('sub-nav-id-' + id).then(function (url) {
                $state.go('app.article', { number: url });
            });
        }
    }
});


