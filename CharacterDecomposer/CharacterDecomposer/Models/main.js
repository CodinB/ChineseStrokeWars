(function () {
    angular.module(Decomp)
        .component('Decomp', {
            templateUrl: '../App_Start/main.html',
            controller: 'DecomposerController'

        });
})();

(function () {
    'use strict';

    angular.module('Decomp')
        .controller('DecomposerController', DecomposerController);

    DecomposerController.$inject = ['$http', 'DecomposeService'];

    function DecomposerController($http, DecompService) {

        var vm = this;
        vm.submit = _GetCharacterBreakdown;
        vm.character = "";

        function _GetCharacterBreakdown() {
            DecompService
                .GetCharacterBreakdown(vm.character)

        }

        $http({
            url: 'api/decomposer',
            method: "GET"
        })
            .then(_success, _error);

        function _success(response) {
            vm.characterData = response.data;
        }

        function _error(err) {
            console.log(err)
        }
    }
})();