// Factory
app.factory('httpWrapper', function ($resource, $http, $q, $rootScope) {
    return {
        xssValidate: function (validArray) {
            function validate(patternArray, string) {
                var valid = true;
                for (var i = 0; i < patternArray.length; i++) {
                    if (string.indexOf(patternArray[i]) !== -1) {
                        console.log("xss error: " + string);
                        valid = false;
                        break;
                    }
                }
                return valid;
            }

            var patternArray = ['<%', '<script', '&lt;script'];
            var xssValid = true;
            var jsonString = null;
            for (var i = 0; i < validArray.length; i++) {
                jsonString = JSON.stringify(validArray[i]);
                if (jsonString.length > 5 && !validate(patternArray, jsonString)) {
                    xssValid = false;
                    break;
                }
            }

            if (!xssValid){
                $rootScope.$broadcast('badrequest');
                return false;
            } else {
                return true;
            }
        },
        interpolate: function (url, params) {
            if (params) {
                angular.forEach(Object.keys(params), function (param) {
                    url = url.replace(":" + param, params[param]);
                });
            }
            return url;
        },
        post: function (request, apiParams, params, ignoreloadingbar) {
            var url = this.interpolate(request, apiParams);
            if (!this.xssValidate([url, params])) return $q.reject("xss error");
            return $http({
                method: 'POST',
                url: url,
                data: params,
                ignoreLoadingBar: ignoreloadingbar
            }).then(
                function (response) {
                    return response.data;
                }, function (err) {
                return $q.reject(err.data);
            });
        },
        get: function (request, apiParams, params, cache, isarray, ignoreloadingbar) {
            if (!this.xssValidate([request, params])) return $q.reject("xss error");
            return $resource(request, apiParams, {
                'get': {
                    method: 'GET',
                    cache: cache,
                    params: params,
                    isArray: isarray,
                    ignoreLoadingBar: ignoreloadingbar  //angular-loading-bar tag
                }
            }).get().$promise;
        },
        put: function (request, apiParams, params, ignoreloadingbar) {
            if (!this.xssValidate([request, params])) return $q.reject("xss error");
            return $http({
                method: 'PUT',
                url: this.interpolate(request, apiParams),
                ignoreLoadingBar: ignoreloadingbar,
                data: params
            }).then(
                    function (response) {
                        return response.data;
                    }, function (err) {
                return $q.reject(err.data);
            });
        },
        delete: function (request, apiParams, params, ignoreloadingbar) {
            if (!this.xssValidate([request, params])) return $q.reject("xss error");
            return $resource(request, apiParams, {
                'delete': {
                    method: 'DELETE',
                    params: params,
                    ignoreLoadingBar: ignoreloadingbar
                }
            }).delete().$promise;
        }
    };
});
