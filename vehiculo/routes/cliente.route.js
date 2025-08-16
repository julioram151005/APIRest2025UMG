module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
    var router = require("express").Router();
    router.post("/create", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/nombre/:nombre", cliente.findOne);
    router.put("/update/:id", cliente.update);
    router.delete("/delete/:id", cliente.delete);
    //router.delete("/delete/", cliente.deleteAll);
    app.use("/api/clientes", router);
};