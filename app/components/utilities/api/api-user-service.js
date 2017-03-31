app.service('userApi', function ($window, $q) {

    // POST
    this.authenticateUser = function (email, pin) {
        var deferred = $q.defer();
        deferred.resolve(true);
        return deferred.promise;
    };

    this.getUserList = function () {
        return $window.data;
    };
});