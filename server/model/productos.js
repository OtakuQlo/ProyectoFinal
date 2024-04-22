const { Sequelize, DataTypes, Model } = require('sequelize');
const Marca = require('./marca')
const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Productos extends Model {}

Productos.init({
    idproducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombreproducto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    idmarca:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    barcode:{ 
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Productos',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Marca.hasMany(Productos,{
    foreignKey: 'idmarca'
});
Productos.belongsTo(Marca,{
    foreignKey: 'idmarca'
});

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Productos;