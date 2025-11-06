module.exports = app => {
    const adminController = require("../controllers/admin.controller.js");
    const router = require("express").Router();
    router.post("/create", adminController.create);
    router.get("/", adminController.findAll);
    router.put("/update/:id", adminController.update);
    app.use("/api/admins", router);
}; 