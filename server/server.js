var express = require('express');
var exphbs = require('express-handlebars');


var server = module.exports = function server(router, port) {
  var server = express();

  server.engine('hbs', exphbs({layoutsDir: `${__dirname}/views/layouts`, defaultLayout: 'main', extname: '.hbs'}));
  server.set('views', `${__dirname}/views`);
  server.set('view engine', 'hbs');

  server.use(router);

  port = port || process.env.PORT || 8080;
  server.listen(port);
  process.stderr.write(`Listening on port: ${port}\n`);

  return server;
};
