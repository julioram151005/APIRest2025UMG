module.exports = app => {
    const prestamo = require("../controllers/prestamo.controller.js");
    var router = require("express").Router();
    router.post("/create", prestamo.create);
    router.get("/", prestamo.findAll);
    router.get("/:id", prestamo.findOne);
    router.put("/update/:id", prestamo.update);
    router.delete("/delete/:id", prestamo.delete);
    router.delete("/delete/", prestamo.deleteAll);
    app.use("/api/prestamo", router);
};