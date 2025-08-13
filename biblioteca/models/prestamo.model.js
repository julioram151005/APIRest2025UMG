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
        },
        estudianteId: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
