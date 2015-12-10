'use strict';

/**
 * @ngdoc overview
 * @name hackathon
 * @description
 * # hackathon
 *
 * Main module of the application.
 */
angular
  .module('hackathon', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'Main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
