angular.module('app').factory("translateGoogleSheetsLoader", function ($http, $q) {
    var url;
 
    function setUrl(path) {
        if (path) {
            url =
                "https://sheets.googleapis.com/v4/spreadsheets/" +
                path +
                "/values/Sheet1?alt=json&key=AIzaSyDVh0t10vWXoctuhUO00oixlwGXATPNZEM";
        }
    }

    setUrl("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw");

    function parse(entries, lang) {
        if (!entries || !lang) {
            console.error('Problem loading translations');
        }

        var langIndex = entries[0].findIndex(function (i) {
            return i === lang;
        });
        if (!langIndex) {
            console.error('Problem identifying language', lang);
        }

        var translations = {};
        for (var lineIndex in entries) {
            if (entries[lineIndex]) {
                var row = entries[lineIndex][0];
                var value = entries[lineIndex][langIndex];

                if (row && value) {
                    translations[row] = value;
                }
            }
        }

        return translations;
    }

    return function (options) {
        var deferred = $q.defer();

        $http.get(url).then(function (response) {
            if (response &&
                response.data &&
                response.data.values) {
                
                deferred.resolve(parse(response.data.values, options.key));
            }
        });

        return deferred.promise;
    };
});
