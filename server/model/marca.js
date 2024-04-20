const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalotodo', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class Marca extends Model {}

Marca.init({
    idmarca:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    nombremarca:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'Marca',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = Marca;
