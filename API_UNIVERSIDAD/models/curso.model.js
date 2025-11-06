module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define("cursos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_teacher: {
            type: Sequelize.INTEGER,
            references: {
                model: 'teachers',
                key: 'id'
            }
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },        
        codigo: { 
            type: Sequelize.INTEGER
        },
        semestre: {
            type: Sequelize.STRING
        }
    });
    return Curso;
};
