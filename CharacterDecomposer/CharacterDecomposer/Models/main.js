(function () {
    angular.module("Decomp")
        .component('decomp', {
            templateUrl: '../app_start/main.html',
            controller: 'DecomposerController'

        });
})();

(function () {
    'use strict';

    angular.module("Decomp")
        .controller('DecomposerController', DecomposerController);

    DecomposerController.$inject = ['$http', 'DecomposeService'];

    function DecomposerController($http, DecompService) {

        var vm = this;
        vm.submit = _GetCharacterBreakdown;
        vm.character = "";
        vm.characterData = null;

        function _GetCharacterBreakdown() {
            DecompService
                .GetCharacterBreakdown(vm.character)
                .then(returnData);
        }

        function returnData(response) {
            vm.characterData = response.data;
            }
        }

        //$http({
        //    url: 'api/decomposer',
        //    method: "GET"
        //})
        //    .then(_success, _error);

        //function _success(response) {
        //    vm.characterData = response.data;
        //}

        //function _error(err) {
        //    console.log(err)
        //}
    }
})();