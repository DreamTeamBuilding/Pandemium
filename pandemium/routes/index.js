var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pandemium' });
});

//TODO changer cette route pour la placer sur "search"
router.get('/result', function(req, res, next) {
  res.render('result', { title: 'Pandemium - recherche' , maladie: 'Test de maladie'});
});

module.exports = router;
