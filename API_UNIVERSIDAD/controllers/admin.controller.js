const db = require("../models");
const Admin = db.admins; 
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacio!"
        });
        return;
    }

    const admin = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,  
        estado: req.body.estado 
    };


    Admin.create(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear el administrador."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Admin.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar los administradores."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Admin.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Administrador se actualizó correctamente" 
                });
            } else {
                res.send({
                    message: `No se puede actualizar el administrador con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el administrador con=" + id
            });
        });
};
