'use strict';

angular.module('hackathon').controller('Main', function ($scope, action, buttonConfig) {
    var getByValue = function(arr, value) {
      for (var i=0, iLen=arr.length; i<iLen; i++) {
        if (arr[i]._id == value) return arr[i];
      }
    }

    action.getActions(function(actions){
        $scope.actionsList = actions;
        buttonConfig.getButtonConfig(function (currentConfig){
            $scope.newButtonOneAction = getByValue($scope.actionsList,currentConfig.buttonOneAction);
            $scope.newButtonTwoAction = getByValue($scope.actionsList,currentConfig.buttonTwoAction);
        }, function(err){
            console.log(err);
        });
    }, function(err){
        console.log(err)
    });



    $scope.saveButtonConfig = function(){
        buttonConfig.saveButtonConfig($scope.newButtonOneAction, $scope.newButtonTwoAction,
         function(){},
         function(err){
            console.log(err);
        });
    }
});