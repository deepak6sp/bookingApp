// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var bookingApp = angular.module('myBookingApp', ['ionic','ui.router']);

bookingApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

bookingApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

bookingApp.constant('ApiEndpoint', {
  url: 'https://maps.googleapis.com/maps/api'
});

/*
bookingApp.all('/*', function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");
        response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
        next();

    });
*/

bookingApp.controller('myAppController',function($scope){
  $scope.title='BookMyTicket';
  $scope.goBack = function () {
      window.history.back();
  };
});


bookingApp.controller('searchCity',function($scope){
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(20.59368,78.96288),
      new google.maps.LatLng(20.59368,78.96288)
    );
    var autocompleteText = document.getElementById('autocomplete');
    var options = {
      bounds: defaultBounds,
      types: ['(cities)'],
      componentRestrictions: {country: 'in'}
    };
    var autocomplete = new google.maps.places.Autocomplete(autocompleteText,options);
});

bookingApp.controller('searchCinemas',function($scope,$http,ApiEndpoint){
   $http({
      url:ApiEndpoint.url+"/place/nearbysearch/json?&location=12.971599,77.594563&radius=50000&types=movie_theater&key=AIzaSyB_MWaVyfMisy4elEy-vCjqTQYpbikFw1A"+"&callback=JSON_CALLBACK",
      method:'get'
   }).success(function(response) {
      console.log(response.results);
      $scope.movie_theaters= response.results;
    }).error(function(data, status, headers, config) {
      $scope.isLoaderOn = false;
      $scope.isError = true;
      console.log('Could Not Connect to Server');
    });
});