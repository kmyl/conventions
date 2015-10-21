var conf = {
    routerPattern: '**/*.router.js',
    strategyPattern: 'server/strategies/**/*.js',
    modelPattern: '**/*.model.js'
  },
  globOpts = {};

/**
 * Conventions for locating parts of the client and server
 *
 * Pass `cwd` for globbing in another working directory
 *
 * @param config Object with matching configuration
 */
exports.config = function(config) {
  var cwd = config.basedir || config.cwd || config.root;
  if (cwd) {
    globOpts.cwd = cwd;
  }
};

var glob = require('glob'),
    path = require('path'),
    routers = [],
    strategies = [],
    models = [];

function makeGlobOpts(dirname) {
  if (globOpts.cwd) {
    dirname = path.isAbsolute(dirname)? dirname : path.join(globOpts.cwd,dirname);
  }
  return { cwd: dirname };
}

exports.routers = function(dirname,load) {
  if (dirname) {
    var opts = makeGlobOpts(dirname);
    routers = glob.sync(conf.routerPattern,opts).map(function(to) {
      return './' + to.replace('\\','/');
    });
  }
  switch(typeof load) {
    case 'undefined':
      break; // no action
    case 'boolean':
      routers.forEach(function(loc) {
        require(path.join(opts.cwd,loc));
      });
      break;
    case 'function':
      routers.forEach(function(loc) {
        var mod = require(path.join(opts.cwd,loc));
        load(mod,loc);
      });
      break;
  }

  return routers;
};

exports.strategies = function(dirname, load) {
  if (dirname) {
    var opts = makeGlobOpts(dirname);
    strategies = glob.sync(conf.strategyPattern,opts).map(function(to) {
      return './' + to.replace('\\','/');
    });
  }
  switch(typeof load) {
    case 'undefined':
      break; // no action
    case 'boolean':
      routers.forEach(function(loc) {
        require(path.join(opts.cwd,loc));
      });
      break;
    case 'function':
      routers.forEach(function(loc) {
        var mod = require(path.join(opts.cwd,loc));
        load(mod,loc);
      });
      break;
  }

  return strategies;
};

exports.models = function(dirname, load) {
  if (dirname) {
    var opts = makeGlobOpts(dirname);
    models = glob.sync(conf.modelPattern,opts).map(function(to) {
      return './' + to.replace('\\','/');
    });
  }
  switch(typeof load) {
    case 'undefined':
      break; // no action
    case 'boolean':
      routers.forEach(function(loc) {
        require(path.join(opts.cwd,loc));
      });
      break;
    case 'function':
      routers.forEach(function(loc) {
        var mod = require(path.join(opts.cwd,loc));
        load(mod,loc);
      });
      break;
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
