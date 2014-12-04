'use strict';
var yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  path = require('path'),
  url = require('url'),
  npmName = require('npm-name'),
  superb = require('superb'),
  _ = require('lodash'),
  _s = require('underscore.string'),
  which = require('which'),
  spawn = require('child_process').spawn,
  fs = require('fs'),
  async = require('async');


var extractGeneratorName = function (appname) {
  var slugged = _s.slugify(appname);
  var match = slugged.match(/^hoodie-plugin-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.currentYear = (new Date()).getFullYear();
    var arr = which.sync('node').split('/');
    arr.pop();
    arr.pop();
    this.nodePath = arr.join('/');
  },

  prompting: {

    askForGeneratorName: function () {
      var done = this.async();
      var generatorName = extractGeneratorName(this.appname);

      var prompts = [{
        name: 'generatorName',
        message: 'What\'s the base name of your hoodie plugin?',
        default: generatorName
      }, {
        type: 'confirm',
        name: 'askNameAgain',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function (answers) {
          var done = this.async();
          var name = 'hoodie-plugin-' + answers.generatorName;
          npmName(name, function (err, available) {
            if (!available) {
              done(true);
            }

            done(false);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        if (props.askNameAgain) {
          return this.prompting.askForGeneratorName.call(this);
        }

        this.generatorName = props.generatorName;
        this.capitalizeName = _s.capitalize(this.generatorName);
        this.appname = 'hoodie-plugin-' + this.generatorName;

        done();
      }.bind(this));
    }
  },

  configuring: {
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }
      this.config.save();
    }
  },

  writing: {
    projectfiles: function () {
      this.template('hoodie.generatorName.js', 'hoodie.'+ this.generatorName + '.js');
      this.template('lib/generatorName.js', 'lib/'+ this.generatorName + '.js');
    },
    processtemplatedirectoryandcopy: function () {
      var exclude = ['hoodie.generatorName.js', 'lib/generatorName.js'];
      var source = '';
      var destination;
      var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
      var files = this.expandFiles('**', { dot: true, cwd: root });
      files = _.difference(files, exclude);
      destination = destination || source;
      if (typeof destination === 'function') {
        process = destination;
        destination = source;
      }
      var cp = this.copy;

      // get the path relative to the template root, and copy to the relative destination
      for (var i in files) {
        var dest = path.join(destination, files[i]);
        cp.call(this, path.join(root, files[i]), dest, process);
      }

    },


    // gitfiles: function () {
    //   //this.copy('gitattributes', '.gitattributes');
    //   //this.copy('gitignore', '.gitignore');
    // },

    // app: function () {
    //   this.superb = superb();
    //   //this.template('app/index.js');
    // },

    // templates: function () {
    //   // this.copy('editorconfig', 'app/templates/editorconfig');
    //   // this.copy('jshintrc', 'app/templates/jshintrc');
    //   // this.copy('_package.json', 'app/templates/_package.json');
    //   // this.copy('_bower.json', 'app/templates/_bower.json');
    // },

    // tests: function () {
      //this.template('test-app.js', 'test/test-app.js');
    // }
  },

  install: function () {
    // this.installDependencies({
    //   skipInstall: this.options['skip-install']
    // });
  }
});
