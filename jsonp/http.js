/**
 * Created by Silence-JK on 2017/3/26.
 * @Author: Silence_JK
 * @desc: 实现跨域组件
 */
(function(window,document,undefined){
	'use strict';
	var jsonp= function (url,data,callback) {
		//1、挂载回掉函数(Suffix 后缀)
		//random()取到0~1间的小数，将小数点去掉
		var fnSuffix=Math.random().toString().replace('.','');
		/*函数名*/
		var cbFuncName='my_json_cb_'+fnSuffix;
		window[cbFuncName]=callback;//相当于window.my_json_cb_03238472=callback;
		//2、将data转换为url字符串形式({id:1,name:'zhangsan'} => id=1&name=zhangsan)
		//判断url中是否已存在?，若有则上&
		var queryString=url.indexOf('?')==-1?'?':'&';
		for(var key in data){
			queryString+=key+'='+data[key]+'&';
		}
		//3、处理url中的回调函数
		queryString+='callback='+cbFuncName;
		//4、创建一个script标签
		var scriptElement=document.createElement('script');
		scriptElement.src=url+queryString;
		//5、将script标签放入页面
		document.body.appendChild(scriptElement);
	}
	window.$jsonp=jsonp;
})(window,document);
