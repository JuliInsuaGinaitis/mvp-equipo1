var express = require('express');
var router = express.Router();
const controlador = require ('../controllers/productosController.js');

router.get('/', controlador.index);

router.get('/register', controlador.register );

router.get('/login', controlador.login);

router.get('/contact', controlador.contact);

router.get('/productCart', controlador.cart);

router.get('/productDetail', controlador.detail);

module.exports = router;
