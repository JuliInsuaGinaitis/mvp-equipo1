module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("Users", {
    
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name:{
    type: DataTypes.STRING
    },
    email:{
    type: DataTypes.STRING
    },
    password:{
    type: DataTypes.STRING
    },
    file:{
    type: DataTypes.STRING
    },
    
    
},
{
        timestamps : false,
}) 
    
User.associate = function(models){
    User.belongsTo(models.Categories,{

       as:"categories" ,
       foreignKey:"category_id"
    })
}

return User;
    }