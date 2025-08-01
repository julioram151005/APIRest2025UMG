module.exports = (sequelize, Sequelize) => {
    const Estudiante = sequelize.define("estudiante", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },    
        nombre: {
            type: Sequelize.STRING
        },
        carnet: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },        
    });
    return Estudiante;
}; 