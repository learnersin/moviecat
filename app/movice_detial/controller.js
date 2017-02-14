/**
 * Created by Administrator on 2017/1/25 0025.
 */
(function(angular){
	'use strict';

	angular.module('moviceCat.movice_detial', ['ngRoute','moviceCat.services.http'])

		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/detial/:id', {
				templateUrl: 'movice_detial/view.html',
				controller: 'moviceDetailController'
			});
		}])

		.controller('moviceDetailController', [
			'$scope',
			'$route',
			'$routeParams',
			'HttpService',
			'appConfig',
			function($scope,$route,$routeParams,HttpService,appConfig) {

			$scope.movie = {};
			$scope.loading = true;
			var id = $routeParams.id;
			HttpService.josnp(appConfig.detialApiAddress + id,{},function(data){
				$scope.movie = data;
				$scope.loading = false;
				$scope.$apply();
			})
		}]);

})(angular);
