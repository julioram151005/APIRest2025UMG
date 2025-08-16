module.exports = (sequelize, Sequelize) => {
    const Vehiculo = sequelize.define("vehiculo", {
        id_vehiculo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        marca: {
            type: Sequelize.STRING
        },
        modelo: {
            type: Sequelize.STRING
        },
        anio: {
            type: Sequelize.INTEGER
        },
        tipo: {
            type: Sequelize.STRING
        },
        matricula: {
            type: Sequelize.STRING
        },        
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Vehiculo;
};