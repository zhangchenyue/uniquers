angular.module('uniquers.services').factory('ajaxProxy', [
    '$http',
    '$timeout',
    '$window',
    '$rootScope',
    function ($http, $timeout, $window, $rootScope) {
        var ajaxProxy = {};
        var execute = function (method, url, data, params, onSuccess, onError) {
            onSuccess = onSuccess || function () { };
            onError = onError || function () { };
            params = params || {};

            $timeout(function () {
                $http({ method: method, url: url, data: data, params: params }).success(function (response, status) {
                    onSuccess(response, status);
                }).error(function (response, status) {
                    if ((response && response.IsAuthenicated == false) || status == 401) {
                        console.log('Your session has expired, please login again');
                        return;
                    }
                    onError(response);
                });
            }, 0);
        }

        ajaxProxy.get = function (url, params, onSuccess, onError) {
            execute('GET', url, null, params, onSuccess, onError);
        };

        ajaxProxy.post = function (url, data, params, onSuccess, onError) {
            execute('POST', url, data, params, onSuccess, onError);
        };

        ajaxProxy.delete = function (url, params, onSuccess, onError) {
            execute('DELETE', url, data, params, onSuccess, onError);
        };


        return ajaxProxy;
    }
]);
