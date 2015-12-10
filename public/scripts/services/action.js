angular.module('hackathon').factory('action', function($http, $rootScope){
    return {
        getActions: function(success, failure){
            $http.get('/api/actions')
            .success(success)
            .error(failure);
        }
    }
});