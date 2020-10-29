const controlador = {
    listadoProductos:(req,res)=> {
        res.render('products');
    },
    index:(req,res)=> {
        res.render('index');
    },
    
    cart:(req,res)=> {
        res.render('productCart');
    },

    detail:(req,res)=> {
        res.render('productDetail');
    },

    register:(req,res)=> {
        res.render('register');
    },
    login:(req,res)=> {
        res.render('login');
    },
    contact:(req,res)=> {
        res.render('contact');
    },



};

module.exports = controlador;
