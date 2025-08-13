module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        id_pedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_cliente: {
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
        total: {
            type: Sequelize.DECIMAL(10, 2)
        },
    });
    return Pedido;
};