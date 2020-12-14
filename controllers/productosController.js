const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsList = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const userData = require('../data/user');
let db= require("../database/models")


const controlador = {
    listadoProductos: (req, res) => {

        res.render('productList', { productsList: productsList.products }); // listado Productos //
    },
    index: (req, res) => {
        res.render('index', { productsList: productsList.products }); // Home //
    },

    cart: (req, res) => {
        res.render('productCart');
    },

    detail: (req, res) => {
        let product = productsList.products.find(function(product) {
            return req.params.id == product.id;

        })
        console.log(productsList);

        res.render('productDetail', { product }); // detalle de cada producto//
    },

    register: (req, res) => {
        res.render('register', { data: {} });
    },
    createUser: (req, res) => {

        var filename = req.files.map(function(file) {
            return "/images/products/" + file.filename.toString();
        });

        let errors = validationResult(req)
        if (!errors.isEmpty()) {

            return res.render('register', { errors: errors.errors, data: req.body })
        }


        userData.create({
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            confirmPassword: bcryptjs.hashSync(req.body.confirmPassword, 5),
            image: filename

        })
        res.render('createUser');
    },




    login: (req, res) => {
        res.render('login', { data: {} });
    },

    processLogin: (req, res) => { // RECORREMOS EL JSON DE USER, Y VEMOS SI MATCHEA LO QUE VIENE DEL FORM CON ALGUN DATO EN EL JSON, ASI ESTARIAMOS VALIDANDO UN LOGIN//

        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.render('login', { errors: errors.errors, data: req.body })
        }

        let user = userData.findByEmail(req.body.email)
        if (!user) {
            return res.render('login', { errors: [{ msg: 'El email es incorrecto' }] })
        } else if (bcryptjs.compareSync(req.body.password, user.password)) {
            //console.log(session)
            req.session.user = user
            console.log(req.session.user)

            return res.redirect('/productList')

        } else {
            return res.render('login', { errors: [{ msg: 'La contraseña es incorrecta' }] })
        }



    },


    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/')
    },


    contact: (req, res) => {
        res.render('contact');
    },

    // controladores formulario ADMIN //
    createproducts: (req, res) => {

        res.render('createProducts');
    },
    confirmcreate: (req, res, next) => {
        // Guardo el nombre de la imagen


        var filename = req.files.map(function(file) {
            return "/images/products/" + file.filename.toString();
        });


        productsList.products.push({
            id: productsList.products[productsList.products.length - 1].id + 1,
            image: filename,
            ...req.body
        });


        productsJSON = JSON.stringify(productsList);

        fs.writeFileSync(productsFilePath, productsJSON); // Escribe en el json?? //


        console.log(req.body)

        res.redirect('/productList')
    },


    editproducts: (req, res) => {
        res.render('editProducts', { productsList: productsList, id: req.params.id - 1 });
    },
    confirmedit: (req, res) => {


        var filename = req.files.map(function(file) {
            return "/images/products/" + file.filename.toString();
        });
        // recupero los datos del form//
        productsList.products.forEach(function(product) {
            if (product.id == req.params.id) {
                //console.log(product)
                product.brand = req.body.brand;
                product.name = req.body.name;
                product.price = req.body.price;
                product.discount = req.body.discount;
                product.mainCategory = req.body.mainCategory;
                product.subCategory = req.body.subCategory;
                product.description = req.body.description;
                product.image = filename;
            }
        });
        // los empaqueto en un JSON
        productsJSON = JSON.stringify(productsList);


        // Escribimos nuevamente el archivo productsDataBase.json
        fs.writeFileSync(productsFilePath, productsJSON);

        //console.log(req.body)
        res.redirect('/productList');


    },
    //NO HAY BOTON DELETE!!!!!//
    destroy: (req, res) => {
        // Aca buscamos y borramos//
        let afterDelete = productsList.products.filter(function(product) {
            return product.id != req.params.id;
        })

        let producto = { products: afterDelete }
            // los empaqueto en json
        productsJSON = JSON.stringify(producto);


        fs.writeFileSync(productsFilePath, productsJSON);
        //console.log(JSON.stringify(req.params.id))
        console.log('se elimino el producto ', req.params.id) // muestra por consola lo eliminado
        res.redirect('/productList')
    },
    
    prueba: function (req,res){

        db.Products.findAll().then(function(Product){
        
        res.render('prueba', {Product:Product})
        })
        },




};

module.exports = controlador;