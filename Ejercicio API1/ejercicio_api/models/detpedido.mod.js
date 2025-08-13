module.exports = (sequelize, Sequelize) => {
    const DetallePedido = sequelize.define("detalle_pedido", {
        id_detalle: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pedido: {
            type: Sequelize.INTEGER
        },
        id_producto: {
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        subtotal: {
            type: Sequelize.DOUBLE
        }
    });

    return DetallePedido;
};