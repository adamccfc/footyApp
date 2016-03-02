(function() {
  'use strict';

  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
  
  app.factory('footballdataAPIservice', function($http) {
    return {
      getTeams: function(){
        return $http({
          url:'http://www.football-data.org/alpha/soccerseasons/398/leagueTable',
          headers: { 'X-Auth-Token': '64224dc8a0204084871ab3cd5645070f' },
          method: 'GET'
        }).success(function(data){
          return data;
        });
      },
      getFixtures: function(){
        return $http({
          url:'http://api.football-data.org/v1/teams/340/fixtures',
          headers: { 'X-Auth-Token': '64224dc8a0204084871ab3cd5645070f' },
          method: 'GET'
        }).success(function(data){
          return data;
        }) 
      }     
    }
  })
  app.controller('LeagueCtrl', function($scope, footballdataAPIservice){
    footballdataAPIservice.getTeams().success(function(data){
      $scope.teams=data;
      console.log($scope.teams)
    });
  })
  app.controller('FixtureCtrl', function($scope, footballdataAPIservice){
    footballdataAPIservice.getFixtures().success(function(data){
      $scope.homeTeam=data;
      console.log($scope.homeTeam)
    });
  })
    
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
