angular.module('app').factory("translateGoogleSheetsLoader", function ($http, $q) {
    var url;
 
    function setUrl(path) {
        if (path) {
            url =
                "https://spreadsheets.google.com/feeds/list/" +
                path +
                "/od6/public/values?alt=json";
        }
    }

    setUrl("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw");

    function parse(entries, lang) {
        if (entries[0]['gsx$' + lang]) {
            var translations = {};
            
            for (var entry in entries) {
                var key = entries[entry].gsx$key.$t;
                var value = entries[entry]['gsx$' + lang].$t;
            
                if(key && value) (translations[key] = value);
            }

            return translations;
        } else {
            console.error('Language not available in Google Sheets.');
        }
    }

    return function (options) {
        var deferred = $q.defer();

        $http.get(url).then(function (response) {
            if (response &&
                response.data &&
                response.data.feed &&
                response.data.feed.entry.length) {
                
                deferred.resolve(parse(response.data.feed.entry, options.key));
            }
        });

        return deferred.promise;
    };
});
