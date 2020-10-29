var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/register', function(req, res, next) {
  res.render('register' );
});

router.get('/login', function(req, res, next) {
  res.render('login' );
});

router.get('/contact', function(req, res, next) {
  res.render('contact' );
});

router.get('/productCart', function(req, res, next) {
  res.render('productCart' );
});

router.get('/home', function(req, res, next) {
  res.render('index' );
});

router.get('/productDetail', function(req, res, next) {
  res.render('productDetail' );
});

router.get('/productList', function(req, res){
  res.render('productList');
});

module.exports = router;
