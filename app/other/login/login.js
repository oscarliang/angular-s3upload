angular.module('oscarUI').controller('LoginController', function loginController($rootScope, $scope, $state, userApi, Preload) {

    var device = $rootScope.device === 'mobile' ? 'mobile' : 'main';
    var redirect = device + '.dashboard.overview';
    $scope.username = "test@oscar.com";
    $scope.password = "1111";
    
    $scope.login = function () {
        var email = $scope.username;
        var pin = $scope.password;
        
        $scope.fetching = true;
        userApi.authenticateUser(email, pin).then(
                function (user) {
                    $scope.fetching = false;
                    Preload.fetch().then(//set up the buildinglist in the localstore
                            function () {
                                $scope.fetching = false;
                                $rootScope.ACCOUNT_LOGO = $rootScope.PROJECT_LOGO_POSITIVE;
                                $state.go(redirect);
                            });

                }, function (error) {
            $scope.fetching = false;
            $scope.errorMessage = error.errorMessage;
        });
    };
});