angular.module('oscarUI').controller('OverviewController', function ($rootScope, $scope, OverviewModel) {
    Overview = new OverviewModel();

    OverviewController = function () {
        $scope.model = Overview;
        Overview.getFileList().then(function(fileList){
            $scope.fileList = fileList;
        });
    };
    OverviewController();
});