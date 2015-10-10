// Ionic badi-calendar App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'badi-calendar' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'badi-calendar.services' is found in services.js
// 'badi-calendar.controllers' is found in controllers.js
angular.module('badi-calendar', ['ionic', 'badi-calendar.controllers', 'badi-calendar.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent()
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  .state('tab.year', {
    url: '/years/:year/months',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'YearCtrl'
      }
    }
  })

  .state('tab.month', {
    url: '/years/:year/months/:month/days',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-calendar.html',
        controller: 'MonthCtrl'
      }
    }
  })

  .state('tab.day', {
    url: '/years/:year/months/:month/days/:day',
    views: {
      'tab-calendar': {
        templateUrl: 'templates/tab-day.html',
        controller: 'DayCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/years/172/months')

})
