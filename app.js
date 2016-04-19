'use strict';

angular
  .module('labIS', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main/mainView.html',
        controller: 'MainCtrl',
      })
      .otherwise({
        redirectTo: '/404.html'
      });
  });
