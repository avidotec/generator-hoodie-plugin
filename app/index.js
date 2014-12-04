'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var url = require('url');
var npmName = require('npm-name');
var superb = require('superb');
var _ = require('lodash');
var _s = require('underscore.string');
var which = require('which');
var spawn = require('child_process').spawn;


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
          var name = answers.generatorName;
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
    processtemplatedirectoryandcopy: function () {
      this.directory('');
    },


    // projectfiles: function () {
    //   // this.template('_package.json', 'package.json');
    //   // this.template('editorconfig', '.editorconfig');
    //   // this.template('jshintrc', '.jshintrc');
    //   //this.template('_travis.yml', '.travis.yml');
    //   //this.template('README.md');
    // },

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
