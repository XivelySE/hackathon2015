angular.module('hackathon').factory('buttonConfig', function($http, $rootScope){
    return {
        getButtonConfig: function(success, failure){
            $http.get('/api/buttonConfig')
            .success(success)
            .error(failure);
        },

        saveButtonConfig: function(buttonOne, buttonTwo, success, failure){
            $http.post('/api/buttonConfig', {
                buttonOneAction: buttonOne,
                buttonTwoAction: buttonTwo
            })
            .success(success)
            .error(failure);
        }
    }
});