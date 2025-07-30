module.exports = app => {
    const clientes = require("../controllers/cliente.control.js");
    const router = require("express").Router();
    router.post("/create", clientes.create);
    router.get("/", clientes.getAll);
    router.get("/:id", clientes.getById);
    router.put("/update/:id", clientes.update);
    router.delete("/delete/:id", clientes.delete);
    app.use("/api/clientes", router);
};
