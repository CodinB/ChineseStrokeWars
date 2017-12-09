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

        
        vm.tutorial = _intro;
        vm.submit = _GetCharacterBreakdown;
        vm.character = "";
        vm.characterData = "";
        vm.isLoading = null;
        vm.stopSpeech = _stopSpeech;
        vm.speak = _synthesis;
        vm.refresh = cancel;
        vm.speechToText = _speechToText;
        function _intro() {
            introJs().start()
        }

        function _stopSpeech() {
            console.log("Abort is working")
            webkitSpeechRecognition.abort();
        }

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

        function _speechToText() {
            console.log("Speech to text has started")
            var recognition = new webkitSpeechRecognition();
            recognition.addEventListener('result', e => {
                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        console.log(e.results[i][0].transcript);
                        $("#text").append(e.results[i][0].transcript);
                    }
                }
            });

            recognition.continuous = true;
            recognition.lang = 'zh-CN';
            recognition.start();
        }

    }
       
})();