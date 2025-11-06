const db = require("../models");
const Student = db.students; 
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacio!"
        });
        return;
    }

    const student = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,  
        carnet: req.body.carnet
        ,estado: req.body.estado ? req.body.estado : true 
    };


    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear el estudiante."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Student.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar los estudiantes."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Estudia con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El estudiante se actualizó correctamente" 
                });
            } else {
                res.send({
                    message: `No se puede actualizar el estudiante con id=${id}`
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

    Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El estudiante fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el estudiante con id=${id}`
                }); 
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
}; 
  
  