const db = require("../models");
const Tarea = db.tarea;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.titulo) {
        res.status(400).send({
            message: "Contenido no valido"
        });
        return;
    }

    const tarea = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion, 
        estado: req.body.estado,
        responsable: req.body.responsable,
        fecha_limite: req.body.fecha_limite,
        ingreso: req.body.ingreso,
    };

    Tarea.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear la tarea"
            });
        });
};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

    Tarea.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar los clientes"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tarea.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la tarea con el id =" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tarea.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tarea actualizada exitosamente"
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la tarea con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tarea.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tarea Eliminada"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${id}. El cliente no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Tarea.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Clients were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all clients."
            });
        });
};


exports.findAllStatus = (req, res) => {
    Tarea.findAll({ where: { estado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Client."
            });
        }); 
}; 