'use strict';

angular.module('hackathon').controller('Main', function ($scope, action, buttonConfig) {
    action.getActions(function(actions){
        $scope.actionsList = actions;
    }, function(err){
        console.log(err)
    });

    buttonConfig.getButtonConfig(function (buttonConfig){
        $scope.buttonOneAction = $scope.newButtonOneAction = buttonConfig.buttonOneAction;
        $scope.buttonTwoAction = $scope.newButtonTwoAction = buttonConfig.buttonTwoAction;
    }, function(err){
        console.log(err);
    });

    $scope.saveButtonConfig = function(){
        console.log($scope.newButtonOneAction);
        buttonConfig.saveButtonConfig($scope.newButtonOneAction, $scope.newButtonTwoAction,
         function(){},
         function(err){
            console.log(err);
        });
    }
});