module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define("tarea", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.BOOLEAN
            ,defaultValue: true
        },        
        responsable: {
            type: Sequelize.STRING
        },        
        fecha_limite: {
            type: Sequelize.DATE
        }
    });
    return Tarea;
}; 