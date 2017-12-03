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

        introJs().start();

        var vm = this;
        vm.submit = _GetCharacterBreakdown;
        vm.character = "";
        vm.characterData = "";
        vm.isLoading = null;

        vm.speak = _synthesis;
        vm.refresh = cancel;

        function cancel() {
            speechSynthesis.cancel();
        }

        function _synthesis() {

            

            console.log("speechsynthesis from controller button is working");
            var u = new SpeechSynthesisUtterance();
            u.lang = 'zh-CN';
            u.rate = 1.1;

            u.text = document.getElementById('textarea').value;

            speechSynthesis.speak(u);
        }

        function _GetCharacterBreakdown() {
            vm.isLoading = true;
            console.log("Submit button works");
            DecompService
                .GetCharacterBreakdown(vm.character)
                .then(returnData);
        }

        function returnData(response) {
            vm.isLoading = null;
            console.log("reached the promise land");
            console.log(response);
            vm.characterData = response.data;
        }

    }


       
})();