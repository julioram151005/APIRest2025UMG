    const db = require("../models");
    const Musica = db.musica;
    const Op = db.Sequelize.Op;

    exports.create = (req, res) => {
        if (!req.body.nombre) {
            return res.status(400).send({
                message: "¡El título no puede estar vacío!"
            });
        }

        const musica = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            artista: req.body.artista,
            duracion: req.body.duracion,
            extension: req.body.extension,
            album: req.body.album,
        };

        Musica.create(musica)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al crear la Musica."
                });
            });
    };

    exports.findAll = (req, res) => {
        const nombre = req.query.nombre;
        const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

        Musica.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al recuperar la cancion."
                });
            });
    };

exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Musica.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la música con nombre=${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar la música con nombre=${nombre}`
            });
        });
};

    exports.update = (req, res) => {
        const id = req.params.id;

        Musica.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "La musica fue actualizado correctamente."
                    });
                } else {
                    res.send({
                        message: `No se pudo actualizar la musica con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al actualizar la Musica con id=" + id
                });
            });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;

        Musica.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "¡Musica eliminado exitosamente!"
                    });
                } else {
                    res.status(404).send({
                        message: `No se pudo eliminar la musica con id=${id}. Tal vez no fue encontrado.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al eliminar la musica con id=" + id
                });
            });
    };


    exports.deleteAll = (req, res) => {
        Musica.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} musica fueron eliminados exitosamente.` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al eliminar todos las canciones."
                });
            });
    };
