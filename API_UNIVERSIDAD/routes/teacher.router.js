module.exports = app => {
    const teacherController = require("../controllers/teacher.controller.js");
    const router = require("express").Router();
    router.post("/create", teacherController.create);
    router.get("/", teacherController.findAll);
    router.get("/:id", teacherController.findOne);
    router.put("/update/:id", teacherController.update);
    router.delete("/delete/:id", teacherController.delete);
    app.use("/api/docentes", router);
}; 