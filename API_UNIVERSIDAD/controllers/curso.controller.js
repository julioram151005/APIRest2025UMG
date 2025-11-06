const db = require("../models");
const Curso = db.cursos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    const cursos = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,  
        semestre: req.body.semestre,
        descripcion: req.body.descripcion,
        id_teacher: req.body.id_teacher  
    };

    Curso.create(cursos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear el curso."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Curso.findAll({
        where: condition,
        include: [{ model: db.teachers }] 
    })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar los cursos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Curso.findByPk(id, {
        include: [{ model: db.teachers }] 
    })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el curso con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Curso.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El curso se actualizó correctamente" 
                });
            } else {
                res.send({
                    message: `No se puede actualizar el curso con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el curso con=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Curso.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El curso fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el curso con id=${id}`
                }); 
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
}; 
  
  