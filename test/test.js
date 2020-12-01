const { findByEmail } = require('../data/user.js');
const user = require('../data/user.js');
let bcrypt = require('bcrypt')


//let encontrado = user.findByEmail('danielamombiela@live.com.ar')



let nuevoUsuario = {

    email: 'oooooa@aa.com.ar',
    password: bcrypt.hashSync('hola', 10)
}

user.create(nuevoUsuario)

let encontrado = user.findById(7);

console.log(encontrado);