const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('ordenalo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

class informeVentasEmp extends Model {}

informeVentasEmp.init({
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey : true
    },
    nombre_empleado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cantidad_boletas: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'informeVentasEmp',
    timestamps: false,
    tableName: 'ventas_emp' // Especifica el nombre de la vista
});

module.exports = informeVentasEmp;
