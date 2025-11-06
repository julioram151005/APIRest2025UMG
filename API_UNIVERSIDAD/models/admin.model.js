module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
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
        estado: {
            type: Sequelize.BOOLEAN
        },
    });
    return Admin;
}; 