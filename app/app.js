'use strict';

// Declare app level module which depends on views, and components
angular.module('moviceCat', [
  'ngRoute',
	'moviceCat.movice_detial',
  'moviceCat.movice_list',

])
	.constant('appConfig',{
	   pegeSize : 10,
		listApiAddress : 'https://api.douban.com/v2/movie/',
		detialApiAddress : 'https://api.douban.com/v2/movie/subject/'
   })
	.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	  }])
	.controller('navController',['$scope','$location',function($scope,$location){
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now){
			if(now.startsWith('/in_theaters')){
				$scope.type = 'in_theaters';
			}else if(now.startsWith('/coming_soon')){
				$scope.type = 'coming_soon';
			}else if(now.startsWith('/top250')){
				$scope.type = 'top250';
			}else if(now.startsWith('/search')){
				$scope.type = '';
			}
		})
}])
.controller('searchController',['$scope','$route',function($scope,$route){
	$scope.input = '';
	$scope.search = function(){
		$route.updateParams({categroy:'search',q:$scope.input});
	}
}]);
