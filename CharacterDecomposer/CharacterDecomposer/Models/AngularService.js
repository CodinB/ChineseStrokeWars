(function () {
    'use strict'
    angular.module("Decomp")
        .service('DecompService', DecompService);

    DecompService.$inject = ['$http']
    function DecompService($http) {

        var url = "/api/decomposer";
        var svc = this;

        svc.GetCharacterBreakdown = _GetCharacterBreakdown;

        function _GetCharacterBreakdown(character) {

            var settings = {
                url: url + "/" + character,
                method: "GET",
                cache: false,
                withCredentials: true
            }
            return $http(settings)
        }

    }
})();