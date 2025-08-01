const db = require("../models");
const Prestamo = db.prestamo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.libroId || !req.body.estudianteId || !req.body.fechaPrestamo) {
        return res.status(400).send({
            message: "libroId, estudianteId y fechaPrestamo son obligatorios."
        });
    }

    const prestamo = {
        libroId: req.body.libroId,
        estudianteId: req.body.estudianteId,
        fechaPrestamo: req.body.fechaPrestamo,
        fechaDevolucion: req.body.fechaDevolucion || null,
    };

    Prestamo.create(prestamo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el préstamo."
            });
        });
};

exports.findAll = (req, res) => {
    const fechaPrestamo = req.query.fechaPrestamo;
    const condition = fechaPrestamo ? {
        fechaPrestamo: {
            [Op.iLike]: `%${fechaPrestamo}%`
        }
    } : null;

    Prestamo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los préstamos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Prestamo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró un préstamo con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar el préstamo con id=${id}.`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Prestamo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num[0] === 1) {
                res.send({
                    message: "El préstamo fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el préstamo con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el préstamo con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Prestamo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "¡Préstamo eliminado exitosamente!"
                });
            } else {
                res.status(404).send({
                    message: `No se pudo eliminar el préstamo con id=${id}. Tal vez no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el préstamo con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Prestamo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} préstamos fueron eliminados exitosamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los préstamos."
            });
        });
};
