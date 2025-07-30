const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nombre) {//muestra error si no se envia el nombre
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const cliente = {
        nombre: req.body.nombre,//define los campos que se van a enviar
        apellido: req.body.apellido,
        direccion: req.body.direccion, 
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,

        status: req.body.status ? req.body.status : false //? dise que biene lo deja como false si no se envia
    };
    //reviue un objeto cliente y lo envia a la base de datos
    Cliente.create(cliente)
        .then(data => {
            res.send(data);//repode con el objeto creado
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Cliente with id=" + id
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
                    message: "Cliente was updated successfully." //la doble "" solo texto
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`//el `  sirve para interpolar variables
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
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
                    message: "Client was deleted successfully!"
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
    Cliente.destroy({
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
    Cliente.findAll({ where: { status: true } })
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