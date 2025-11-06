module.exports = app => {
    const gradoController = require("../controllers/grado.controller.js");
    const router = require("express").Router();
    router.post("/create", gradoController.create);
    router.get("/", gradoController.findAll);
    router.get("/:id", gradoController.findOne);
    router.put("/update/:id", gradoController.update);
    router.delete("/delete/:id", gradoController.delete);
    app.use("/api/grados", router);
}; 