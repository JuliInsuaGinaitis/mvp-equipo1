module.exports = (sequelize, DataTypes) => {

    const mainCategory = sequelize.define("MainCategories", {
    
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

mainCategory.associate = function(models){
    mainCategory.hasMany(models.Products,{

       as:"products" ,
       foreignKey:"main_category_id"
    })
}



    return mainCategory;
    }