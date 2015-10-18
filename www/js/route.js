bookingApp.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('/',{
				url:'/',
				templateUrl:'partials/mainView.html',
				controller: 'myAppController'
			})
			.state('home',{
				url:"/",
				templateUrl:'partials/mainView.html',
				controller: 'myAppController'
			})
			.state('movie_screen_selection',{
				url:"/movie_screen_selection",
				templateUrl:'partials/movie_screen_selection.html',
				controller: 'myAppController'
			})
			.state('movie_selection',{
				url:"/movie_selection",
				templateUrl:'partials/movie_selection.html',
				controller: 'myAppController'
			});
			

});

