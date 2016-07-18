angular.module('uniquers.services').factory('itemService', [
    'ajaxProxy',
    function (ajaxProxy) {
        var itemService = {};

        itemService.getItemsByType = function (type, onSuccess, onError) {
            ajaxProxy.get('/api/items/' + type, {}, onSuccess, onError);
        };

        itemService.getItemById = function (id, onSuccess, onError) {
            ajaxProxy.get('/api/item/' + id, {}, onSuccess, onError);
        };

        return itemService;
    }
]);