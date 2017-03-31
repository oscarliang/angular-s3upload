 angular.module('oscarUI').controller('MobileController', function mobileController($scope) {
 	$scope.dashboardshow=true;
 	$scope.dashboardShow = function() {
 		$scope.dashboardshow=!$scope.dashboardshow;
 		$scope.manageshow=false;
 	};
 	$scope.manageboardshow = function() {
 		$scope.manageshow=!$scope.manageshow;
 		$scope.dashboardshow=false;
 	};
 });