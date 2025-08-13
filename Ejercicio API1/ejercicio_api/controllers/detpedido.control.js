const db = require('../models');
const DetallePedido = db.detalle_pedidos;
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const detalle = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    };

    DetallePedido.create(detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error("Error detalle_pedidos:", err);
            res.status(500).send({
            message: err.message || "Error al crear detalle de pedido"
            }); 
        });
};

exports.getAll = (req, res) => {
    DetallePedido.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener detalles de pedido"
            });
        });
};

exports.getByPedidoId = (req, res) => {
    const id_pedido = req.params.id;

    DetallePedido.findAll({
        where: { id_pedido: id_pedido }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener detalles del pedido"
        });
    });
};

exports.getPendientes = (req, res) => {
    Pedido.findAll({
        where: { estado: 'pendiente' },
        include: [{
            model: DetallePedido,
            as: 'detalles'
        }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al obtener pedidos pendientes"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    DetallePedido.update(req.body, {
        where: { id_detalle: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Detalle actualizado" });
        } else {
            res.status(404).send({ message: "Detalle no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al actualizar detalle" }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    DetallePedido.destroy({
        where: { id_detalle: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Detalle eliminado" });
        } else {
            res.status(404).send({ message: "Detalle no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar detalle" }));
};