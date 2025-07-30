module.exports = (sequelize, Sequelize) => {
    const DetallePedido = sequelize.define("detalle_pedido", {
        id_detalle: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pedido: {
            type: Sequelize.INTEGER,
            references: {
                model: 'pedidos', 
                key: 'id_pedido'
            },
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER,
            references: {
                model: 'productos',
                key: 'id_producto'
            },
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
        },
        subtotal: {
            type: Sequelize.DOUBLE,
        }
    });

    return DetallePedido;
};