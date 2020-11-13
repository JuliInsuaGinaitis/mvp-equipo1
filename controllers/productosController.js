const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsList = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
        let product = productsList.products.find(function(product){
            return req.params.id == product.id;
            
        })
        console.log(productsList);

        res.render('productDetail', { product }); // detalle de cada producto//
    },

    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    },
    contact: (req, res) => {
        res.render('contact');
    },

    // controladores formulario ADMIN //
    createproducts: (req, res) => {

        res.render('createProducts');
    },
    confirmcreate: (req, res) => {
        console.log(req.body)
        res.send('VA POR POST!!!!');
    },
    editproducts: (req, res) => {
        res.render('editProducts');
    },
    confirmedit: (req, res) => {
        console.log(req.body)
        res.send('VA POR PUT!!!!');
    }






};

module.exports = controlador;