    const db = require("../models");
    const Vehiculo = db.vehiculo;
    const Op = db.Sequelize.Op;

    exports.create = (req, res) => {
        if (!req.body.marca) {
            return res.status(400).send({
                message: "¡El nombre del vehiculo no puede estar vacío!"
            });
        }

        const vehiculo = {
            marca: req.body.marca,
            modelo: req.body.modelo,
            anio: req.body.anio,
            tipo: req.body.tipo,
            matricula: req.body.matricula,
            disponible: req.body.disponible,
        };

        Vehiculo.create(vehiculo)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al crear el vehiculo."
                });
            });
    };

    exports.findAll = (req, res) => {
        const modelo = req.query.modelo;
        const condition = modelo ? { modelo: { [Op.iLike]: `%${modelo}%` } } : null;

        Vehiculo.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrió un error al recuperar al vehiculo."
                });
            });
    };

exports.findOne = (req, res) => {
    const modelo = req.params.modelo;

    Vehiculo.findOne({ where: { modelo: modelo } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el vehiculo de nombre=${modelo}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al recuperar al vehiculo con nombre=${modelo}`
            });
        });
};

    exports.update = (req, res) => {
        const id = req.params.id;

        Vehiculo.update(req.body, {
            where: { id_vehiculo: id }
        })
        .then(([num]) => {
            if (num === 1) {
                res.send({
                    message: "El vehículo fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el vehículo con id=${id}. Tal vez no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el vehículo con id=" + id
         });
        });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;

        Vehiculo.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: "Vehiculo eliminado exitosamente!"
                    });
                } else {
                    res.status(404).send({
                        message: `No se pudo eliminar el vehiculo con id=${id}. Tal vez no fue encontrado.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error al eliminar el vehiculo con id=" + id
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
