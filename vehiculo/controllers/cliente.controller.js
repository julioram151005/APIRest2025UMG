    const db = require("../models");
    const Cliente = db.clientes;
    const Op = db.Sequelize.Op;

    exports.create = (req, res) => {
        if (!req.body.nombre) {
            return res.status(400).send({
                message: "¡El nombre no puede estar vacío!"
            });
        }

        const cliente = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
        };

        Cliente.create(cliente)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al crear el cliente."
                });
            });
    };

    exports.findAll = (req, res) => {
        const nombre = req.query.nombre;
        const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

        Cliente.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al recuperar al cliente."
                });
            });
    };

exports.findOne = (req, res) => {
    const nombre = req.params.nombre;

    Cliente.findOne({ where: { nombre: nombre } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el cliente de nombre=${nombre}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar al cliente con nombre=${nombre}`
            });
        });
};

    exports.update = (req, res) => {
        const id = req.params.id;

        Cliente.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "El cliente fue actualizado correctamente."
                    });
                } else {
                    res.send({
                        message: `No se pudo actualizar al cliente con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al actualizar al cliente con id=" + id
                });
            });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;

        Cliente.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Cliente eliminado exitosamente!"
                    });
                } else {
                    res.status(404).send({
                        message: `No se pudo eliminar al cliente con id=${id}. Tal vez no fue encontrado.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al eliminar al cliente con id=" + id
                });
            });
    };

/*
    exports.deleteAll = (req, res) => {
        Cliente.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} cliente fi=ue eliminados exitosamente.` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al eliminar todos los clientes."
                });
            });
    };
*/ 
