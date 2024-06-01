const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class informeVentas extends Model {}

informeVentas.init({
    idusuario: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    nombreproducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor_inventario: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    restante: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'informeVentas',
    timestamps: false,
    tableName: 'ventas' // Especifica el nombre de la vista
});

module.exports = informeVentas;
