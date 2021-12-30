angular.module('app').service("googleSheetsService", function ($http) {
    var url;
    var service = this;

    service.setUrl = function (path) {
        if (path) {
            url = "https://sheets.googleapis.com/v4/spreadsheets/" + path + "/values/Sheet1?alt=json&key=AIzaSyDVh0t10vWXoctuhUO00oixlwGXATPNZEM";
        }
    };
    
    service.refresh = function () {
        service.hasData = false;
        service.translations = { 'en': {}, 'he': {}, 'sp': {} };
        
        $http.get(url).then(function (response) {
            if (response && response.data && response.data.feed && response.data.feed.entry.length) {
                parse(response.data.feed.entry);
                service.hasData = true;
            }
        });
    };

    service.setUrl("1e29CirEQoQ4nfEHAkKfePMqK4s36TVCS-gPH4psidtw");
    service.refresh();

    function parse(entries) {
        for (var entry in entries) {
            var key = entries[entry].gsx$key.$t;
            var en =  entries[entry].gsx$en.$t;
            var he =  entries[entry].gsx$he.$t;
            var sp =  entries[entry].gsx$sp.$t;

            if(key && en) service.translations.en[key] = en;
            if(key && he) service.translations.he[key] = he;
            if(key && sp) service.translations.sp[key] = sp;
        }    
    }
});
