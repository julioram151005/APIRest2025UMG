const db = require("../models");
const Grado = db.grados;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.id_curso || !req.body.id_student) {
        res.status(400).send({
            message: "El curso y el estudiante no pueden estar vacíos!"
        });
        return;
    }

    const grado = {
        id_curso: req.body.id_curso,
        id_student: req.body.id_student,
        nota: req.body.nota,
        tipo: req.body.tipo
    };

    Grado.create(grado)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear el registro en grados."
            });
        });
};

exports.findAll = (req, res) => {
    Grado.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar los registros de grados."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Grado.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el registro en grados con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el registro con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Grado.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "El registro en grados se actualizó correctamente." });
            } else {
                res.send({ message: `No se pudo actualizar el registro con id=${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el registro con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Grado.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "El registro fue eliminado exitosamente!" });
            } else {
                res.send({ message: `No se pudo eliminar el registro con id=${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el registro con id=" + id
            });
        });
};
