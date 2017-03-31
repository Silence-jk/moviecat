(function (angular) {
	'use strict';
	var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])

	module.config(['$routeProvider', function ($routeProvider) {
		console.log('222');
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}])

	module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService','AppConfig',
		function ($scope,$route,$routeParams,HttpService,AppConfig) {
		//分页处理
		var count=AppConfig.pageSize;//每页显示10条
		var page=parseInt($routeParams.page);
		var start=(page-1)*10;
		$scope.loading=true;
		$scope.films=[];
		$scope.message='';
		$scope.pageCount=0;
		$scope.currentPage=page;
		HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{
			start:start,
			count:count,
			// $routeParams 的数据来源：1.路由匹配出来的，2.?后的参数
			q:$routeParams.q
		}, function (data) {
			console.log(data);
			$scope.films=data.subjects;
			$scope.total=data.total;
			$scope.loading=false;
			$scope.pageCount=Math.ceil($scope.total/count);
			//apply()作用：让指定的表达式重新同步到界面上，解决ng绑定完界面后数据才传送过来，导致界面不显示
			$scope.$apply();
		});

		$scope.go= function (page) {
			if(page>=1&&page<=$scope.pageCount){
				//通过路由来实现上一页，下一页跳转
				$route.updateParams({page:page});
			}
		}

	}]);
})(angular)
/*		var doubanApiAddress='http://api.douban.com/v2/movie/coming_soon';
 /!*
 在ng中使用JSONP的方式做跨域请求,就必须给当前地址加上一个参数callback=JSON_CALLBACK
 *!/
 $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK')
 //$http.get('data/in_theater.json')
 .then(function (res) {
 console.log(res);
 if(res.status==200){
 $scope.films=res.data.subjects;
 }else{
 $scope.message='获取信息失败，错误信息'+err.statusText;
 }
 }, function (err) {
 console.log(err);
 $scope.message='获取信息失败，错误信息'+err.statusText;
 })*/
