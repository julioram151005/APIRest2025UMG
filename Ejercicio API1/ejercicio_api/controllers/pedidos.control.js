const db = require("../models");
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const pedido = {
        id_cliente: req.body.id_cliente,
        fecha: req.body.fecha || new Date(),
        total: req.body.total || 0
    };

    Pedido.create(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al crear pedido"
            });
        });
};

exports.getAll = (req, res) => {
    Pedido.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener pedidos"
            });
        });
};

exports.getById = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Pedido no encontrado" });
            } else {
                res.send(data);
            }
        })
        .catch(err => res.status(500).send({ message: "Error al buscar pedido" }));
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
        where: { id_pedido: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Pedido actualizado" });
        } else {
            res.status(404).send({ message: "Pedido no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al actualizar pedido" }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pedido.destroy({
        where: { id_pedido: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Pedido eliminado" });
        } else {
            res.status(404).send({ message: "Pedido no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar pedido" }));
};