var express = require('express');
var router = express.Router();

const fs = require('fs');
const fsExtra = require('fs-extra');

var demoDeck = {
  refId: 'hoppa123',
  slides: [ {} ]
};

fsExtra.emptyDir('public/store')
.then(() => {
  console.log('emptyDir success!');
})
.catch(err => {
  console.error(err);
});

router.get('/', function (req, res) {
  res.render('deck', { title: 'Hey', message: 'Hello there!' })
});

router.post('/:deck/:file', function (req, res) {
  const deck = req.params.deck;
  const fileName = req.params.file;

  // Create deck document in db
  // Return check-in ID

  var wstream = fs.createWriteStream(`public/store/${deck}-${fileName}`);
  wstream.on('finish', function() {
    // save image to storage
    // write reference of slides to db
    demoDeck.slides.push(`${deck}-${fileName}`); // TODO: no guarenteed order
    res.send({
      deck: demoDeck.refId
    });
  });

   req.on('data', function (data) {
      wstream.write(data);
   });

   req.on('end', function () {
      wstream.end();
   });
});

router.post('/:deck/slide/current', function (req, res) {
  console.log(req.body.current);
  demoDeck.current = req.body.current;
  res.send({
    deck: demoDeck.refId
  });
});

router.get('/:deck/slide/current', function (req, res) {
  const currentSlide = demoDeck.current && demoDeck.current !== 0 ? demoDeck.slides[demoDeck.current] : undefined;
  res.send({
    current: currentSlide
  });
});

module.exports = router;
