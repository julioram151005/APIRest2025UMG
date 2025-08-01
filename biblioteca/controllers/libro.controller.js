const db = require("../models");
const Libro = db.libro;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.titulo) {
        return res.status(400).send({
            message: "¡El título no puede estar vacío!"
        });
    }

    const libro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        anioPublicacion: req.body.anioPublicacion,
        genero: req.body.genero,
        isbn: req.body.isbn,
        disponible: req.body.disponible != null ? req.body.disponible : true
    };

    Libro.create(libro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el libro."
            });
        });
};

exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    const condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

    Libro.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar los libros."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Libro.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró un libro con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar el libro con id=${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Libro.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El libro fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el libro con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
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

    Libro.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "¡Libro eliminado exitosamente!"
                });
            } else {
                res.status(404).send({
                    message: `No se pudo eliminar el libro con id=${id}. Tal vez no fue encontrado.`
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
    Libro.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} libros fueron eliminados exitosamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los libros."
            });
        });
};



exports.findAllStatus = (req, res) => {
    Libro.findAll({ where: { disponible: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al recuperar los libros disponibles."
            });
        });
};
