module.exports = app => {
    const vehiculo = require("../controllers/vehiculo.controller.js");
    var router = require("express").Router();
    router.post("/create", vehiculo.create);
    router.get("/", vehiculo.findAll);
    router.get("/nombre/:nombre", vehiculo.findOne);
    router.put("/update/:id", vehiculo.update);
    router.delete("/delete/:id", vehiculo.delete);
    //router.delete("/delete/", cliente.deleteAll);
    app.use("/api/vehiculos", router);
};