module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define("prestamo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        libroId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "libros",
                key: "id"
            }
        },
        estudianteId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "estudiantes",
                key: "id"
            }
        },
        fechaPrestamo: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        fechaDevolucion: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    });

    return Prestamo;
};