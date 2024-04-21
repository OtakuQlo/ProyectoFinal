const { Sequelize, DataTypes, Model } = require('sequelize');
const Productos = require('./productos');
const Usuarios = require('./usuarios');
const sequelize = new Sequelize('ordenalo', 'root', '1234', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class StockProducts extends Model {}

StockProducts.init({
    idstock:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    idproducto:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    cantidadtotal:{
        type:DataTypes.DATE,
        allowNull:false
    },
    idusuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'StockProducts',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Productos.hasMany(StockProducts,{
    foreignKey: 'idproducto'
});
StockProducts.belongsTo(Productos,{
    foreignKey: 'idproducto'
});

Usuarios.hasMany(StockProducts,{
    foreignKey: 'idusuario'
});
StockProducts.belongsTo(Usuarios,{
    foreignKey: 'idusuario'
});


// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = StockProducts;