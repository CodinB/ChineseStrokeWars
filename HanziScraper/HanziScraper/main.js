(function () {
    angular.module(Decomp)
        .component('Decomp', {
            templateUrl: '/main.html',
            controller: 'Decomposer',

        });
})();

(function () {
    'use strict';

    angular.module('Decomp')
        .controller('Decomposer', Decomposer);

    PeopleController.$inject = ['$http', 'DecomposeService'];

    function PeopleController($http, DecompService) {

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