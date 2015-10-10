angular.module('badi-calendar.services', [])

.factory('Months', function() {
  var months = [
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
    {id: 18, arabicName: "Mulk",      portugueseName: "Domínio",     htmlClass: "around-ayyamiha"},
    {id: 19, arabicName: "Ayyám-i-Há", alternativeName: "5",         htmlClass: "ayyamiha"},
    {id: 20, arabicName: "‘Alá’",     portugueseName: "Sublimidade", htmlClass: "around-ayyamiha"},
  ]

  return {
    all: function() { return months },
    get: function(id) {
      return months.filter(function(month){
        return month.id == id
      })[0]
    }
  }
})

.factory('Days', function() {
  var days = [
    {id: 1,  dayNumber: 1},
    {id: 2,  dayNumber: 2},
    {id: 3,  dayNumber: 3},
    {id: 4,  dayNumber: 4},
    {id: 5,  dayNumber: 5},
    {id: 6,  dayNumber: 6},
    {id: 7,  dayNumber: 7},
    {id: 8,  dayNumber: 8},
    {id: 9,  dayNumber: 9},
    {id: 10, dayNumber: 10},
    {id: 11, dayNumber: 11},
    {id: 12, dayNumber: 12},
    {id: 13, dayNumber: 13},
    {id: 14, dayNumber: 14},
    {id: 15, dayNumber: 15},
    {id: 16, dayNumber: 16},
    {id: 17, dayNumber: 17},
    {id: 18, dayNumber: 18},
    {id: 19, dayNumber: 19},
  ]

  return {
    all: function(month) {
      if (month == 19) {
        return days.filter(function(day){
          return day.id < 6 || !day.id
        })
      } else {
        return days
      }
    },
    get: function(id) {
      return days.filter(function(day){
        return day.id == id
      })[0]
    }
  }
})
