module.exports = (sequelize, Sequelize) => {
    const Grado = sequelize.define("grados", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_curso: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cursos',
                key: 'id'
            }
        },
        id_student: {
            type: Sequelize.INTEGER,
            references: {
                model: 'students',
                key: 'id'
            }
        },        
        nota: {
            type: Sequelize.INTEGER
        },
        tipo: {
            type: Sequelize.STRING
        },                
    });
    return Grado;
}; 