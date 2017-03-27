/**
 * Created by Silence-JK on 2017/3/26.
 */
(function (angular) {
	'use strict';
	// 由于默认angular提供的异步请求对象不支持自定义回调函数名
	// angular随机分配的回调函数名称不被豆瓣支持
	var http=angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document', function ($window,$document) {
		console.log($window);
		this.jsonp=function(url, data, callback) {
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;

			$window[cbFuncName] = callback;
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			}
			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$document[0].body.appendChild(scriptElement);
		};
	}])
})(angular)
