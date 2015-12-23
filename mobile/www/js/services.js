dayDuration = 24 * 60 * 60 * 1000

angular.module('badi-calendar.services', [])

.factory('Months', function (BadiDate) {
  var months = function (year) {
    return [
      {id: 1,  gregorianStart: BadiDate.new(year, 1,  1).toGregorian, gregorianEnd: BadiDate.new(year, 1,  19).toGregorian, toString: BadiDate.new(year, 1,  1).toString.slice(-6), slug: "baha",       arabicName: "Bahá",      portugueseName: "Esplendor"},
      {id: 2,  gregorianStart: BadiDate.new(year, 2,  1).toGregorian, gregorianEnd: BadiDate.new(year, 2,  19).toGregorian, toString: BadiDate.new(year, 2,  1).toString.slice(-6), slug: "jalal",      arabicName: "Jalál",     portugueseName: "Glória"},
      {id: 3,  gregorianStart: BadiDate.new(year, 3,  1).toGregorian, gregorianEnd: BadiDate.new(year, 3,  19).toGregorian, toString: BadiDate.new(year, 3,  1).toString.slice(-6), slug: "jamal",      arabicName: "Jamál",     portugueseName: "Beleza"},
      {id: 4,  gregorianStart: BadiDate.new(year, 4,  1).toGregorian, gregorianEnd: BadiDate.new(year, 4,  19).toGregorian, toString: BadiDate.new(year, 4,  1).toString.slice(-6), slug: "azamat",     arabicName: "‘Aẓamat",   portugueseName: "Grandeza"},
      {id: 5,  gregorianStart: BadiDate.new(year, 5,  1).toGregorian, gregorianEnd: BadiDate.new(year, 5,  19).toGregorian, toString: BadiDate.new(year, 5,  1).toString.slice(-6), slug: "nur",        arabicName: "Núr",       portugueseName: "Luz"},
      {id: 6,  gregorianStart: BadiDate.new(year, 6,  1).toGregorian, gregorianEnd: BadiDate.new(year, 6,  19).toGregorian, toString: BadiDate.new(year, 6,  1).toString.slice(-6), slug: "rahmat",     arabicName: "Raḥmat",    portugueseName: "Miséricórdia"},
      {id: 7,  gregorianStart: BadiDate.new(year, 7,  1).toGregorian, gregorianEnd: BadiDate.new(year, 7,  19).toGregorian, toString: BadiDate.new(year, 7,  1).toString.slice(-6), slug: "kalimat",    arabicName: "Kalimát",   portugueseName: "Palavras"},
      {id: 8,  gregorianStart: BadiDate.new(year, 8,  1).toGregorian, gregorianEnd: BadiDate.new(year, 8,  19).toGregorian, toString: BadiDate.new(year, 8,  1).toString.slice(-6), slug: "kamal",      arabicName: "Kamál",     portugueseName: "Perfeição"},
      {id: 9,  gregorianStart: BadiDate.new(year, 9,  1).toGregorian, gregorianEnd: BadiDate.new(year, 9,  19).toGregorian, toString: BadiDate.new(year, 9,  1).toString.slice(-6), slug: "asma",       arabicName: "Asmá’",     portugueseName: "Nomes"},
      {id: 10, gregorianStart: BadiDate.new(year, 10, 1).toGregorian, gregorianEnd: BadiDate.new(year, 10, 19).toGregorian, toString: BadiDate.new(year, 10, 1).toString.slice(-6), slug: "izzat",      arabicName: "‘Izzat",    portugueseName: "Potência"},
      {id: 11, gregorianStart: BadiDate.new(year, 11, 1).toGregorian, gregorianEnd: BadiDate.new(year, 11, 19).toGregorian, toString: BadiDate.new(year, 11, 1).toString.slice(-6), slug: "mashiyyat",  arabicName: "Mashíyyat", portugueseName: "Vontade"},
      {id: 12, gregorianStart: BadiDate.new(year, 12, 1).toGregorian, gregorianEnd: BadiDate.new(year, 12, 19).toGregorian, toString: BadiDate.new(year, 12, 1).toString.slice(-6), slug: "ilm",        arabicName: "‘Ilm",      portugueseName: "Conhecimento"},
      {id: 13, gregorianStart: BadiDate.new(year, 13, 1).toGregorian, gregorianEnd: BadiDate.new(year, 13, 19).toGregorian, toString: BadiDate.new(year, 13, 1).toString.slice(-6), slug: "qudrat",     arabicName: "Qudrat",    portugueseName: "Poder"},
      {id: 14, gregorianStart: BadiDate.new(year, 14, 1).toGregorian, gregorianEnd: BadiDate.new(year, 14, 19).toGregorian, toString: BadiDate.new(year, 14, 1).toString.slice(-6), slug: "qawl",       arabicName: "Qawl",      portugueseName: "Discurso"},
      {id: 15, gregorianStart: BadiDate.new(year, 15, 1).toGregorian, gregorianEnd: BadiDate.new(year, 15, 19).toGregorian, toString: BadiDate.new(year, 15, 1).toString.slice(-6), slug: "masa-il",    arabicName: "Masá’il",   portugueseName: "Perguntas"},
      {id: 16, gregorianStart: BadiDate.new(year, 16, 1).toGregorian, gregorianEnd: BadiDate.new(year, 16, 19).toGregorian, toString: BadiDate.new(year, 16, 1).toString.slice(-6), slug: "sharaf",     arabicName: "Sharaf",    portugueseName: "Honra"},
      {id: 17, gregorianStart: BadiDate.new(year, 17, 1).toGregorian, gregorianEnd: BadiDate.new(year, 17, 19).toGregorian, toString: BadiDate.new(year, 17, 1).toString.slice(-6), slug: "sultan",     arabicName: "Sulṭán",    portugueseName: "Soberania"},
      {id: 18, gregorianStart: BadiDate.new(year, 18, 1).toGregorian, gregorianEnd: BadiDate.new(year, 18, 19).toGregorian, toString: BadiDate.new(year, 18, 1).toString.slice(-6), slug: "mulk",       arabicName: "Mulk",      portugueseName: "Domínio",     htmlClass: "around-ayyamiha"},
      {id: 19, gregorianStart: BadiDate.new(year, 19, 1).toGregorian, gregorianEnd: BadiDate.new(year, 19, 19).toGregorian, toString: BadiDate.new(year, 19, 1).toString.slice(-6), slug: "ayyam-i-ha", arabicName: "Ayyám-i-Há", alternativeName: "5",         htmlClass: "ayyamiha"},
      {id: 20, gregorianStart: BadiDate.new(year, 20, 1).toGregorian, gregorianEnd: BadiDate.new(year, 20, 19).toGregorian, toString: BadiDate.new(year, 20, 1).toString.slice(-6), slug: "ala",        arabicName: "‘Alá’",     portugueseName: "Sublimidade", htmlClass: "around-ayyamiha"},
    ]
  }

  return {
    all: function (year) { return months(year) },
    get: function (year, id) {
      if (id == 0) id = 20
      if (id == 21) id = 1

      return months(year).filter(function (month) {
        return month.id == id
      })[0]
    }
  }
})

.factory('Days', function (BadiDate) {
  var days = function (year, month) {
    var tempDays = []
    for (day=1; day<20; day++) {
      tempDays.push(BadiDate.new(year, month, day))
    }

    return tempDays
  }

  return {
    all: function (year, month) {
      if (month == 19) {
        var size = BadiDate.new(year, 19, 5).toGregorian.day == BadiDate.new(year, 20, 1).toGregorian.day ? 5 : 6

        return days(year, month).filter(function (day) {
          return day.id < size || !day.id
        })
      } else {
        return days(year, month)
      }
    },
    get: function (id) {
      return days(year, month).filter(function (day) {
        return day.id == id
      })[0]
    }
  }
})

.factory('Holidays', function (Events, DBService) {
  return {
    load: function (scope) {
      if (scope.resource == 'year') {
        var sqlString = "select count(id) as count, month from holidays where year = '" + scope.year + "' group by month"
      } else if (scope.resource == 'month') {
        var sqlString = "select count(id) as count, day from holidays where year = '" + scope.year + "' and month = '" + scope.month + "' group by day"
      } else {
        var sqlString = "select * from holidays where year = '" + scope.year + "' and month = '" + scope.month + "' and day = '" + scope.day + "'"
      }

      DBService.execute(sqlString, function (r) {
        scope.holidays = {}

        for (i=0;i<r.rows.length;i++) {
          if (scope.resource == 'day') {
            scope.holidays[r.rows.item(i)[scope.childResource]] = r.rows.item(i)
          } else {
            scope.holidays[r.rows.item(i)[scope.childResource]] = r.rows.item(i).count
          }
        }

        Events.load(scope)
      }, 1)
    }
  }
})

.factory('Events', function (Months, DBService) {
  return {
    load: function (scope) {
      scope.events = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0}

      Months.all(scope.year).map(function (month) {
        var startDate = serializeDate(month.gregorianStart)
        var endDate = serializeDate(month.gregorianEnd)
        var sqlString = "SELECT count(id) as count, substr(startDate,5,2) as month FROM events WHERE startDate >= '" + startDate + "' AND startDate < '" + endDate + "' GROUP BY substr(startDate, 5, 2)"

        DBService.execute(sqlString, function (r) {
          for (i=0;i<r.rows.length;i++) {
            scope.events[Number(r.rows.item(i).month)] += r.rows.item(i).count
          }
        }, 1)
      })
    }
  }
})

.factory('BadiDate', function () {
  var self = {}

  self.toGregorian = function (year, month, day) {
    if (month > 18) {
      return self.nawRuzDateFor(year + 1844).addDays(-self.daysUntilNextNawRuz(month, day))
    } else {
      return self.nawRuzDateFor(year + 1843).addDays(self.daysSinceLastNawRuz(month, day))
    }
  }

  self.daysSinceLastNawRuz = function (month, day) {
    return (Number(month.toFixed()) - 1) * 19 + day - 1
  }

  self.daysUntilNextNawRuz = function (month, day) {
    if (month == 19) {
      return (24 - day)
    } else {
      return (20 - day)
    }
  }

  self.nawRuzDateFor = function (year) {
    var nawRuzDay = {2015: 21, 2016: 20, 2017: 20, 2018: 21, 2019: 21, 2020: 20, 2021: 20, 2022: 21, 2023: 21, 2024: 20, 2025: 20, 2026: 21, 2027: 21, 2028: 20, 2029: 20, 2030: 20, 2031: 21, 2032: 20, 2033: 20, 2034: 20, 2035: 21, 2036: 20, 2037: 20, 2038: 20, 2039: 21, 2040: 20, 2041: 20, 2042: 20, 2043: 21, 2044: 20, 2045: 20, 2046: 20, 2047: 21, 2048: 20, 2049: 20, 2050: 20, 2051: 21, 2052: 20, 2053: 20, 2054: 20, 2055: 21, 2056: 20, 2057: 20, 2058: 20, 2059: 20, 2060: 20, 2061: 20, 2062: 20, 2063: 20, 2064: 20}[year]
    return new Date(year, 2, nawRuzDay)
  }

  return {
    new: function (year, month, day) {
      return {
        year: year,
        month: month,
        day: day,
        id: day,
        toString: day + '-' + month + '-' + year,
        toShortString: day + '-' + month,
        toGregorian: self.toGregorian(year, month, day)
      }
    }
  }
})

.factory('GregorianDate', function () {
  var self = {}

  self.toBadi = function (date) {
    self.date = date
    self.year = date.getFullYear()
    self.month = date.getMonth()
    self.day = date.getDate()

    return {
      year: self.badiYear(),
      month: self.badiMonth(),
      day: self.badiDay(),
      toString: self.badiDay() + '-' + self.badiMonth() + '-' + self.badiYear()
    }
  }

  self.badiYear = function () {
    return self.year - (self.beforeNawRuz(self.year) ? 1844 : 1843)
  }

  self.badiMonth = function () {
    if (self.daysUntilNextNawRuz() <= 19) {
      return 20
    } else {
      return Math.floor(self.daysSinceLastNawRuz(self.year, self.month, self.day) / 19) + 1
    }
  }

  self.badiDay = function () {
    if (self.badiMonth() == 20) {
      return 20 - self.daysUntilNextNawRuz()
    } else {
      return Math.round(self.daysSinceLastNawRuz(self.year, self.month, self.day) % 19) + 1
    }
  }

  self.daysSinceLastNawRuz = function () {
    var yearShift = self.beforeNawRuz(self.year) ? 1 : 0
    return Math.round((self.date - self.nawRuzDateFor (self.year - yearShift)) / dayDuration)
  }

  self.daysUntilNextNawRuz = function () {
    var yearShift = self.beforeNawRuz(self.year) ? 0 : 1
    return Math.round((self.nawRuzDateFor (self.year + yearShift) - self.date) / dayDuration)
  }

  self.beforeNawRuz = function (year) {
    return self.date < self.nawRuzDateFor (year)
  }

  self.nawRuzDateFor = function (year) {
    var nawRuzDay = {2015: 21, 2016: 20, 2017: 20, 2018: 21, 2019: 21, 2020: 20, 2021: 20, 2022: 21, 2023: 21, 2024: 20, 2025: 20, 2026: 21, 2027: 21, 2028: 20, 2029: 20, 2030: 20, 2031: 21, 2032: 20, 2033: 20, 2034: 20, 2035: 21, 2036: 20, 2037: 20, 2038: 20, 2039: 21, 2040: 20, 2041: 20, 2042: 20, 2043: 21, 2044: 20, 2045: 20, 2046: 20, 2047: 21, 2048: 20, 2049: 20, 2050: 20, 2051: 21, 2052: 20, 2053: 20, 2054: 20, 2055: 21, 2056: 20, 2057: 20, 2058: 20, 2059: 20, 2060: 20, 2061: 20, 2062: 20, 2063: 20, 2064: 20}[year]
    return new Date(year, 2, nawRuzDay)
  }

  return {
    toBadi: self.toBadi
  }
})

.service('Notifications', function (Months, BadiDate, DBService, $cordovaLocalNotification) {
  buildNineteenDaysFeastNotification = function (monthId, date, antecedence) {
    return {
      id: monthId,
      led: '8A2BE2',
      at: date.getTime() - antecedence * dayDuration,
      title: 'Lembrete para próxima Festa de Dezenove Dias',
      text: 'Próxima Festa: ' + Months.get(172, monthId).arabicName + ' (' + Months.get(172, monthId).portugueseName + '), dia ' + date.toLocaleString('pt-BR').slice(0, 10),
    }
  }

  buildHolidayNotification = function (holiday, antecedence) {
    var date = new Date(holiday.date)
    var dateString = date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear()

    return {
      id: Number(holiday.date.replace(/\-/g, '')),
      led: '8A2BE2',
      at: date.getTime() - antecedence * dayDuration,
      title: 'Lembrete para próximo dia sagrado',
      text: 'Próximo dia sagrado: ' + holiday.name + ', dia ' + dateString,
    }
  }

  scheduleNextNineteenDaysFeastsNotifications = function (antecedence) {
    var notifications = []

    for (year = 172; year < 173; year++) {
      for (month = 1; month <= 19; month++) {
        var date = BadiDate.new(year, month, 1).toGregorian
        if (date.getTime() > new Date().getTime()) {
          notifications.push(buildNineteenDaysFeastNotification(month, date, antecedence))
        }
      }
    }

    if (window.cordova) {
      $cordovaLocalNotification.schedule(notifications)
    }
  }

  scheduleNextHolidaysNotifications = function (antecedence) {
    var holidays = []
    var notifications = []

    DBService.insertIntoCollection('SELECT date, name, year, month, day FROM holidays WHERE date != "" AND year < 182 ORDER BY date', holidays, function () {
      holidays.forEach(function(holiday) {
        if (new Date(holiday.date).getTime() > new Date().getTime()) {
          notifications.push(buildHolidayNotification(holiday, antecedence))
        }
      })

      if (window.cordova) {
        $cordovaLocalNotification.schedule(notifications)
      }
    })
  }

  scheduleNotifications = function (antecedence) {
    scheduleNextNineteenDaysFeastsNotifications(antecedence)
    scheduleNextHolidaysNotifications(antecedence*6)
  }

  unscheduleNotifications = function () {
    var ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    var holidays = []

    DBService.insertIntoCollection('SELECT date, name, year, month, day FROM holidays WHERE date != "" AND year < 182 ORDER BY date', holidays, function () {
      holidays.forEach(function (holiday) {
        ids.push(Number(holiday.date.replace(/\-/g, '')))
      })
      $cordovaLocalNotification.cancel(ids)
    })
  }

  return {
    scheduleNotifications: scheduleNotifications,
    unscheduleNotifications: unscheduleNotifications
  }
})

.factory('Media', function ($q, $ionicPlatform, $window) {
  function loadMedia(src, onError, onStatus, onStop) {
    var defer = $q.defer()
    $ionicPlatform.ready(function () {
      var mediaSuccess = function () {
        if (onStop) onStop()
      }
      var mediaError = function (err) {
        logError(src, err)
        if (onError) onError(err)
      }
      var mediaStatus = function (status) {
        if (onStatus) onStatus(status)
      }

      if ($ionicPlatform.is('android')) src = '/android_asset/www/' + src
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus))
    })

    return defer.promise
  }

  function logError(src, err) {
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    })
  }

  function getStatusMessage(status) {
         if (status === 0) { return 'Media.MEDIA_NONE' }
    else if (status === 1) { return 'Media.MEDIA_STARTING' }
    else if (status === 2) { return 'Media.MEDIA_RUNNING' }
    else if (status === 3) { return 'Media.MEDIA_PAUSED' }
    else if (status === 4) { return 'Media.MEDIA_STOPPED' }
    else                   { return 'Unknown status <' + status + '>' }
  }

  function getErrorMessage(code) {
         if (code === 1) { return 'MediaError.MEDIA_ERR_ABORTED' }
    else if (code === 2) { return 'MediaError.MEDIA_ERR_NETWORK' }
    else if (code === 3) { return 'MediaError.MEDIA_ERR_DECODE' }
    else if (code === 4) { return 'MediaError.MEDIA_ERR_NONE_SUPPORTED' }
    else                 { return 'Unknown code <' + code + '>' }
  }

  return {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  }
})

.service('DBService', function ($http, $state) {
  db = this

  return {
    load: function (callBack, recreateDB) {
      db = this
      console.log('>> Preparing DB')
      angular.db = openDatabase('badi-calendar', '1.0', 'badi-calendar-db', 2 * 1024 * 1024)
      if (recreateDB) {
        db.recreateDB(function () {
          db.prepareDB(callBack)
        })
      } else {
        db.prepareDB(callBack)
      }
    },
    prepareDB: function (callBack) {
      db.prepareSchema('holidays', {date: 'date', name: 'string', year: 'integer', month: 'integer', day: 'integer'}, {}, function () {
        db.prepareSchema('events', {startDate: 'integer', endDate: 'integer', name: 'string'}, {}, function () {
          console.log('>> DB Prepared')
          if (callBack) {callBack()}
        })
      })
    },
    prepareSchema: function (table, fieldsObj, defaultValues, callBack) {
      console.log('>>>> Preparing schema for ' + table)
      db.createRawTable(table, function () {
        db.addColumns(table, fieldsObj, defaultValues, function () {
          console.log('>>>> Schema loaded for ' + table)
          if (callBack) {callBack()}
        })
      }, 1)
    },
    createRawTable: function (table, callBack) {
      db.execute('CREATE TABLE IF NOT EXISTS ' + table + ' ( id integer primary key )', function (results) {
        db.execute('select * from ' + table + ' limit 1', function (results) {
          if (results.rows.length == 0) {
            db.insert(table, ['id'], [0], function () {
              console.log('>>>>>> Table "' + table + '" created successfully')
              if (callBack) {callBack()}
            }, 1)
          } else {
            if (callBack) {callBack()}
          }
        }, 1)
      }, 1)
    },
    addColumns: function (table, fieldsObj, defaultValues, callBack) {
      db.execute('select * from ' + table + ' limit 1', function (results) {
        var newColumns = [],
            sqlStrings = []

        for (var f in fieldsObj) {
          if (results.rows.length && !results.rows.item(0).hasOwnProperty(f)) {
            newColumns.push(f)
            defaultValue = defaultValues[f] || '""'
            sqlStrings.push('ALTER TABLE ' + table + ' ADD COLUMN ' + f + ' ' + fieldsObj[f] + ' DEFAULT ' + defaultValue)
          }
        }
        db.executeTransaction(sqlStrings, undefined, function () {
          if (newColumns.length > 0) {
            console.log('>>>>>> Columns created successfully: ' + newColumns.join(', ') + ' (' + table + ')')
          }
          if (callBack) {callBack()}
        }, 1)
      }, 1)
    },
    loadFromRemoteServer: function (url, callBack) {
      var self = this,
          errors = 0,
          sufix = '.json'

      console.log('>> Fetching data from: ' + url + sufix)
      $http.get( url + sufix)
      .success(function (data) {
        callBack(data)
        console.log('>> Fetched data from: ' + url + sufix)
      })
      .error(function (error) {
        db.postError({message: 'Error fetching data: ' + error})
        console.error('!!! Error fetching data: ' + error)
        errors += 1
      })
    },
    postError: function (data) {
      // var query = 'message=' + data.message
      // if (window.device) { query += ' [origin=' + device.name + '-' + device.model + ']'}
      // $http.get( remoteHost + '/mobile_errors?' + query )
      // .success(function (data) {
      //   console.log('Error logged')
      // })
      // .error(function (error) {
      //   console.error('Error logging error')
      // })
    },
    select: function (table, collection, id, callBack, verbose) {
      var sqlString = 'select * from ' + table + (id ? " where id = '" + id + "'" : '')
      this.execute(sqlString, function (results) {
        for (var i=0; i<results.rows.length; i++) {
          collection.push(results.rows.item(i))
        }
        if (callBack) {callBack()}
      }, verbose)
      return collection
    },
    stringForInsert: function (table, fields, values, callBack, verbose) {
      return 'insert into ' + table + ' (' + fields.join(',') + ') values ("' + values.join('","') + '")'
    },
    insert: function (table, fields, values, callBack, verbose) {
      var sqlString = db.stringForInsert(table, fields, values, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    stringForUpdate: function (table, fields, values, id, callBack, verbose) {
      var sqlString = 'update ' + table + ' set '
      fields.forEach(function (field, index) {
        sqlString += field + ' = "' + values[index] + '"' + (index + 1 == fields.length ? ' ' : ', ')
      })
      sqlString += 'where id = "' + id + '"'
      return sqlString
    },
    update: function (table, fields, values, id, callBack, verbose) {
      var sqlString = db.stringForUpdate(table, fields, values, id, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    insertOrUpdateCollection: function (table, fields, data, existingIds, collection, verbose) {
      array = []

      data.forEach(function (d) {
        d.categoryId = d.category_id
        var values = fields.map(function (f) {return d[f]})
        if (existingIds.has(Number(d.id))) {
          array.push(db.stringForUpdate(table, fields, values, d.id, undefined, verbose))
        } else {
          values.id = d.id
          array.push(db.stringForInsert(table, fields, values, undefined, verbose))
          collection.push(d)
        }
      })

      db.executeTransaction(array, undefined, undefined, verbose)
    },
    insertIntoCollection: function (sqlString, collection, callBack, verbose) {
      array = []

      db.execute(sqlString, function (r) {
        for (i = 0; i < r.rows.length; i++) {
          collection.push(r.rows.item(i))
        }

        if (callBack) callBack()
      }, verbose)
    },
    delete: function (table, ids, verbose) {
      var sqlString = 'delete from ' + table + (ids ? ' where id in (' + ids + ')' : '')
      this.execute(sqlString, undefined, verbose)
    },
    executeTransaction: function (sqlStrings, executionCallBack, transactionCallBack, verbose) {
      verbose = verbose

      angular.db.transaction(function (tx) {
        sqlStrings.forEach(function (sqlString) {
          if (verbose > 1) {
            console.log('Executing query' + (verbose > 2 ? ': ' + sqlString : ''))
          }
          tx.executeSql(sqlString,[], function (tx, results) {
            var lines = (results.rowsAffected ? results.rowsAffected + ' affected' : results.rows.length) + ' lines'
            if (verbose > 1) {
              console.log('Query executed successfully (' + lines + ')' + (verbose > 2 ? ': ' + sqlString : ''))
            }
            if (executionCallBack) {executionCallBack(results)}
          }, function (tx, error) {
            db.postError({message: 'Error fetching data: ' + error.message})
            console.error('!!! Error executing query: ' + error.message)
          })
        })
      }, function (e) {console.log(e)}, transactionCallBack )
    },
    execute: function (sqlString, callBack, verbose) {
      db.executeTransaction([sqlString], callBack, undefined, verbose)
    },
    executeAndLog: function (sqlString, verbose) {
      db.execute(sqlString, function (r) {for (i=0;i<r.rows.length;i++) {console.log(r.rows.item(i))}}, verbose)
    },
    recreateDB: function (callBack) {
      console.log('>>>> Recreating DB')
      db.execute('DROP TABLE holidays', function () {
        db.execute('CREATE TABLE holidays ( id integer primary key )', function () {
          db.execute('DROP TABLE events', function () {
            db.execute('CREATE TABLE events ( id integer primary key )', function () {
              console.log('>>>> DB recreated successfully')
              if (callBack) {callBack()}
            })
          })
        })
      })
    }
  }
})

Array.prototype.has = function (element) { return this.indexOf(element) > 0 }
Date.prototype.toShortString = function () { return this.getDate() + '/' + (this.getMonth() + 1) }
Date.prototype.addDays = function (days) {
  return new Date(this.setDate(this.getDate()+days))
}
