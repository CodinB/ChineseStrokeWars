(function () {
    'use strict'
    angular.module("Decomp")
        .service('DictionaryService', DictionaryService);

    DictionaryService.$inject = ['$http']
    function DictionaryService($http) {
        var url = "/api/dictionary";
        var svc = this;

        svc.DictionaryLookUp = _DictionaryLookUp;

        function _DictionaryLookUp(entry) {

            var settings = {
                url: url + "?entry=" + encodeURIComponent(entry),
                method: "GET",
                cache: false,
                withCredentials: true
            }
            return $http(settings)
        }
    }
})();

