(function (angular) {
	'use strict';

// Declare app level module which depends on views, and components
	var module = angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie_list'
	]);
	module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		//这句解决新版ng的路由加上#!?
		$locationProvider.hashPrefix('');
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);
	/*监视侧边栏的变化
	 思路：
	 1、用$location获取url变换的路由
	 2、通过$watch监视产生相应的改变
	 3、由于$watch只能监视$scope对象,所以将$location附给$scope
	 */
	module.controller('NavController', ['$scope', '$location',
		function ($scope, $location) {
			$scope.$location = $location;
			var path = $scope.$location.path();
			console.log(path);
			$scope.$watch('$location.path()', function (now) {
				if (now.startsWith('/in_theaters')) {
					$scope.type = 'in_theaters';
				} else if (now.startsWith('/coming_soon')) {
					$scope.type = 'coming_soon';
				} else if (now.startsWith('/top250')) {
					$scope.type = 'top250';
				}
			})
		}]);
})(angular)
