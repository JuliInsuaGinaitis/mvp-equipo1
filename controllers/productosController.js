const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const productsList = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const userData = require('../data/user');
let db= require("../database/models")
let sequelize = require ("sequelize")
const Op = sequelize.Op;

const controlador = {
    listadoProductos: (req, res) => {
        

            db.Products.findAll().then(function(Product){
            
            res.render('productList', {Product:Product})
            })
            
       
    },
    index: (req, res) => {
        res.render('index', { productsList: productsList.products }); // Home //
    },

    cart: (req, res) => {
        res.render('productCart');
    },

    finalcart: (req, res) => {
        res.render('finalProductCart');
    },

    detail: (req, res) => {
        
        db.Products.findByPk(req.params.id)
        .then(function(Product){
        
            res.render('DetalleProducto', {Product:Product})
            })
             },

    register: (req, res) => {
        res.render('register', { data: {} });
    },
    createUser: (req, res, next) => {

        //var filename = req.files.map(function(file) {
          //  return "/images/products/" + file.filename.toString();
        //});

        //let errors = validationResult(req)
        //if (!errors.isEmpty()) {

          //  return res.render('register', { errors: errors.errors, data: req.body })
        
        //}
db.Users.create({
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            file: req.files[0].filename

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

       let user = db.Users.findOne({
             where:{
                 email: req.body.email
           
                }
               
         }).then(function(user){
            //console.log(resultado)

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
    

}) .catch(error =>{
            console.log(error)
            res.send('error ')
        })
        


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
    confirmcreate: (req, res) => {
        
         
    
       
        db.Products.create({
            brand:req.body.brand,
            name:req.body.name,
            description:req.body.description,
            image: "/images/products/" + req.files[0].filename,
            price:req.body.price,
            final_price: req.body.final_price
            
        })
        .then(resultado =>{
         // console.log(req.files[0].filename)
            res.redirect('/productList') 
        })
        .catch(error =>{
            console.log(error)
            res.send('error')
        })
        
      
    },


    editproducts: (req, res) => {
       
    db.Products.findByPk(req.params.id)
    .then(function(product){
        res.render('editProducts', {product})
    })
    
    },
    confirmedit: (req, res) => {

        db.Products.update({
    brand:req.body.brand,
    name:req.body.name,
    description:req.body.description,
    image: "/images/products/" + req.files[0].filename,
    price:req.body.price,
    final_price: req.body.finalprice
},{
where: {
    id:req.params.id
}
}).then(function(resultado){
    res.redirect('/productList');
}).catch(function(error){
    console.log(error)
    res.send("Error")
})




       


    },
    
    destroy: (req, res) => {
        
        db.Products.destroy({
            where:{
id:req.params.id
            }
        })
        .then(function(resultado){
            res.redirect('/productList')
        //console.log(req.params.id)
        })
        .catch(function(error){
             console.log(error)
    res.send("Error")
        })
        
        
        
       
    },

   // VISTA Y MODIFICACION DE PERFIL //
    editprofile: (req, res) => {
       
        db.Users.findByPk(req.params.id)
        .then(function(user){
            res.render('editProfile', {user})
        })
        
        },
        updateprofile: (req, res, next) => {
         
          
          db.Users.update({
              
              
                
                name:req.body.name,
                email:req.body.email,
               file:req.files[0].filename
                
                
            },{
            where: {
                id:req.params.id
            }
            }).then(function(resultado){
                res.redirect('/productList');
            }).catch(function(error){
                console.log(error)
                res.send("Error")
            })
        }, 
    

         search (req, res) {

             db.Products.findAll({
                where: {
                    name: {
                        [Op.substring]: req.query.search
                    }
                },
                limit: 12
            }).then(function(products){


                return res.render('results', { products: products.sort(() => Math.random() - 0.5), search: req.query.search })
            })
    
            
        },

       
};

module.exports = controlador;