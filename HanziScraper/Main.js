(function () {
    angular.module(Decomp)
        .component('Decomp', {
            templateUrl: '/Main.html',
            controller: 'Decomposer',
           
        });
})();

(function () {
    'use strict';

    angular.module('People')
        .controller('PeopleController', PeopleController);

    PeopleController.$inject = ['$http'];

    function PeopleController($http) {

        var vm = this;

        $http({
            url: 'api/people/getall',
            method: "GET"
        })
            .then(_success, _error);

        function _success(response) {
            vm.people = response.data;
        }

        function _error(err) {
            console.log(err)
        }
    }
})();