angular.module('badi-calendar.services', [])

.factory('Months', function() {
  var months = [
    {id: 1,  monthNumber: 1,  arabicName: "Bahá",      portugueseName: "Esplendor"},
    {id: 2,  monthNumber: 2,  arabicName: "Jalál",     portugueseName: "Glória"},
    {id: 3,  monthNumber: 3,  arabicName: "Jamál",     portugueseName: "Beleza"},
    {id: 4,  monthNumber: 4,  arabicName: "‘Aẓamat",   portugueseName: "Grandeza"},
    {id: 5,  monthNumber: 5,  arabicName: "Núr",       portugueseName: "Luz"},
    {id: 6,  monthNumber: 6,  arabicName: "Raḥmat",    portugueseName: "Miséricórdia"},
    {id: 7,  monthNumber: 7,  arabicName: "Kalimát",   portugueseName: "Palavras"},
    {id: 8,  monthNumber: 8,  arabicName: "Kamál",     portugueseName: "Perfeição"},
    {id: 9,  monthNumber: 9,  arabicName: "Asmá’",     portugueseName: "Nomes"},
    {id: 10, monthNumber: 10, arabicName: "‘Izzat",    portugueseName: "Potência"},
    {id: 11, monthNumber: 11, arabicName: "Mashíyyat", portugueseName: "Vontade"},
    {id: 12, monthNumber: 12, arabicName: "‘Ilm",      portugueseName: "Conhecimento"},
    {id: 13, monthNumber: 13, arabicName: "Qudrat",    portugueseName: "Poder"},
    {id: 14, monthNumber: 14, arabicName: "Qawl",      portugueseName: "Discurso"},
    {id: 15, monthNumber: 15, arabicName: "Masá’il",   portugueseName: "Perguntas"},
    {id: 16, monthNumber: 16, arabicName: "Sharaf",    portugueseName: "Honra"},
    {id: 17, monthNumber: 17, arabicName: "Sulṭán",    portugueseName: "Soberania"},
    {id: 18, monthNumber: 18, arabicName: "Mulk",      portugueseName: "Domínio",     htmlClass: "around-ayyamiha"},
    {id: 19, monthNumber: 18.5, arabicName: "Ayyám-i-Há", alternativeName: "5",         htmlClass: "ayyamiha"},
    {id: 20, monthNumber: 19, arabicName: "‘Alá’",     portugueseName: "Sublimidade", htmlClass: "around-ayyamiha"},
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

.factory('Holidays', function(DBService) {
  return {
    load: function(scope) {
      if(scope.resource == 'year') {
        var sqlString = "select count(id) as count, month from holidays where year = '" + scope.year + "' group by month"
      } else if (scope.resource == 'month') {
        var sqlString = "select count(id) as count, day from holidays where year = '" + scope.year + "' and month = '" + scope.month + "' group by day"
      } else {
        var sqlString = "select * from holidays where year = '" + scope.year + "' and month = '" + scope.month + "' and day = '" + scope.day + "'"
      }

      DBService.execute(sqlString, function(r){
        scope.holidays = {}
        for(i=0;i<r.rows.length;i++){
          if(scope.resource == 'day') {
            scope.holidays[r.rows.item(i)[scope.childResource]] = r.rows.item(i)
          } else {
            scope.holidays[r.rows.item(i)[scope.childResource]] = r.rows.item(i).count
          }
        }
        scope.holidays
      }, 1)
    }
  }
})

.service('DBService', function($http, $state) {
  db = this
  return {
    load: function(callBack, recreateDB) {
      db = this
      console.log('>> Preparing DB')
      angular.db = openDatabase('badi-calendar', '1.0', 'badi-calendar-db', 2 * 1024 * 1024)
      if(recreateDB) {
        db.recreateDB(function(){
          db.prepareDB(callBack)
        })
      } else {
        db.prepareDB(callBack)
      }
    },
    prepareDB: function(callBack){
      db.prepareSchema('holidays', {date: 'date', name: 'string', year: 'integer', month: 'integer', day: 'integer'}, {}, function(){
        console.log('>> DB Prepared')
        if(callBack){callBack()}
      })
    },
    prepareSchema: function(table, fieldsObj, defaultValues, callBack){
      console.log('>>>> Preparing schema for ' + table)
      db.createRawTable(table, function(){
        db.addColumns(table, fieldsObj, defaultValues, function(){
          console.log('>>>> Schema loaded for ' + table)
          if(callBack){callBack()}
        })
      }, 1)
    },
    createRawTable: function(table, callBack){
      db.execute('CREATE TABLE IF NOT EXISTS ' + table + ' ( id integer primary key )', function(results){
        db.execute('select * from ' + table + ' limit 1', function(results) {
          if(results.rows.length == 0){
            db.insert(table, ['id'], [0], function(){
              console.log('>>>>>> Table "' + table + '" created successfully')
              if(callBack){callBack()}
            }, 1)
          } else {
            if(callBack){callBack()}
          }
        }, 1)
      }, 1)
    },
    addColumns: function(table, fieldsObj, defaultValues, callBack){
      db.execute('select * from ' + table + ' limit 1', function(results) {
        var newColumns = [],
            sqlStrings = []

        for(var f in fieldsObj) {
          if(results.rows.length && !results.rows.item(0).hasOwnProperty(f)){
            newColumns.push(f)
            defaultValue = defaultValues[f] || '""'
            sqlStrings.push('ALTER TABLE ' + table + ' ADD COLUMN ' + f + ' ' + fieldsObj[f] + ' DEFAULT ' + defaultValue)
          }
        }
        db.executeTransaction(sqlStrings, undefined, function(){
          if(newColumns.length > 0) {
            console.log('>>>>>> Columns created successfully: ' + newColumns.join(', ') + ' (' + table + ')')
          }
          if(callBack){callBack()}
        }, 1)
      }, 1)
    },
    loadFromRemoteServer: function(url, callBack) {
      var self = this,
          errors = 0,
          sufix = '.json'

      console.log('>> Fetching data from: ' + url + sufix)
      $http.get( url + sufix)
      .success(function(data){
        callBack(data)
        console.log('>> Fetched data from: ' + url + sufix)
      })
      .error(function(error){
        db.postError({message: 'Error fetching data: ' + error})
        console.error('!!! Error fetching data: ' + error)
        errors += 1
      })
    },
    postError: function(data) {
      // var query = 'message=' + data.message
      // if(window.device) { query += ' [origin=' + device.name + '-' + device.model + ']'}
      // $http.get( remoteHost + '/mobile_errors?' + query )
      // .success(function(data){
      //   console.log('Error logged')
      // })
      // .error(function(error){
      //   console.error('Error logging error')
      // })
    },
    select: function(table, collection, id, callBack, verbose){
      var sqlString = 'select * from ' + table + (id ? " where id = '" + id + "'" : '')
      this.execute(sqlString, function(results) {
        for (var i=0; i<results.rows.length; i++) {
          collection.push(results.rows.item(i))
        }
        if(callBack){callBack()}
      }, verbose)
      return collection
    },
    stringForInsert: function(table, fields, values, callBack, verbose) {
      return 'insert into ' + table + ' (' + fields.join(',') + ') values ("' + values.join('","') + '")'
    },
    insert: function(table, fields, values, callBack, verbose) {
      var sqlString = db.stringForInsert(table, fields, values, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    stringForUpdate: function(table, fields, values, id, callBack, verbose) {
      var sqlString = 'update ' + table + ' set '
      fields.forEach(function(field, index){
        sqlString += field + ' = "' + values[index] + '"' + (index + 1 == fields.length ? ' ' : ', ')
      })
      sqlString += 'where id = "' + id + '"'
      return sqlString
    },
    update: function(table, fields, values, id, callBack, verbose){
      var sqlString = db.stringForUpdate(table, fields, values, id, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    insertOrUpdateCollection: function(table, fields, data, existingIds, collection, verbose) {
      array = []

      data.forEach(function(d){
        d.categoryId = d.category_id
        var values = fields.map(function(f){return d[f]})
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
    delete: function(table, ids, verbose) {
      var sqlString = 'delete from ' + table + (ids ? ' where id in (' + ids + ')' : '')
      this.execute(sqlString, undefined, verbose)
    },
    executeTransaction: function(sqlStrings, executionCallBack, transactionCallBack, verbose) {
      verbose = verbose

      angular.db.transaction(function(tx) {
        sqlStrings.forEach(function(sqlString){
          if(verbose > 1) {
            console.log('Executing query' + (verbose > 2 ? ': ' + sqlString : ''))
          }
          tx.executeSql(sqlString,[], function(tx, results) {
            var lines = (results.rowsAffected ? results.rowsAffected + ' affected' : results.rows.length) + ' lines'
            if(verbose > 1) {
              console.log('Query executed successfully (' + lines + ')' + (verbose > 2 ? ': ' + sqlString : ''))
            }
            if (executionCallBack){executionCallBack(results)}
          }, function(tx, error) {
            db.postError({message: 'Error fetching data: ' + error.message})
            console.error('!!! Error executing query: ' + error.message)
          })
        })
      }, function(e){console.log(e)}, transactionCallBack )
    },
    execute: function(sqlString, callBack, verbose){
      db.executeTransaction([sqlString], callBack, undefined, verbose)
    },
    executeAndLog: function(sqlString, verbose) {
      db.execute(sqlString, function(r){for(i=0;i<r.rows.length;i++){console.log(r.rows.item(i))}}, verbose)
    },
    recreateDB: function(callBack) {
      console.log('>>>> Recreating DB')
      db.execute('DROP TABLE holidays', function(){
        db.execute('CREATE TABLE holidays ( id integer primary key )', function(){
          console.log('>>>> DB recreated successfully')
          if(callBack){callBack()}
        })
      })
    }
  }
})

Array.prototype.has = function(element) { return this.indexOf(element) > 0}
