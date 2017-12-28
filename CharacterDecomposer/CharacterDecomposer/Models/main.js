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
        vm.decompose = _GetCharacterBreakdownTwo;
        vm.character = "";
        vm.characterData = "";
        vm.componentPinyin = "";
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
        vm.competitionPinyin = "";
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
            DictionaryService.DictionaryLookUp(vm.randomWord)
                .then(returnPinyin, returnError);
        }

        function returnError(response) {
            vm.competitionPinyin = response.data.ExceptionMessage;
        }

        function returnPinyin(response) {
            vm.competitionPinyin = response.data.Romanization + ": " + response.data.Definitions;
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

        function randomWordFailure(response) {
            console.log(response.data)
        }

        function _nextMatch() {
            console.log("Next Match is working")
            $("#competitionCharacter").hide();
            HSKScraperService.GetRandomWord(vm.hskLevel)
                .then(randomWordSuccess, randomWordFailure)
        }

        function _show() {
            console.log("Show is Working")
            $("#competitionCharacter").show();
        }

        function fadeOutAfter() {
            console.log("Fading out soon");
            $("#competitionCharacter").fadeOut(1000);
        }

        function _peek() {
            console.log("Fading In");
            $("#competitionCharacter").fadeIn(2000, fadeOutAfter)

        }

        function _feedAction() {
            console.log("Working")
        }

        function _score() {
            if ($("#component")) {
                console.log($("#component").text())
                var component = $("#component").text();
                DictionaryService.DictionaryLookUp(component)
                    .then(returnComponentPinyin, returnErrorPinyin);
            }
            
        }

        function returnComponentPinyin(response) {
            $("#componentPinyin").text(response.data.Romanization)
        }

        function returnErrorPinyin(response) {
            vm.isLoading = null;
            $("#componentPinyin").text(response.data.ExceptionMessage);
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
            //vm.componentPinyin = response.data.Component;
        }



        function returnErrorMessage(response) {
            vm.isLoading = null;
            vm.ceditDefinition = response.data.ExceptionMessage;
        }

        function _GetCharacterBreakdownTwo() {
            var character = $("#competitionCharacter").text();
            DecompService
                .GetCharacterBreakdown(character)
                .then(returnDataTwo);

        }

        function returnDataTwo(response) {
            vm.isLoading = null;
            console.log("reached the promise land");
            console.log(response);
            vm.characterData = response.data;
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