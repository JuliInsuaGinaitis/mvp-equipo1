module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Categories", {
    
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name:{
    type: DataTypes.STRING
    },
    
},
{
        timestamps : false,
}) 

Category.associate = function(models){
    Category.hasMany(models.Users,{

       as:"users" ,
       foreignKey:"category_id"
    })
}



    return Category;
    }