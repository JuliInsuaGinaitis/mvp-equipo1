let db= require("../../database/models")

let productsApiController = {

    list (req, res, next) {

        db.Products.findAll({
           
        }).then(function (products) {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/products"
                },
                data: products
            }
            return res.json(respuesta);
        })
        .catch (e => console.log(e))
    },
    
    
    detail: (req, res) => {
        
        db.Products.findByPk(req.params.id)
        .then(function (products) {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/products/id"
                },
                data: products
            }
            return res.json(respuesta);
        })
        .catch (e => console.log(e))
    },
    
}



module.exports = productsApiController