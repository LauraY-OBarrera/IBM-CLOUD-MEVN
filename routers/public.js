var express = require('express');

module.exports = function(app){
  var router = express.Router();
  router.use(express.static(process.cwd() + '/dist'));
  app.use(router);
}
