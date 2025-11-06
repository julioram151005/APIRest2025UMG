module.exports = (sequelize, Sequelize) => {
    const Asignacion = sequelize.define("asignacion", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_student: {
            type: Sequelize.INTEGER,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        id_curse: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cursos',
                key: 'id'
            }
        },
        especialidad: {
            type: Sequelize.STRING
        },
        modalidad: {
            type: Sequelize.STRING
        },
        horario: {
            type: Sequelize.STRING
        },
        });
    return Asignacion;
}; 