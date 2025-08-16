module.exports = (sequelize, Sequelize) => {
    const Alquiler = sequelize.define("alquiler", {
        id_alquiler: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',
                key: 'id_cliente'
            }
        },
        id_vehiculo: {
            type: Sequelize.INTEGER,
            references: {
                model: 'vehiculos', 
                key: 'id_vehiculo'
            }
        },
        fecha_inicio: {
            type: Sequelize.DATEONLY
        },
        fecha_fin: {
            type: Sequelize.DATEONLY
        },
        precio_diario: {
            type: Sequelize.DECIMAL(10, 2)
        },
        total: {
            type: Sequelize.DECIMAL(10, 2)
        },
        devuelto: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Alquiler;
};
