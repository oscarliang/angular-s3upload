var app = angular.module('oscarUI', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngFileUpload']);
app.run(['$state', '$rootScope', '$timeout', 'User', 'Preload', 'config', function ($state, $rootScope, $timeout, User, Preload, config) {

        this.init = function () {
            // global vars
            $rootScope.APP_SUBJECT = config.appsubject;
            $rootScope.PROJECT_URL = config.api_url;
            $rootScope.PROJECT_LOGO = './images/logo.png';
            $rootScope.PROJECT = config.project === "cp" ? "cp" : "ga";
            $rootScope.PROJECTSUBJECT = config.projectsubject;

            $rootScope.printer = function () {
                print();
            };
        };
        logout = function () {
            $state.go('login');
        };
        // expose functions to scope
        $rootScope.logout = logout;
        $rootScope.device = gaDeviceCheck();
//        $rootScope.device = (mobileAndTabletcheck()) ? 'mobile' : 'main';

        this.init();


    }]);
