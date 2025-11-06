const db = require("../models");
const Asignacion = db.asignacion;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { 
    if (!req.body.id_student || !req.body.id_curse) {
        return res.status(400).send({
            message: "La asignación debe tener estudiante y curso!"
        });
    }

    const asignacion = {
        id_student: req.body.id_student,
        id_curse: req.body.id_curse,
        especialidad: req.body.especialidad,
        modalidad: req.body.modalidad,
        horario: req.body.horario
    };

    Asignacion.create(asignacion)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear la asignación."
            });
        });
};

exports.findAll = (req, res) => {
    Asignacion.findAll({
        include: [
            { model: db.students },
            { model: db.cursos, include: [{ model: db.teachers }] } 
        ]
    })
    .then(data => res.send(data))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error al recuperar las asignaciones."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Asignacion.findByPk(id, {
        include: [
            { model: db.students },
            { model: db.cursos, include: [{ model: db.teachers }] }
        ]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No se encontró la asignación con id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al recuperar la asignación con id=" + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Asignacion.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La asignación se actualizó correctamente."
            });
        } else {
            res.send({
                message: `No se pudo actualizar la asignación con id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar la asignación con id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Asignacion.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La asignación fue eliminada exitosamente!"
            });
        } else {
            res.send({
                message: `No se pudo eliminar la asignación con id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al eliminar la asignación con id=" + id
        });
    });
};