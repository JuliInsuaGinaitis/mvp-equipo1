const { check, body } = require('express-validator');
const userData = require('../data/user')




module.exports = [check('email').isEmail().withMessage('El email debe ser un email valido'),
    check('password').isLength({ min: 6, max: 20 }).withMessage('La contraseña debe contener minimo 6 caracteres y máximo 20'),

    //body('email').custom(function(value){

    // let user = userData.findByEmail(value)

    //if(user){
    //  throw new Error('El email ya se encuentra registrado');

    //}
    //return true
    //}),




];