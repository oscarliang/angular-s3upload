app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("login");
    // Now set up the states
    $stateProvider.state('main', {
        url: "",
        templateUrl: "views/main-view.html",
        abstract: true,
        activetab: 'main'
    });

    $stateProvider.state('main.dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html",
        abstract: true,
        activetab: 'dashboard'
    });
    $stateProvider.state('main.dashboard.overview', {
        url: "/overview",
        templateUrl: "dashboard/overview/dashboard-overview.html",
        controller: 'OverviewController',
        activetab: 'dashboard'
    });
    $stateProvider.state('main.dashboard.upload', {
        url: "/upload",
        templateUrl: "dashboard/upload/file-upload.html",
        controller: 'FileUploadController',
        activetab: 'dashboard'
    });
   
    /* R&D - Mobile views */
    $stateProvider.state('mobile', {
        url: "/mobile",
        templateUrl: "views/mobile-view.html",
        abstract: true,
        activetab: 'mobile',
        controller: 'MobileController'
    });
    $stateProvider.state('mobile.dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard-mobile.html",
        abstract: true,
        activetab: 'dashboard'
    });
    $stateProvider.state('mobile.dashboard.overview', {
        url: "/overview",
        templateUrl: "dashboard/overview/dashboard-overview.html",
        controller: 'OverviewController',
        activetab: 'dashboard'
    });
        $stateProvider.state('login', {
        url: "/login",
        templateUrl: "other/login/login.html",
        controller: 'LoginController',
        activetab: 'login'
    });
  
});
