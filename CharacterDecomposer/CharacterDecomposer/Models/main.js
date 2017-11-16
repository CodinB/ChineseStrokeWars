(function () {
    angular.module("Decomp", [])
        .component('decomp', {
            templateUrl: '../app_start/main.html',
            controller: 'DecomposerController',
            controllerAs: 'vm'

        });
})();

(function () {
    'use strict';

    angular.module("Decomp")
        .controller('DecomposerController', DecomposerController);

    DecomposerController.$inject = ['$http', 'DecompService'];

    function DecomposerController($http, DecompService) {

        var vm = this;
        vm.submit = _GetCharacterBreakdown;
        vm.character = "";
        vm.characterData = "";

        function _GetCharacterBreakdown() {
            console.log("Submit button works");
            DecompService
                .GetCharacterBreakdown(vm.character)
                .then(returnData);
        }

        function returnData(response) {
            console.log("reached the promise land");
            console.log(response);
            vm.characterData = response.data;
        }

    }


       
})();