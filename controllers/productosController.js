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
        let product = productsList.products.find(function(product) {
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
    }




};

module.exports = controlador;