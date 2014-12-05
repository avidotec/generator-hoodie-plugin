'use strict';
var yeoman = require('yeoman-generator'),
  async = require('async');


var MethodGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.generatorName = this.config.get('generatorName');
    this.capitalizeName = this.config.get('capitalizeName');
    if (!this.generatorName) {
      console.error('Go to root path of your hoodie-plugin');
      process.exit(1);
    }
  },
  initializing: function () {

    this.argument('methodName', {
      required: true,
      type: String,
      desc: 'The Method name'
    });

    this.log('You called the HoodiePlugin methods with the argument: [' + this.methodName + '].');
  },

  writing: function () {
    var templates = [
      {
        file: 'worker.js',
        block: [
          {
            ref: "//YO[HOODIE-PLUGIN]",
            code: "\thoodie.task.on('" + this.methodName + ":add', " + this.generatorName +"." + this.methodName + ");"
          }
        ]
      },
      {
        file: 'hoodie.' + this.generatorName + '.js',
        block: [
          {
            ref: "//YO[HOODIE-PLUGIN]",
            code: [
              "\t\t"+this.methodName+": function ("+this.methodName+"Object) {",
              "\t\t\tvar defer = window.jQuery.Deferred();",
              "\t\t\thoodie.task('"+this.methodName+"').start({"+this.methodName+"Object: "+this.methodName+"ObjectPost})",
              "\t\t\t\t.then(defer.resolve)",
              "\t\t\t\t.fail(defer.reject);",
              "\t\t\treturn defer.promise();",
              "\t\t},"
            ].join('\n')
          }
        ]
      },
      {
        file: 'lib/' + this.generatorName + '.js',
        block: [
          {
            ref: "//YO[HOODIE-PLUGIN]",
            code: [
              "\t\t"+this.capitalizeName+"."+this.methodName+" = function (db, task) {",
              "\t\t\tasync.series([",
              "\t\t\t\t\tasync.apply(_setAttrs, task, 'userName'),",
              "\t\t\t\t\tasync.apply(_"+this.methodName+", task)",
              "\t\t\t\t],",
              "\t\t\t\tutils.handleTask(hoodie, '"+this.methodName+"', db, task)",
              "\t\t\t);",
              "\t\t};"
            ].join('\n')
          },
          {
            ref: "//YO[HOODIE-PLUGIN-PRIVATE]",
            code: [
              "\tvar _"+this.methodName+" = function (task, cb) {",
              "\t\t// Do Something",
              "\t\tcb();",
              "\t};",
            ].join('\n')
          }
        ]
      }
    ];
    var self = this;
    templates.forEach(function (_code) {
      addBlock.call(self, _code.file, _code.block);
    });
    // this.fs.copy(
    //   this.templatePath('somefile.js'),
    //   this.destinationPath('somefile.js')
    // );
  }
});

function addBlock(file, blockArray) {
    var indexFile = this.readFileAsString(file);

    blockArray.forEach(function (block) {
      var newMethod = [
          block.code,
          block.ref
       ];
      indexFile = indexFile.replace(block.ref, newMethod.join('\n'));
    })

    this.write(file,indexFile);
};
