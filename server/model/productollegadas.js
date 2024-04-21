const { Sequelize, DataTypes, Model } = require('sequelize');
const Usuarios = require('./usuarios');
const Productos = require('./productos');
const Empresas = require('./empresas');

const sequelize = new Sequelize('ordenalo', 'root', '1234', {
    host: 'localhost',
    dialect:'mysql',
    port:3306
});

class ProductoLlegadas extends Model {}

ProductoLlegadas.init({
    idprolle:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fechaingreso:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fechavencimiento:{
        type:DataTypes.DATE,
        allowNull:false
    },
    idproducto:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    idempresa:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize, // Pasar la instancia de Sequelize aquí
    modelName: 'ProductoLlegadas',
    timestamps: false // Deshabilitar las marcas de tiempo automáticas // Nombre del modelo
});

Productos.hasMany(ProductoLlegadas,{
    foreignKey: 'idproducto'
});
ProductoLlegadas.belongsTo(Productos,{
    foreignKey: 'idproducto'
});

Empresas.hasMany(ProductoLlegadas,{
    foreignKey: 'idempresa'
});
ProductoLlegadas.belongsTo(Empresas,{
    foreignKey: 'idempresa'
});


// Plans.hasMany(Usuarios,{
//     foreignKey: 'idplan'
// });
// Usuarios.belongsTo(Plans,{
//     foreignKey: 'idplan'
// });

// Ahora el modelo está asociado con la instancia de Sequelize
// Puedes exportar el modelo si lo deseas
module.exports = ProductoLlegadas;