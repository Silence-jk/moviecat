(function (angular) {
	'use strict';

	var module=angular.module('moviecat.coming_soon', ['ngRoute']);

		module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/coming_soon', {
				templateUrl: 'coming_soon/view.html',
				controller: 'ComingSoonController'
			});
		}])

		module.controller('ComingSoonController', ['$scope',function($scope) {

		}]);
})(angular)
