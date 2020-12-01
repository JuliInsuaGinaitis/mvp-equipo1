var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const controlador = require('../controllers/productosController.js');
const checkRegister = require('../middlewares/checkregister');
const checkLogin = require('../middlewares/checkLogin')
    //const {check} = require ('express-validator')//REQUERIMOS  para validar campos de los form//






//funcionamiento MULTER//

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/products')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })



router.get('/', controlador.index);

router.get('/register', controlador.register);
router.post('/register', upload.any(), checkRegister, controlador.createUser); //AGREGA USER//

router.get('/login', controlador.login);
router.post('/login', checkLogin, controlador.processLogin); // LOGEA AL CLIENTE/

router.get('/contact', controlador.contact);


router.get('/productCart', controlador.cart);

router.get('/productDetail/:id', controlador.detail); //se hace dinamica//

router.get('/productList', controlador.listadoProductos);

//ruta que muestra la CREACION DE PRODUCTOS + ruta que ENVÍA EL PRODUCTO CREADO///
router.get('/create', controlador.createproducts) //retorna una vista//

router.post('/create', upload.any(), controlador.confirmcreate) //redireccionamiento//


//ruta que muestra la EDICIÓN DE PRODUCTOS + ruta que ENVÍA EL PRODUCTO EDITADO//
router.get('/edit/:id', controlador.editproducts) //retorna una vista//

router.put('/edit/:id', upload.any(), controlador.confirmedit) //redireccionamiento//

// ruta delete //
router.delete('/delete/:id', controlador.destroy);










module.exports = router;