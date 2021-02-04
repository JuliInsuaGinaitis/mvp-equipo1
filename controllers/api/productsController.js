let db= require("../../database/models")

let productsApiController = {

    list (req, res, next) {

        db.Products.findAll({
            attributes: ["id", "name", "description", "main_category_id"]
        }).then(function (products) {
            
            products.forEach( function(product){
                product.setDataValue ("detail", "/api/products/" + product.id)
            
              
            });
             //console.log(products[0])
            function contador (main_category_id) {

           return  products.reduce((acumulador,p) =>  acumulador + (p.main_category_id == main_category_id),0)}
            
            

            let respuesta = {
                meta: {
                    status: 200,
                    totalProducts: products.length,
                    url: "/api/products",
                    countByCategory:{
                        bateriaPercusion:contador(1),
                        cuerdas:contador(2),
                        pianosTeclados:contador(3),
                        sonido:contador(4),
                        viento:contador(5),

                    }
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
                    totalProducts: products.length,
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