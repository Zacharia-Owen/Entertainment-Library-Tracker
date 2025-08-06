import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface GameAttributes {
    id: number;
    name: string;
    genre: string;
    releaseDate: Date;
    rating: number | null; // Rating can be null if not rated yet
    developer: string;
}

interface GameCreationAttributes extends Optional<GameAttributes, 'id'> {}

class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
    public id!: number;
    public name!: string;
    public genre!: string;
    public releaseDate!: Date;
    public rating!: number | null; // Rating can be null if not rated yet
    public developer!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initGameModel(sequelize: Sequelize): typeof Game {
    Game.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            releaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: true, // Rating can be null if not rated yet
            },
            developer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Game',
            timestamps: true, // Automatically manage createdAt and updatedAt fields
        }
    );

    return Game;
}