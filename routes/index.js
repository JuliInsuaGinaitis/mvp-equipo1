var express = require('express');
var router = express.Router();
const controlador = require('../controllers/productosController.js');

router.get('/', controlador.index);

router.get('/register', controlador.register);

router.get('/login', controlador.login);

router.get('/contact', controlador.contact);

router.get('/productCart', controlador.cart);

router.get('/productDetail', controlador.detail);

router.get('/productList', controlador.listadoProductos);

//ruta que muestra la CREACION DE PRODUCTOS//
router.get('/create', controlador.createproducts) //retorna una vista//
    //ruta que ENVÍA EL PRODUCTO CREADO//
router.post('/create', controlador.confirmcreate) //redireccionamiento//
    //ruta que muestra la EDICIÓN DE PRODUCTOS//
router.get('/:id/edit', controlador.editproducts) //retorna una vista//
    //ruta que ENVÍA EL PRODUCTO EDITADO//
router.put('/:id/actualizar', controlador.confirmedit) //redireccionamiento//











module.exports = router;
