remoteHost = 'http://badi-calendar.herokuapp.com'
// remoteHost = 'http://localhost:3000'

angular.module('badi-calendar.controllers', [])
.controller('AppCtrl', function($scope, DBService) {
  DBService.load(function(){
    var existingIds = []
    DBService.loadFromRemoteServer(remoteHost + '/holidays', function(data) {
      DBService.execute('select id from holidays', function(results) {
        for (var i=0; i<results.rows.length; i++) {
          existingIds.push(results.rows.item(i).id)
        }
        DBService.insertOrUpdateCollection('holidays', ['id', 'date', 'name', 'year', 'month', 'day'], data, existingIds, [], 1)
      }, 1)
    })
  }, false)
})

.controller('YearCtrl', function($scope, $state, $ionicViewSwitcher, Months, Holidays, BadiDate, DBService) {
  $scope.resource = 'year'
  $scope.childResource = 'month'
  $scope.year = Number($state.params.year)
  $scope.parentResourceUrl = '#/tab/years/172/months'
  $scope.previousResource = $scope.year - 1
  $scope.nextResource = $scope.year + 1

  $scope.collection = Months.all($scope.year)
  Holidays.load($scope)

  $scope.goToSiblingResource = function(increase){
    $ionicViewSwitcher.nextDirection(nextSlideDirection(increase))
    if ($scope.year + increase >= 172)
      $state.go('tab.year', {year: $scope.year + increase})
  }
  $scope.goToChildResource = function(month){
    $state.go('tab.month', {year: $scope.year, month: month})
  }
})

.controller('MonthCtrl', function($scope, $state,$ionicViewSwitcher, Months, Days, Holidays, BadiDate, DBService) {
  $scope.resource = 'month'
  $scope.childResource = 'day'
  $scope.year = Number($state.params.year)
  $scope.month = Number($state.params.month)
  $scope.monthName = Months.get($scope.year, $scope.month).arabicName
  $scope.parentResourceUrl = '#/tab/years/' + $scope.year + '/months'
  $scope.previousResource = Months.get($scope.year, $scope.month - 1).arabicName
  $scope.nextResource = Months.get($scope.year, $scope.month + 1).arabicName

  $scope.collection = Days.all($scope.year, $scope.month)
  $scope.holidays = Holidays.load($scope)

  $scope.goToParentResource = function(){
    $state.go('tab.year', {year: $scope.year})
  }
  $scope.goToSiblingResource = function(increase){
    $ionicViewSwitcher.nextDirection(nextSlideDirection(increase))
    $scope.newMonth = $scope.month + increase
    $scope.newYear = $scope.year

    correctMonth($scope)

    if ($scope.newYear >= 172)
      $state.go('tab.month', {year: $scope.newYear, month: $scope.newMonth})
  }
  $scope.goToChildResource = function(day){
    $state.go('tab.day', {year: $scope.year, month: $scope.month, day: day})
  }
})

.controller('DayCtrl', function($scope, $state, $ionicViewSwitcher, Months, Days, Holidays, Calendar, GAPI, DBService) {
  $scope.resource = 'day'
  $scope.childResource = 'day'
  $scope.year = Number($state.params.year)
  $scope.month = Number($state.params.month)
  $scope.day = Number($state.params.day)
  $scope.monthName = Months.get($scope.year, $scope.month).arabicName
  $scope.parentResourceUrl = '#/tab/years/' + $scope.year + '/months/' + $scope.month + '/days'

  $scope.holidays = Holidays.load($scope)

  $scope.goToParentResource = function(){
    $state.go('tab.month', {year: $scope.year, month: $scope.month})
  }
  $scope.goToSiblingResource = function(increase){
    $ionicViewSwitcher.nextDirection(nextSlideDirection(increase))
    $scope.newDay = $scope.day + increase
    $scope.newMonth = $scope.month
    $scope.newYear = $scope.year

    correctDay($scope)
    correctMonth($scope)

    if ($scope.newYear >= 172)
      $state.go('tab.day', {year: $scope.newYear, month: $scope.newMonth, day: $scope.newDay})
  }
})

.controller('ConfigsCtrl', function($scope, $state, $ionicModal, Months, Days, Holidays, Notifications, Calendar, GAPI, DBService) {
  $scope.notifyNineteenDaysFeast = Number(localStorage.notifyNineteenDaysFeast) || 0
  $scope.toggleNotifyNineteenDaysFeast = function() {
    $scope.notifyNineteenDaysFeast = localStorage.notifyNineteenDaysFeast = 1 - Number($scope.notifyNineteenDaysFeast)
  }

  $scope.notificationAntecedence = Number(localStorage.notificationAntecedence) || 1
  $scope.setNotificationAntecedence = function(self) {
    $scope.notificationAntecedence = localStorage.notificationAntecedence = self.notificationAntecedence
    Notifications.scheduleNextNineteenDaysFeastNotification('name', $scope.notificationAntecedence)
  }

  $scope.cliendId = '884064870980-ikt370il4n4jq8niaa8ujo5epebaj3e8.apps.googleusercontent.com'
  $scope.scopes = ["https://www.googleapis.com/auth/calendar.readonly"]
  $scope.authStatus = 'authorizing'

  angular.element(document).ready(function() {
    $scope.authorize(true)
  })

  $scope.authorize = function(immediate) {
    console.log('GAPI: authorizing')
    $scope.authStatus = 'authorizing'
    gapi.auth.authorize({
      client_id: $scope.cliendId,
      scope: $scope.scopes,
      immediate: immediate
    }).then($scope.onceAuthorized, $scope.onceUnauthorized)
  }

  $scope.onceAuthorized = function(){
    console.log('GAPI: authorized')
    $scope.authStatus = 'authorized'
    $scope.loadCalendars()
  }

  $scope.onceUnauthorized = function(){
    console.log('GAPI: unauthorized')
    $scope.authStatus = 'unauthorized'
  }

  $scope.loadCalendars = function() {
    console.log('GAPI: loading calendars')
    gapi.client.load('calendar', 'v3')
    GAPI.init().then(function() {
      Calendar.listCalendarList().then(function(data) {
        $scope.calendars = data.items
        $scope.resolveCalendarId()
      })
    })
  }

  $scope.resolveCalendarId = function() {
    if(!!localStorage.calendarId) {
      $scope.calendarId = localStorage.calendarId
      $scope.calendarName = localStorage.calendarName
      $scope.loadCalendarEvents()
    } else {
      $scope.modal.show()
    }
  }

  $scope.setCalendarId = function(calendarId) {
    $scope.calendarId = localStorage.calendarId = calendarId
    $scope.calendarName = localStorage.calendarName = $scope.calendars.filter(function(c){
      return c.id == calendarId
    })[0].summary
    $scope.modal.hide()
    $scope.loadCalendarEvents()
  }

  $scope.loadCalendarEvents = function() {
    console.log('GAPI: loading calendar events')
    Calendar.listEvents($scope.calendarId).then(function(events){
      $scope.events = []

      events.items.map(function(event){
        if(event.start && event.summary) {
          $scope.events.push({
            name: event.summary,
            startDate: serializeDate(new Date(event.start.dateTime)),
            endDate: serializeDate(new Date(event.end.dateTime)),
          })
        }
      })
      DBService.insertOrUpdateCollection('events', ['name', 'startDate', 'endDate'], $scope.events, [], [], 3)
    })
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  })
})

correctDay = function (scope) {
  if (scope.newDay == 0 || scope.newDay == 20) {
    scope.newDay = Math.abs(19 - scope.newDay)
    scope.newMonth -= (scope.newDay - 10) / 9
  }
}

correctMonth = function (scope) {
  if (scope.newMonth == 0 || scope.newMonth == 21) {
    scope.newYear += scope.newMonth * 2 / 21 - 1
    scope.newMonth = Math.abs(20 - scope.newMonth)
  }
}

nextSlideDirection = function(increase) {
  if (increase > 0) {
    return 'forward'
  } else if (increase < 0) {
    return 'back'
  }
}

serializeDate = function(date){
  if(date.getFullYear()) {
    var serializedDate = '' + date.getFullYear()
    serializedDate += (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth()
    serializedDate += (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    return serializedDate
  }
}

deserializeDate = function(serializedDate){
  var year = serializedDate.slice(0, 4)
  var month = serializedDate.slice(4, 6)
  var day = serializedDate.slice(6, 8)
  return new Date(year, month, day)
}
