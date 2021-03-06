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
  selected_radius:'5000',
  selected_types:'movie_theater',
  key:'AIzaSyB_MWaVyfMisy4elEy-vCjqTQYpbikFw1A'
});


bookingApp.controller('myAppController',function($scope,$ionicSideMenuDelegate,$ionicPopup){
  $scope.title='BookMyTicket';
  $scope.goBack = function () {
      window.history.back();
  };
   $scope.toggle_left = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.select_location = function() {
    $scope.data = {}
    var myPopup = $ionicPopup.show({
      template: '<select ng-model="mySelect" ng-change="showSelectValue(mySelect)"><option>Bangalore</option><option>Lucknow</option></select>',
      title: 'Select city',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {         
            console.log('location saved');
          }
        }
      ]
    });
  }
  
  $scope.showSelectValue = function(mySelect) {
    // get selected location and process ... 
    alert("you have selected "+mySelect);
  }

});



bookingApp.controller('movie_sreeen_selection',function($scope,$http,ApiEndpoint){
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(20.59368,78.96288), // this is country specific altitudes
      new google.maps.LatLng(20.59368,78.96288)
    );
    var autocompleteText = document.getElementById('autocomplete');
    var options = {
      bounds: defaultBounds,
      types: ['(cities)'],
      componentRestrictions: {country: 'in'}
    };
    var autocomplete = new google.maps.places.Autocomplete(autocompleteText,options);
    var selected_location_coordinates_latlong="";
    var latlong = "";
    autocomplete.addListener('place_changed', function() {
         var place = autocomplete.getPlace();
         //console.log("place lat="+ place.geometry.location.lat());
         selected_place_name = place.name;
         $scope.callApi(selected_place_name); 
    });
    $scope.callApi = function(slected_place_name){
        var request = $http({
          method : "post",
          url:"php_files/index.php",
          data: {selected_place_name : selected_place_name},      
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        request.success(function(response){
          console.log(response);
          $scope.results= response;
          //alert($scope.theaters);
        });

        request.error(function(response, status, headers, config) {
          $scope.isLoaderOn = false;
          $scope.isError = true;
          alert('Could Not Connect to Server');
        });
    }


    /*

     function to retrieve theatre list using google api
    $scope.callApi = function(geo_lat,geo_lng){
      var selected_location_coordinates = geo_lat+','+geo_lng;
      var selected_url = ApiEndpoint.url+"&location="+selected_location_coordinates+"&radius="+ApiEndpoint.selected_radius+"&types="+ApiEndpoint.selected_types+"&key="+ApiEndpoint.key+"&callback=JSON_CALLBACK";
        $http({
          url:selected_url,
          method:'get'
        }).success(function(response) {
          console.log(response.results);
          $scope.movie_theaters= response.results;
        }).error(function(data, status, headers, config) {
          $scope.isLoaderOn = false;
          $scope.isError = true;
          console.log('Could Not Connect to Server');
        });
    }
    */
    
});
