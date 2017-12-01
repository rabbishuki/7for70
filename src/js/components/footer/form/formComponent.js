app.component('shForm', {
    bindings: {},
    templateUrl: 'footer/form/form.html',
    controller: function ($http, ngNotify, $translate) {
        this.send = send;
        this.form = {};

        function send(form) {
            if (form && form.email && form.name && form.message) {
                $http.post('./contact.php',
                    "name=" + encodeURIComponent(form.name) +
                    "&message=" + encodeURIComponent(form.message) +
                    "&email=" + encodeURIComponent(form.email),
                    { headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
                ).then(function (result) {
                    if (result) {
                        ngNotify.set($translate.instant('mail-success'));
                    } else {
                        ngNotify.set($translate.instant('mail-error'));
                    }
                });
            } else {
                ngNotify.set($translate.instant('mail-missing'));
            }
        }
    },
});