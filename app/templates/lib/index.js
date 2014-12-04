var <%= capitalizeName %>Api = require('./<%= generatorName %>');
var Db = require('./db');
var _ = require('underscore');
var async = require('async');
var ExtendedDatabaseAPI = require('hoodie-utils-plugins').ExtendedDatabaseAPI;

module.exports = function (hoodie) {
  var <%= generatorName %> = {};
  var usersDb = new ExtendedDatabaseAPI(hoodie, hoodie.database('_users'));
  var pluginDb = new Db(hoodie, 'plugins/<%= appname %>', usersDb);

  /**
   * PubSub dbName
   */

  <%= generatorName %>.addProfileEachUser = function (_doc) {
    if (_doc.roles && _doc.roles.indexOf('confirmed') >= 0) {
      var userDbName = 'user/' + _doc.hoodieId;
      var userDb = new ExtendedDatabaseAPI(hoodie, hoodie.database(userDbName));

      async.series([
        async.apply(pluginDb.profileDoc, hoodie, userDb, userDbName)
      ],
      function (err) {
        if (err) console.log('<%= capitalizeName %>.addProfileEachUser:', err);
      });
    }
  };

  _.extend(<%= generatorName %>,  new <%= capitalizeName %>Api(hoodie, pluginDb, usersDb));


  return <%= generatorName %>;
};
