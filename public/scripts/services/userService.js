angular.module('uniquers.services').factory('userService', [
    'ajaxProxy',
    function (ajaxProxy) {
        var userService = {};

        userService.getQQUserInfo = function (type, onSuccess, onError) {
            ajaxProxy.get('/api/auth/qq/user' + type, {}, onSuccess, onError);
        };

        return userService;
    }
]);