module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Capturado', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      usuarioCedula: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
              model: 'usuarios',
              key: 'cedula'
          }
      },
      pokemonId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'pokemones',
              key: 'id'
          }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
  }, {
      tableName: 'capturados',
      timestamps: true
  });
};
