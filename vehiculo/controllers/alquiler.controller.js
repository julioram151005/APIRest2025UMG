const db = require("../models");
const Alquiler = db.alquiler; 
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.fecha_inicio || !req.body.fecha_fin) {
        return res.status(400).send({
            message: "¡La fecha de inicio y fin no pueden estar vacías!"
        });
    }

    const alquiler = {
        id_vehiculo: req.body.id_vehiculo,
        id_cliente: req.body.id_cliente,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        precio_diario: req.body.precio_diario,
        total: req.body.total || 0, 
        devuelto: req.body.devuelto || false
    };

    Alquiler.create(alquiler)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el alquiler."
            });
        });
};

exports.findAll = (req, res) => {
    const id_cliente = req.query.id_cliente;
    const condition = id_cliente ? { id_cliente: { [Op.eq]: id_cliente } } : null;

    Alquiler.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los alquileres."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Alquiler.findOne({ where: { id_alquiler: id } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el alquiler con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar el alquiler con id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Alquiler.update(req.body, { where: { id_alquiler: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "El alquiler fue actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar el alquiler con id=${id}. Tal vez no fue encontrado o el cuerpo está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el alquiler con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Alquiler.destroy({ where: { id_alquiler: id } })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Alquiler eliminado exitosamente!" });
            } else {
                res.status(404).send({
                    message: `No se pudo eliminar el alquiler con id=${id}. Tal vez no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el alquiler con id=" + id
            });
        });
};
