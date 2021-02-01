let db = require("../../database/models");
const { detail } = require("../productosController");



let usersApiController = {


    list (req, res, next) {

        db.Users.findAll({
           attributes: ["id", "name", "email"]
            
        }).then(function (users) {
            let respuesta = {
                meta: {
                    status: 200,
                    total: users.length,
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
                    total: users.length,
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