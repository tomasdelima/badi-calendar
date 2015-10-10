angular.module('badi-calendar.controllers', [])

.controller('YearCtrl', function($scope, $state, Months) {
  $scope.collection = Months.all()
  $scope.year = Number($state.params.year)
  $scope.parentResourceUrl = '#/tab/years/172/months'
  $scope.goToSiblingResource = function(increase){
    $state.go('tab.year', {year: $scope.year + increase})
  }
  $scope.goToChildResource = function(month){
    $state.go('tab.month', {year: $scope.year, month: month})
  }
})

.controller('MonthCtrl', function($scope, $state, Months, Days) {
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
})
