module.exports = (sequelize, Sequelize) => {
  const Musica = sequelize.define("musica", {
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    artista: {
      type: Sequelize.STRING
    },
    duracion: {
      type: Sequelize.INTEGER
    },
    extension: {
      type: Sequelize.STRING
    },
    album: {
      type: Sequelize.STRING
    }
  });

  return Musica;
};