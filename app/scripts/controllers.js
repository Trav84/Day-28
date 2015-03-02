angular.module('app.controllers', []).controller('submitController', function($scope, $interval, $http) {
	'use strict';

	$scope.myImageUrl = '';
	$scope.myImageCaption = '';
	$scope.menuHidden = false;
	$scope.images = [];
	$scope.urlCorrect = true;
	$scope.capCorrect = true;
	
	function getRequest() {

		$http.get('http://tiny-pizza-server.herokuapp.com/collections/travis-angular')
		.success(function(response) {

			$scope.images = [];

			for(var i=0; i<response.length; i++) {
				if(response[i].imageURL) {
					$scope.images.push(response[i]);
				}
			}
			console.log($scope.images);
		})
		.error(function(err) {
			console.log(err);
		});
	}
	getRequest();

	$interval(getRequest, 5000);

	$scope.expandMenuClick = function() {
		$scope.menuHidden = !$scope.menuHidden;
	};

	$scope.cancelClick = function() {
		$scope.myImageUrl = '';
		$scope.myImageCaption = '';
	};

	$scope.submitClick = function() {

		console.log($scope.myImageUrl);

		if($scope.myImageUrl === '' || angular.isUndefined($scope.myImageUrl)) {
			$scope.urlCorrect = false;
			console.log('URL is empty or undefined');
		} 
		else if($scope.myImageUrl.substring(0,7) !== 'http://') {
			$scope.urlCorrect = false;
			console.log('URL is not proper');
		} 

		if($scope.myImageCaption === '' || angular.isUndefined($scope.myImageCaption)) {
			$scope.capCorrect = false;
			console.log('Caption is empty or undefined');
		}

		if($scope.urlCorrect === true && $scope.capCorrect === true) {
			$http.post(
				'http://tiny-pizza-server.herokuapp.com/collections/travis-angular',
				{
					imageURL: $scope.myImageUrl,
					imageCaption: $scope.myImageCaption
				}
			);
				console.log('Posting...');
		}

		$scope.myImageUrl = '';
		$scope.myImageCaption = '';
	};
});