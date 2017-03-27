(function (angular) {
	'use strict';

// Declare app level module which depends on views, and components
	var module=angular.module('moviecat', [
		'ngRoute',
		'moviecat.in_theater',
		'moviecat.coming_soon',
		'moviecat.top250'
	]);
		module.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
			$locationProvider.hashPrefix('');
			$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
		}]);

})(angular)
