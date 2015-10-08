angular.module('badi-calendar.controllers', [])

.controller('CalendarCtrl', function($scope, $stateParams) {
  $scope.collection = [
    {increase: -1, icon: "ion-android-arrow-back"},
    {id: 1, name: "Bahá"},
    {id: 2, name: "Jalál"},
    {id: 3, name: "Jamál"},
    {id: 4, name: "‘Aẓamat"},
    {id: 5, name: "Núr"},
    {id: 6, name: "Raḥmat"},
    {id: 7, name: "Kalimát"},
    {id: 8, name: "Kamál"},
    {id: 9, name: "Asmá’"},
    {id: 10, name: "‘Izzat"},
    {id: 11, name: "Mashíyyat"},
    {id: 12, name: "‘Ilm"},
    {id: 13, name: "Qudrat"},
    {id: 14, name: "Qawl"},
    {id: 15, name: "Masá’il"},
    {id: 16, name: "Sharaf"},
    {id: 17, name: "Sulṭán"},
    {id: 18, name: "Mulk"},
    {id: 19, name: "‘Alá’"},
    {increase: 1, icon: "ion-android-arrow-forward"},
  ]
  $scope.year = $stateParams.year
  $scope.month = $stateParams.month
  $scope.resource = 'years'
  $scope.childResource = 'months'

  $scope.resourceFor = function(item) {
    if (item.id) {
      var sufix = $scope.year + "/" + $scope.childResource + "/" + item.id
    } else {
      var sufix = Number($scope.year) + item.increase
    }
    return "#/tab/" + $scope.resource + "/" + sufix
  }
})
