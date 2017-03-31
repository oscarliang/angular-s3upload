angular.module('oscarUI').controller('FileUploadController', function fileUploadController($scope, Time, Upload, config, $timeout) {
// the reason to send the User, is manage-myaccount-edit.html need it

    $scope.uploadBill = function (file)
    {   
        var params = {
            id: "1000",
            email: "test@email.com",
            role: "customer",
            date: moment(Time.getStartOfDay(new Date())).unix()
        }

        $scope.fetching = true;     
        upload(params, file).then(function (response) {
                $scope.fetching = false;
                showUIMessage($scope,'success', 'File uploaded successfully');
        }, function (error) {
                $scope.fetching = false;
                showUIMessage($scope,'danger', error.data.errorMessage);
        });
    };

    function upload(params, file){
        return Upload.upload({
            url: config.api_url + '/api/history/upload',
            fields: params,
            file: file
        });
    }
    fileUploadController = new function () {
        $scope.errorMessage = '';
        $scope.showAlert = false;
        $scope.fetching = false;
    };
});