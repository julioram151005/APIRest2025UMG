const db = require("../models");
const Teacher = db.teachers; 
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacio!"
        });
        return;
    }

    const teacher = {
        nombre: req.body.nombre,
        email: req.body.email, 
        password: req.body.password, 
        especialidad: req.body.especialidad
    ,estado: req.body.estado ? req.body.estado : true
    };


    Teacher.create(teacher)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear el Docente."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Teacher.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar los Docentes."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Teacher.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Docente con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Teacher.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Docente se actualizó correctamente" 
                });
            } else {
                res.send({
                    message: `No se puede actualizar el docente con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la estudiante con=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Teacher.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El docente fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el docente con id=${id}`
                }); 
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
}; 
  
  