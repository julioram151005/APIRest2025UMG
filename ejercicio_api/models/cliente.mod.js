module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id_cliente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },        
        nombre: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        },
    });
    return Cliente;
};