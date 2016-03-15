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
      getSeason: function() {
        return $http({
          url:'http://api.football-data.org/v1/soccerseasons/398',
          headers: { 'X-Auth-Token': '64224dc8a0204084871ab3cd5645070f' },
          method: 'GET'
        }).success(function(data){
          return data;
        });
      },
      getTeams: function() {
        return $http({
          url:'http://api.football-data.org/v1/soccerseasons/398/teams',
          headers: { 'X-Auth-Token': '64224dc8a0204084871ab3cd5645070f' },
          method: 'GET'
        }).success(function(data){
          return data;
        });
      },
      getLeague: function(){
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
  app.controller('PremierLeagueController' , function($scope, footballdataAPIservice){
    footballdataAPIservice.getSeason().success(function(data){
      $scope.league=data;
      console.log($scope.league)
    });
  })

  app.controller('TeamController', function($scope, footballdataAPIservice){
    footballdataAPIservice.getTeams().success(function(data){
      $scope.team=data;
      console.log($scope.team)
    });
  })
  app.controller('LeagueController', function($scope, footballdataAPIservice){
    footballdataAPIservice.getLeague().success(function(data){
      $scope.league=data;
      console.log($scope.league)
      console.log($scope.league.standing)
    });
  })
  app.controller('FixtureController', function($scope, footballdataAPIservice){
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
