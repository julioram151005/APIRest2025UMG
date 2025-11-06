module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },           
        especialidad: {
            type: Sequelize.STRING
        },        
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Teacher;
}; 