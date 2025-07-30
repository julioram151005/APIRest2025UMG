module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        
        telefono: {
            type: Sequelize.STRING
        },
        ingreso:{
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });
    return Cliente;
}; 