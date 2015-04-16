var conf = {
  routerPattern: '**/*.router.js',
  strategyPattern: 'server/strategies/**/*.js',
  modelPattern: '**/*.model.js'
};

/**
 * Conventions for locating parts of the client and server
 *
 * @param config Object with matching configuration
 */
exports.config = function(config) {

};

var glob = require('glob'),
    path = require('path'),
    routers = [],
    strategies = [],
    models = [];

exports.routers = function(dirname) {
  if (dirname) {
    routers = glob.sync(conf.routerPattern).map(function(to) {
      return './' + path.relative(dirname,to);
    });
  }

  return routers;
};

exports.strategies = function(dirname) {
  if (dirname) {
    strategies = glob.sync(conf.strategyPattern).map(function(to) {
      return './' + path.relative(dirname,to);
    });
  }

  return strategies;
};

exports.models = function(dirname) {
  if (dirname) {
    models = glob.sync(conf.modelPattern).map(function(to) {
      return './' + path.relative(dirname, to);
    });
  }

  return models;
};

exports.callCommandWithConfig = function(cmdObject, defaultConfig) {
  var cmd = process.argv[2]; // after the script name whether called with hashbang, --debug or just node [node,server.js,cmd]
  if (cmd in cmdObject) {
    var config = defaultConfig;
    //TODO check other argv for config tweaks
    cmdObject[cmd](config);
  }
};
