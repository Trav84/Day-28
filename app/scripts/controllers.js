angular.module('app.controllers', []).controller('submitController', function($scope, $interval, $http) {
	'use strict';

	$scope.myImageUrl = '';
	$scope.myImageCaption = '';
	$scope.menuHidden = false;
	$scope.images = [];
	getRequest();

	function getRequest() {
		console.log("getRequest ran");

		$http.get('http://tiny-pizza-server.herokuapp.com/collections/travis-angular')
		.success(function(response) {

			$scope.images = [];

			for(var i=0; i<response.length; i++) {
				if(response[i].imageURL) {
					$scope.images.push(response[i]);
				}
			}
			console.log(response);
		})
		.error(function(err) {
			console.log(err);
		});

		$scope.expandMenuClick = function() {
			$scope.menuHidden = !$scope.menuHidden;
		};
	}

	$interval(getRequest, 5000);

	$scope.cancelClick = function() {

		$scope.myImageUrl = '';
		$scope.myImageCaption = '';
	};

	$scope.submitClick = function(myImageUrl, myImageCaption) {

		$http.post(
			'http://tiny-pizza-server.herokuapp.com/collections/travis-angular',
			{
				imageURL: myImageUrl,
				imageCaption: myImageCaption
			}
		);

		$scope.myImageUrl = '';
		$scope.myImageCaption = '';
	};
});