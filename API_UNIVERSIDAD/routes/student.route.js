module.exports = app => {
    const studentController = require("../controllers/student.controller.js");
    const router = require("express").Router();
    router.post("/create", studentController.create);
    router.get("/", studentController.findAll);
    router.get("/:id", studentController.findOne);
    router.put("/update/:id", studentController.update);
    router.delete("/delete/:id", studentController.delete);
    app.use("/api/estudiantes", router);
}; 