var debug = require('debug');


if (process.env.DEBUG === undefined) {
  debug.enable('nile-ui:*')
}


module.exports = function(name) {
  var logger = {};

  [
    'VERBOSE',
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL'
  ].forEach((level) => {
    level = level.toLowerCase();
    var LEVEL = level.toUpperCase();

    logger[level] = logger[LEVEL] = debug(`nile-ui:${name}:${LEVEL}`);
  });

  return logger;
}
