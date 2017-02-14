/**
 * Created by Administrator on 2017/1/17 0017.
 */
(function(angular){
	var http = angular.module('moviceCat.services.http',[]);
	http.service('HttpService',['$window','$document',function($window,$document){
		this.josnp = function(url,data,callback){
			var fnsuffix = Math.random().toString().replace('.','');
			var cbFuncName = 'my_josn_cb'+ fnsuffix;
			$window[cbFuncName] = callback;
			var querysting = url.indexOf('?') == -1 ? "?":'&';
			for(var key in data){
				querysting += key + '=' + data[key] + '&';
			}

			querysting += 'callback='+ cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querysting;
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);
