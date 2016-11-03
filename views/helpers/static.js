var hbs = require('hbs');

function hbsHelpers(app) {
  return hbs.registerHelper('static', function(file) {
    if (app.get('env') === 'development') {
      return file;
    } else {
      return require('../../assets.json')[file];
    }
  });
}

module.exports = hbsHelpers;
