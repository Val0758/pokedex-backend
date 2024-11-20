module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        cedula: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 18,
                max: 100
            }
        }
    }, {
        tableName: 'usuarios',
        timestamps: true
    });
};
