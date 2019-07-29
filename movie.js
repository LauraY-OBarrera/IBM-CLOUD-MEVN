var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MoviesSchema = new Schema({
  title: String,
  director:String,
  year: String,
  description: String
});

var model = mongoose.model('Movie', MoviesSchema);

module.exports = model ;
