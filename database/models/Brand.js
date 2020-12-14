module.exports = (sequelize, DataTypes) => {

    const Brand = sequelize.define("Brands", {
    
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

Brand.associate = function(models){
    Brand.hasMany(models.Products,{

       as:"products" ,
       foreignKey:"brand_id"
    })
}

    return Brand;
    }