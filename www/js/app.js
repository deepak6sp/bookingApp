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
  url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  selected_location_coordinates:'12.971599,77.594563',
  selected_radius:'50000',
  selected_types:'movie_theater',
  key:'AIzaSyB_MWaVyfMisy4elEy-vCjqTQYpbikFw1A'
});


bookingApp.controller('myAppController',function($scope,$ionicSideMenuDelegate){
  $scope.title='BookMyTicket';
  $scope.goBack = function () {
      window.history.back();
  };
   $scope.toggle_left = function() {
    $ionicSideMenuDelegate.toggleLeft();
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
      url:ApiEndpoint.url+"&location="+ApiEndpoint.selected_location_coordinates+"&radius="+ApiEndpoint.selected_radius+"&types="+ApiEndpoint.selected_types+"&key="+ApiEndpoint.key+"&callback=JSON_CALLBACK",
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