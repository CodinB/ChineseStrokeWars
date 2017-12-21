(function () {
    'use strict'
    angular.module("Decomp")
        .service('HSKScraperService', HSKScraperService);

    HSKScraperService.$inject = ['$http']
    function HSKScraperService($http) {
        var url = "/api/random";
        var svc = this;

        svc.GetRandomWord = _GetRandomWord;

        function _GetRandomWord(hskLevel) {
            //debugger;
            var settings = {
                url: url + "?hskLevel=" + encodeURIComponent(JSON.stringify(hskLevel)),
                method: "GET",
                cache: false,
                withCredentials: true
            }
            return $http(settings)
        }
    }
})();

