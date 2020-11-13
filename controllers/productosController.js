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


        res.render('productDetail', { productsList: productsList.products, id: req.params.id - 1 }); // detalle de cada producto//
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
    confirmcreate: (req, res, next) => {
        // Guardo el nombre de la imagen


        var filename = req.files.map(function(file) {
            return file.filename.toString();
        });
        let producto = { //recupero los datos del form//
            id: productsList.length + 1,
            name: req.body.name,
            price: req.body.price,
            mainCategory: req.body.category,
            description: req.body.description,
            image: filename
        };


        productsList.products.push(producto);
        productsJSON = JSON.stringify(productsList);

        fs.writeFileSync(productsFilePath, productsJSON); // Escribe en el json?? //


        console.log(req.body)

        res.redirect('/')
    },


    editproducts: (req, res) => {
        res.render('editProducts', { productsList: productsList, id: req.params.id - 1 });
    },
    confirmedit: (req, res) => {


        var filename = req.files.map(function(file) {
            return file.filename.toString();
        });
        // recupero los datos del form//
        productsList.forEach(function(product) {
            if (product.id == req.params.id) {
                //console.log(producto)
                product.name = req.body.name;
                product.price = req.body.price;
                product.discount = req.body.discount;
                product.category = req.body.category;
                product.description = req.body.description;
                product.image = filename;
            }
        });
        // los empaqueto en un JSON
        productsJSON = JSON.stringify(productsList);


        // Escribimos nuevamente el archivo productsDataBase.json
        fs.writeFileSync(productsFilePath, productsJSON);

        //console.log(req.body)
        res.redirect('/');


    },
    //NO HAY BOTON DELETE!!!!!//
    destroy: (req, res) => {
        // Aca buscamos y borramos//
        let eliminar = productsList.filter(function(product) {
                return product.id != req.params.id;
            })
            // los empaqueto en json
        productsJSON = JSON.stringify(eliminar);


        fs.writeFileSync(productsFilePath, productsJSON);

        //console.log('se elimino el producto ' + req.params.id) // muestra por consola lo eliminado
        res.redirect('/')
    }




};

module.exports = controlador;