const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.precio) {
        return res.status(400).send({
            message: "Nombre y precio son requeridos"
        });
    }

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock || 0
    };

    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al crear producto"
            });
        });
};

exports.getAll = (req, res) => {
    Producto.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener productos"
            });
        });
};

exports.getById = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Producto no encontrado" });
            } else {
                res.send(data);
            }
        })
        .catch(err => res.status(500).send({ message: "Error al buscar producto" }));
};

exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id_producto: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Producto actualizado" });
        } else {
            res.status(404).send({ message: "Producto no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al actualizar producto" }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Producto.destroy({
        where: { id_producto: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Producto eliminado" });
        } else {
            res.status(404).send({ message: "Producto no encontrado" });
        }
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar producto" }));
};