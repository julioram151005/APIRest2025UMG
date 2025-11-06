module.exports = app => {
    const tareaControl = require("../controllers/tarea.controller.js");
    var router = require("express").Router();
    router.post("/create", tareaControl.create);
    router.get("/", tareaControl.findAll);
    router.get("/:id", tareaControl.findOne);
    router.put("/update/:id", tareaControl.update);
    router.delete("/delete/:id", tareaControl.delete);
    router.delete("/delete/", tareaControl.deleteAll);
    app.use("/api/tareas", router);
};