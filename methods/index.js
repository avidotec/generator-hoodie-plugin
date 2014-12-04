'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the HoodiePlugin subgenerator with the argument ' + this.name + '.');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('somefile.js'),
      this.destinationPath('somefile.js')
    );
  }
});

module.exports.addFlightRoutes = function addFlightRoutes() {
    var routeText = [
        "hoodie.task.on('lookup:add', <%= generatorName %>.lookup);",
        "//RouteInsertReference"
     ];
    var indexFile = this.readFileAsString('worker.js');
    indexFile = indexFile.replace('//RouteInsertReference',routeText.join('\n'));
    this.write('public/index.php',indexFile);
}
