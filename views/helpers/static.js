var hbs = require('hbs');

hbs.registerHelper('static', function(file) {
  //return require('../../assets.json')[file];
  return file;
});
