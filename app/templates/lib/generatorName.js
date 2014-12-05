/**
 * Dependencies
 */

var utils = require('hoodie-utils-plugins');
var async = require('async');
var ExtendedDatabaseAPI = require('hoodie-utils-plugins').ExtendedDatabaseAPI;

module.exports = function (hoodie, pluginDb, userDb) {
  var <%= capitalizeName %> = this;

//YO[HOODIE-PLUGIN-PRIVATE]

  var _setAttrs = function (task, attr, cb) {
    if (!attr || !task[attr]) {
      return cb('Pls, fill the param: ' + attr);
    }
    task.subject = 'post';
    cb();
  };

//YO[HOODIE-PLUGIN]

  return <%= capitalizeName %>;
};
