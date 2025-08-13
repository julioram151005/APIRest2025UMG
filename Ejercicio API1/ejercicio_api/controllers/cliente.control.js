const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ message: "El nombre es requerido" });
    }

    Cliente.create({
        nombre: req.body.nombre,
        correo: req.body.correo, 
        telefono: req.body.telefono
    })
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send({ message: "Error al crear cliente" }));
};

exports.getAll = (req, res) => {
    Cliente.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: "Error al obtener clientes" }));
};


exports.getById = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Cliente no encontrado" });
            }
            res.send(data);
        })
        .catch(err => res.status(500).send({ message: "Error al buscar cliente" }));
};


exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id_cliente: id }
    })
    .then(num => {
        if (num == 1) {
            return Cliente.findByPk(id).then(data => res.send(data));
        }
        res.status(404).send({ message: "Cliente no encontrado" });
    })
    .catch(err => res.status(500).send({ message: "Error al actualizar cliente" }));
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({
        where: { id_cliente: id }
    })
    .then(num => {
        if (num == 1) {
            return res.send({ message: "Cliente eliminado exitosamente" });
        }
        res.status(404).send({ message: "Cliente no encontrado" });
    })
    .catch(err => res.status(500).send({ message: "Error al eliminar cliente" }));
};