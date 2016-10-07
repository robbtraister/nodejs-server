var cluster = require('cluster');

var logger = require('../logger')('cluster:master');


var workerCount = process.env.hasOwnProperty('WORKERS') ? Number(process.env.WORKERS) || require('os').cpus().length : 1;


if (workerCount === 1) {
  require('./worker');
} else {
  logger.info('Starting workers:', workerCount);

  for (var w=0; w<workerCount; w++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
}
