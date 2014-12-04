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

  hoodie.task.on('lookup:add', <%= generatorName %>.lookup);
  hoodie.task.on('follow:add', <%= generatorName %>.follow);
  hoodie.task.on('unfollow:add', <%= generatorName %>.unfollow);
  hoodie.task.on('post:add', <%= generatorName %>.post);
  hoodie.task.on('getpost:add', <%= generatorName %>.getPost);
  hoodie.task.on('updatepost:add', <%= generatorName %>.updatePost);
  hoodie.task.on('deletepost:add', <%= generatorName %>.deletePost);
  hoodie.task.on('comment:add', <%= generatorName %>.comment);
  hoodie.task.on('updatecomment:add', <%= generatorName %>.updateComment);
  hoodie.task.on('deletecomment:add', <%= generatorName %>.deleteComment);
  hoodie.task.on('count:add', <%= generatorName %>.count);
  hoodie.task.on('uncount:add', <%= generatorName %>.uncount);
  hoodie.task.on('feed:add', <%= generatorName %>.feed);
  hoodie.task.on('getprofile:add', <%= generatorName %>.getProfile);
  hoodie.task.on('updateprofile:add', <%= generatorName %>.updateProfile);
  hoodie.task.on('share:add', <%= generatorName %>.sharePost);

  hoodie.account.on('change', <%= generatorName %>.addProfileEachUser);

  callback();
};
