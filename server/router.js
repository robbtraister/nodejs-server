var express = require('express');


var router = module.exports = function router(config) {
  var router = express.Router();

  return router;
};


if (module === require.main) {
  require('./server')(router());
}

