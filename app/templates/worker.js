/**
 * Hoodie plugin <%= generatorName %>
 * Lightweight and easy <%= generatorName %>
 */

/**
 * Dependencies
 */
var <%= capitalizeName %> = require('./lib');


/**
 * <%= capitalizeName %> worker
 */

module.exports = function (hoodie, callback) {
  var <%= generatorName %> = new <%= capitalizeName %>(hoodie);

//YO[HOODIE-PLUGIN]

  hoodie.account.on('change', <%= generatorName %>.addProfileEachUser);

  callback();
};
