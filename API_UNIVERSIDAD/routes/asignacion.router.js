module.exports = app => {
    const asignacionController = require("../controllers/asginacion.controller.js");
    const router = require("express").Router();
    router.post("/create", asignacionController.create);
    router.get("/", asignacionController.findAll);
    router.get("/:id", asignacionController.findOne);
    router.put("/update/:id", asignacionController.update);
    router.delete("/delete/:id", asignacionController.delete);
    app.use("/api/asignacion", router);
};