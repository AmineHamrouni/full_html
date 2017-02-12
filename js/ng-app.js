(function (angular) {
    'use strict';
    angular.module('app-inquiry', [])
        .controller('ExampleController', ['$scope', function ($scope) {
            $scope.data = {
                singleSelect: null,
                multipleSelect: [],
                option1: 'option-1'
            };

 }]);
})(window.angular);