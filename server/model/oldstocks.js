const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class OldStocks extends Model {}

OldStocks.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    oldcantidad:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    porcentaje:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    idusuario:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    estado:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'OldStocks',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});





// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = OldStocks;