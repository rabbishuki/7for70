app.component('shArticle', {
    bindings: {},
    templateUrl: 'article/article.html',
    controller: function ($stateParams, $scope, $filter) {
        $scope.n = $stateParams.number;
        
        var t = 'image-' + $scope.n;

        $scope.$watch(function() { 
                return $filter('translate')(t); 
            }, function(newval) { 
                this.showImage = t !== newval;
            }
        );
    },
});