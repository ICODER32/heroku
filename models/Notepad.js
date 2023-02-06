const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notepad extends Model { }

Notepad.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        worked: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        links_used: {
            type: DataTypes.STRING,
            allowNull: true
        },

        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notepad',
    }
);

module.exports = Notepad;
