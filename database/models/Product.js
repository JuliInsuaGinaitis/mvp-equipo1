module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Products", {
    
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name:{
    type: DataTypes.STRING
    },
    price:{
    type: DataTypes.INTEGER
    },
    final_price:{
    type: DataTypes.INTEGER
    },
    image:{
    type: DataTypes.STRING
    },
    description:{
    type: DataTypes.INTEGER
    },
    stock:{
    type: DataTypes.INTEGER
    },
},{
        timestamps : false,
}) 
    
Product.associate = function(models){
    Product.belongsTo(models.Brands,{

       as:"brands" ,
       foreignKey:"brand_id"
    })
},
Product.associate = function(models){
    Product.belongsTo(models.MainCategories,{

       as:"mainCategories" ,
       foreignKey:"main_category_id"
    })

}



return Product;
    }