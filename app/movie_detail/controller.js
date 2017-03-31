(function (angular) {
	'use strict';
	var module = angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])

	module.config(['$routeProvider', function ($routeProvider) {
		console.log('111');
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movie_detail/view.html',
			controller: 'MovieDetailController'
		});
	}])

	module.controller('MovieDetailController', ['$scope', '$route', '$routeParams', 'HttpService','AppConfig',
		function ($scope, $route, $routeParams, HttpService,AppConfig) {
			$scope.loading=true;
			$scope.movie={};

			HttpService.jsonp(AppConfig.detailApiAddress+$routeParams.id,{},
				function (data) {
					console.log(data);
					$scope.movie=data;
					$scope.loading=false;
					$scope.$apply();
			});

		}]);
})(angular)

