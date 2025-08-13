module.exports = app => {
    const producto = require("../controllers/productos,control.js");
    const router = require("express").Router();
    router.post("/create", producto.create);
    router.get("/", producto.getAll);
    router.get("/:id", producto.getById);
    router.put("/update/:id", producto.update);
    router.delete("/delete/:id", producto.delete);
    app.use("/api/productos", router);
};
