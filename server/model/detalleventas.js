const { Sequelize, DataTypes, Model } = require('sequelize');
const Productos = require('./productos');
const Boletas = require('./boletas')
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class DetalleVentas extends Model {}

DetalleVentas.init({
    iddetalle:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    idboleta:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idproducto:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    cantidad:{
        type:DataTypes.DATE,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'DetalleVentas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Productos.hasMany(DetalleVentas,{
    foreignKey: 'idproducto'
});
DetalleVentas.belongsTo(Productos,{
    foreignKey: 'idproducto'
});

Boletas.hasMany(DetalleVentas,{
    foreignKey: 'idboleta'
});
DetalleVentas.belongsTo(Boletas,{
    foreignKey: 'idboleta'
});


// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = DetalleVentas;