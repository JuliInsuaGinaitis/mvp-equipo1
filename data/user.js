const path = require('path')
const file = path.resolve(__dirname, './users.json')
let users = require(file);
let fs = require('fs');



function findById(id) {

    return users.find(function(user) {
        return user.id == id
    })
};

function findByEmail(email) {

    return users.find(function(user) {
        return user.email == email
    })
};

function findByName(name) {

    return users.find(function(user) {
        return user.name == name
    })
};



function create(user) {

    user.id = users.length + 1,
        users.push(user)
    fs.writeFileSync(file, JSON.stringify(users))
};

module.exports = {
    findById,
    findByEmail,
    findByName,
    create


}