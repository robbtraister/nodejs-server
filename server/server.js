var express = require('express');
var exphbs = require('express-handlebars');


var logger = require('../logger')('server:index');


var server = module.exports = function server(router, port) {
  var server = express();

  server.engine('hbs', exphbs({layoutsDir: `${__dirname}/views/layouts`, defaultLayout: 'html', extname: '.hbs'}));
  server.set('views', `${__dirname}/views`);
  server.set('view engine', 'hbs');

  server.use(router);

  port = port || process.env.PORT || 8080;
  server.listen(port);
  logger.info(`Listening on port: ${port}\n`);

  return server;
};
