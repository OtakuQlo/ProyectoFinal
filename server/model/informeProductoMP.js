const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class informeProductoMP extends Model {}

informeProductoMP.init({
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    idproducto: {
        type: DataTypes.INTEGER,
        allowNull : false
    },
    nombreproducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_vendido: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'informeProductoMP',
    timestamps: false,
    tableName: 'menos_popular' // Especifica el nombre de la vista
});

module.exports = informeProductoMP;
