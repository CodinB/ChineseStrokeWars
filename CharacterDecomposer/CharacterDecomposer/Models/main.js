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

    DecomposerController.$inject = ['$http', 'DecompService', 'DictionaryService', 'HSKScraperService'];

    function DecomposerController($http, DecompService, DictionaryService, HSKScraperService) {


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
        vm.playerStatus = {
            isActive: false
        };
        vm.ceditDefinition;
        vm.dictionary = _dictionary;
        vm.ceditEntry = "";

        vm.hskLevel = [];
        vm.randomWord = null;
        vm.peek = _peek;
        vm.nextMatch = _nextMatch;
        vm.feedAction = _feedAction;
        vm.score = _score;
        vm.selectLevel = _selectLevel;
        vm.nothingChecked = null;
        vm.show = _show;

        function _selectLevel(hsk) {
            if (vm.hskLevel.indexOf(hsk) <= -1) {
                vm.hskLevel.push(hsk)

            } else {
                for (var i = vm.hskLevel.length - 1; i >= 0; i--) {
                    if (vm.hskLevel[i] === hsk) {
                        vm.hskLevel.splice(i, 1);
                    }
                }
            }

            if (vm.hskLevel.length > 0) {
                HSKScraperService.GetRandomWord(vm.hskLevel)
                        .then(randomWordSuccess, randomWordFailure)
            }
        }

        function randomWordSuccess(response) {
            console.log("Here is Random Word");
            vm.randomWord = response.data.Word;
        }

        function randomWordFailure(response) {
            console.log(response.data)
        }

        function _nextMatch() {
            console.log("Next Match is working")
            HSKScraperService.GetRandomWord(vm.hskLevel)
                .then(randomWordSuccess, randomWordFailure)
        }

        function _peek() {
            console.log("Working")
        }

        function _show() {

        }

        function _feedAction() {
            console.log("Working")
        }

        function _score() {
            console.log("Working")
        }

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

        function _dictionary() {
            console.log("Dictionary is firing up")
            vm.isLoading = true;
            DictionaryService.DictionaryLookUp(vm.ceditEntry)
                .then(returnDefinition, returnErrorMessage);
        }

        function returnDefinition(response) {
            vm.isLoading = null;
            vm.ceditDefinition = response.data.Romanization + ": " + response.data.Definitions;
        }

        function returnErrorMessage(response) {
            vm.isLoading = null;
            vm.ceditDefinition = response.data.ExceptionMessage;
        }

        var recognition;

        function _speechToText() {

            if (vm.playerStatus.isActive) {
                vm.playerStatus.isActive = false;
                console.log("Turning off microphone");
                recognition.continuous = false;
                recognition.stop();
                return;
            }

            recognition = new webkitSpeechRecognition();
            console.log("Speech to text has started")

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
            vm.playerStatus.isActive = true;

        }

    }

})();