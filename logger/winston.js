var winston = require('winston');
var dateformat = require('dateformat');

var level = (process.env.LOG_LEVEL || 'info').toLowerCase();

function emptyObject(x) {
  return (x instanceof Object) && !(x instanceof Array) && (Object.keys(x).length === 0);
}

function metaString(meta) {
  if (typeof meta === 'string') {
    return meta;
  }

  if (emptyObject(meta)) {
    return '';
  }

  // for development environment, print on multiple lines for readability
  // for production environment, print on single line for grepping
  if (/^dev/.test(process.env.NODE_ENV)) {
    return ' ' + JSON.stringify(meta, null, 2);
  } else {
    return ' ' + JSON.stringify(meta);
  }
}

module.exports = function(source) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: level,
        json: false,
        colorize: true,
        stderrLevels: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
        timestamp: () => dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        formatter: (options) => {
          var LEVEL = options.level.toUpperCase();
          var prefix = `[${ options.timestamp() }] ${ ' '.repeat(Math.max(7 - LEVEL.length, 0)) }${ LEVEL }:${ source }${ ' '.repeat(Math.max(15 - source.length, 0)) }`
          prefix = winston.config.colorize(options.level, prefix);
          return `${ prefix } ${ options.message }` + metaString(options.meta);
        }
      })
    ]
  });
}
