let db = require("../../database/models");
const { detail } = require("../productosController");



let usersApiController = {


    list (req, res, next) {

        db.Users.findAll({
           attributes: ["id", "name", "email"]
            
        }).then(function (users) {
            users.forEach( function(user){
                user.setDataValue ("detail", "/api/users/" + user.id)
            
                
            });
            let respuesta = {
                meta: {
                    status: 200,
                    totalUsers: users.length,
                    url: "/api/users"
                },
                data: users
            }
            return res.json(respuesta);
        })
        .catch(e => console.log(e))
    },
    detail (req, res, next) {

        db.Users.findByPk(req.params.id, 
            {attributes: ["id", "name", "email", "file"]})
        .then(function (users) {
            let respuesta = {
                meta: {
                    status: 200,
                    totalUsers: users.length,
                    url: "/api/users/id"
                },
                data: users
            }
            return res.json(respuesta);
        })
        .catch(e => console.log(e))
    }



}

module.exports = usersApiController