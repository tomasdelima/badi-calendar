angular.module('badi-calendar.controllers', [])
.controller('AppCtrl', function($scope, DBService) {
  DBService.load(function(){
    var existingIds = []
    DBService.loadFromRemoteServer('http://badi-calendar.herokuapp.com/holidays', function(data) {
      DBService.execute('select id from holidays', function(results) {
        for (var i=0; i<results.rows.length; i++) {
          existingIds.push(results.rows.item(i).id)
        }
        DBService.insertOrUpdateCollection('holidays', ['id', 'date', 'name', 'year', 'month', 'day'], data, existingIds, [], 1)
      }, 1)
    })
  }, false)
})

.controller('YearCtrl', function($scope, $state, Months, DBService) {
  $scope.collection = Months.all()
  $scope.year = Number($state.params.year)
  $scope.parentResourceUrl = '#/tab/years/172/months'
  $scope.goToSiblingResource = function(increase){
    $state.go('tab.year', {year: $scope.year + increase})
  }
  $scope.goToChildResource = function(month){
    $state.go('tab.month', {year: $scope.year, month: month})
  }
  $scope.loadHolidays = function() {
    $scope.holidaysFor = {}
    DBService.execute("select count(id) as count, month from holidays where year = '" + $scope.year + "' group by month", function(r){
      for(i=0;i<r.rows.length;i++){
        $scope.holidaysFor[r.rows.item(i).month] = r.rows.item(i).count
      }
    }, 1)
  }
})

.controller('MonthCtrl', function($scope, $state, Months, Days, DBService) {
  $scope.year = Number($state.params.year)
  $scope.month = Number($state.params.month)
  $scope.collection = Days.all($scope.month)
  $scope.monthName = Months.get($scope.month).arabicName
  $scope.parentResourceUrl = '#/tab/years/' + $scope.year + '/months'

  $scope.goToSiblingResource = function(increase){
    var newMonth = $scope.month + increase
    var newYear = $scope.year

    if (newMonth == 0 || newMonth == 21) {
      newYear += newMonth * 2 / 21 - 1
      newMonth = Math.abs(20 - newMonth)
    }

    $state.go('tab.month', {year: newYear, month: newMonth})
  }
  $scope.loadHolidays = function() {
    $scope.holidaysFor = {}
    DBService.execute("select count(id) as count, day from holidays where year = '" + $scope.year + "' and month = '" + $scope.month + "' group by day", function(r){
      for(i=0;i<r.rows.length;i++){
        $scope.holidaysFor[r.rows.item(i).day] = r.rows.item(i).count
      }
    }, 1)
  }
})
