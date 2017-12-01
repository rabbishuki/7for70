// Module for gulp-angular-templatecache
angular.module('templates', []);

var app = angular.module('app', [
    'ui.router',
    'ngNotify',
    'pascalprecht.translate',
    'templates',
]);

app.run(function ($rootScope, ngNotify) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        console.error(error);
    });

    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 3000,
        type: 'warn',
        sticky: false,
        button: true,
        html: false
    });
});

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useLoader('translateGoogleSheetsLoader', {});
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy();
}]);