const { check, body } = require('express-validator');
const userData = require('../data/user')






module.exports = [

    check('name').isLength({ min: 2 }).withMessage('Ingrese su nombre'),
    check('email').isEmail().withMessage('El email debe ser un email valido'),
    check('password').isLength({ min: 6, max: 20 }).withMessage('La contraseña debe contener minimo 6 caracteres y máximo 20'), check('confirmPassword').isLength({ min: 6, max: 20 }).withMessage('La contraseña debe coincidir'),

    body('email').custom(function(value) {

        let user = userData.findByEmail(value)

        if (user) {
            throw new Error('El email ya se encuentra registrado');

        }
        return true
    }),
    body('name').custom(function(value) {

        let user = userData.findByName(value)

        if (user) {
            throw new Error('El nombre y apellido ya se encuentran registrados');

        }
        return true
    }),


];