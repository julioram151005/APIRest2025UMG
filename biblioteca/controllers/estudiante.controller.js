const db = require("../models");
const Estudiante = db.estudiante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({
            message: "¡El nombre no puede estar vacío!"
        });
    }

    const estudiante = {
        nombre: req.body.nombre,
        carnet: req.body.carnet,
        correo: req.body.correo
    };

    Estudiante.create(estudiante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Estudiante."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Estudiante.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar al Estudiante."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiante.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró un Estudiante con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar el Estudiante con id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Estudiante.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El estudiante fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el estudiante con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el libro con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiante.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "¡Estudiante eliminado exitosamente!"
                });
            } else {
                res.status(404).send({
                    message: `No se pudo eliminar el Estudiante con id=${id}. Tal vez no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el libro con id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Estudiante.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} estudiante fueron eliminados exitosamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los estudiantes."
            });
        });
};