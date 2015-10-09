angular.module('badi-calendar.controllers', [])

.controller('CalendarCtrl', function($scope, $stateParams) {
  $scope.collection = [
    {increase: -1, icon: "ion-android-arrow-back"},
    {id: 1,  arabicName: "Bahá",      portugueseName: "Esplendor"},
    {id: 2,  arabicName: "Jalál",     portugueseName: "Glória"},
    {id: 3,  arabicName: "Jamál",     portugueseName: "Beleza"},
    {id: 4,  arabicName: "‘Aẓamat",   portugueseName: "Grandeza"},
    {id: 5,  arabicName: "Núr",       portugueseName: "Luz"},
    {id: 6,  arabicName: "Raḥmat",    portugueseName: "Miséricórdia"},
    {id: 7,  arabicName: "Kalimát",   portugueseName: "Palavras"},
    {id: 8,  arabicName: "Kamál",     portugueseName: "Perfeição"},
    {id: 9,  arabicName: "Asmá’",     portugueseName: "Nomes"},
    {id: 10, arabicName: "‘Izzat",    portugueseName: "Potência"},
    {id: 11, arabicName: "Mashíyyat", portugueseName: "Vontade"},
    {id: 12, arabicName: "‘Ilm",      portugueseName: "Conhecimento"},
    {id: 13, arabicName: "Qudrat",    portugueseName: "Poder"},
    {id: 14, arabicName: "Qawl",      portugueseName: "Discurso"},
    {id: 15, arabicName: "Masá’il",   portugueseName: "Perguntas"},
    {id: 16, arabicName: "Sharaf",    portugueseName: "Honra"},
    {id: 17, arabicName: "Sulṭán",    portugueseName: "Soberania"},
    {id: 18, arabicName: "Mulk",      portugueseName: "Domínio"},
    {id: 19, arabicName: "‘Alá’",     portugueseName: "Sublimidade"},
    {increase: 1, icon: "ion-android-arrow-forward"},
  ]
  $scope.year = $stateParams.year
  $scope.month = $stateParams.month
  $scope.resource = 'years'
  $scope.resourceName = 'Ano'
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
