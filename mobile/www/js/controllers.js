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

.controller('YearCtrl', function($scope, $state, Months, Holidays, DBService) {
  $scope.resource = 'year'
  $scope.childResource = 'month'
  $scope.year = Number($state.params.year)
  $scope.parentResourceUrl = '#/tab/years/172/months'

  $scope.collection = Months.all()
  $scope.holidays = Holidays.load($scope)

  $scope.goToSiblingResource = function(increase){
    $state.go('tab.year', {year: $scope.year + increase})
  }
  $scope.goToChildResource = function(month){
    $state.go('tab.month', {year: $scope.year, month: month})
  }
})

.controller('MonthCtrl', function($scope, $state, Months, Days, Holidays, DBService) {
  $scope.resource = 'month'
  $scope.childResource = 'day'
  $scope.year = Number($state.params.year)
  $scope.month = Number($state.params.month)
  $scope.monthName = Months.get($scope.month).arabicName
  $scope.parentResourceUrl = '#/tab/years/' + $scope.year + '/months'

  $scope.collection = Days.all($scope.month)
  $scope.holidays = Holidays.load($scope)

  $scope.goToSiblingResource = function(increase){
    var newMonth = $scope.month + increase
    var newYear = $scope.year

    if (newMonth == 0 || newMonth == 21) {
      newYear += newMonth * 2 / 21 - 1
      newMonth = Math.abs(20 - newMonth)
    }

    $state.go('tab.month', {year: newYear, month: newMonth})
  }
  $scope.goToChildResource = function(day){
    $state.go('tab.day', {year: $scope.year, month: $scope.month, day: day})
  }
})

.controller('DayCtrl', function($scope, $state, Months, Days, Holidays, DBService) {
  $scope.resource = 'day'
  $scope.childResource = 'day'
  $scope.year = Number($state.params.year)
  $scope.month = Number($state.params.month)
  $scope.day = Number($state.params.day)
  $scope.monthName = Months.get($scope.month).arabicName
  $scope.parentResourceUrl = '#/tab/years/' + $scope.year + '/months/' + $scope.month + '/days'

  $scope.holidays = Holidays.load($scope)

  $scope.goToSiblingResource = function(increase){
    var newDay = $scope.day + increase
    var newMonth = $scope.month
    var newYear = $scope.year
    $state.go('tab.day', {year: newYear, month: newMonth, day: newDay})
  }

})
