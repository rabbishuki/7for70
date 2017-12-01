app.factory('Configuration', function ($http, $q, $timeout) {
    var config = {
        q: 'config.json',
        data: null
    };

    function loadData() {
        return $http.get(config.q).then(function (result) {
            config.data = result.data;
        });
    }

    function getData(name) {
        return $q.when(config.data || loadData()).then(function (result) {
            return config.data[name];
        });
    }

    return {
        load: loadData,
        get: getData
    };
});