(function(angular){
	'use strict';

	angular.module('moviceCat.movice_list', ['ngRoute','moviceCat.services.http'])

		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:categroy/:page', {
				templateUrl: 'movice_list/view.html',
				controller: 'moviceListController'
			});
		}])

		.controller('moviceListController', [
			'$scope','$route','$routeParams','HttpService','appConfig',
			function($scope,$route,$routeParams,HttpService,appConfig) {
			var count = appConfig.pegeSize;
			var page = parseInt($routeParams.page);
			var start = (page - 1) * count;
			$scope.subjects = [];
			$scope.title = 'Loading.....';
			$scope.message = '';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.crruentPage = page;
			$scope.loading = true;
			HttpService.josnp(appConfig.listApiAddress + $routeParams.categroy,
				{start:start,count:count,q:$routeParams.q},
				function(data){
				$scope.subjects = data.subjects;
				$scope.totalCount = data.total;
				$scope.title = data.title;
				$scope.totalPages = Math.ceil($scope.totalCount/count);
				$scope.loading = false;
				$scope.$apply();

			});

			$scope.go = function(page){
				if(page >= 1 && page <= $scope.totalPages){
					$route.updateParams({ page : page });
				}
			};
			//$http.get("/app/data.josn").then(function(res){
			//	if(res.status == 200){
			//		$scope.subjects = res.data.subjects;
			//		console.log( res);
			//	}
			//	else {
			//		$scope.message = "获取数据错误，错误代码："+res.statusText;
			//	}
			//},function(err){
			//	$scope.message = "获取数据错误，错误代码："+err.statusText;
			//});
		}]);

})(angular);
