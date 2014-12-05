/**
 * Hoodie plugin <%= generatorName %>
 * Lightweight and easy <%= generatorName %>
 */

/* global Hoodie */

Hoodie.extend(function (hoodie) {
  'use strict';

  function partialRight(fn /*, args...*/) {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;
    // Convert arguments object to an array, removing the first argument.
    var args = slice.call(arguments, 1);

    return function () {
      // Invoke the originally-specified function, passing in all just-
      // specified arguments, followed by any originally-specified arguments.
      return fn.apply(this, slice.call(arguments, 0).concat(args));
    };
  }

  hoodie.<%= generatorName %> = {

//YO[HOODIE-PLUGIN]

  };
  // Alias partial
  //hoodie.<%= generatorName %>.alias = partialRight(hoodie.<%= generatorName %>.method, 'argument');

});
