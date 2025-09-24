import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface MoviesAttributes {
    id: number;
    title: string;
    genre: string;
    releaseYear: number;
    director: string;
    rating: number | null; // Rating can be null if not rated yet
}

interface MoviesCreationAttributes extends Optional<MoviesAttributes, 'id'> {}

class Movies extends Model<MoviesAttributes, MoviesCreationAttributes> implements MoviesAttributes {
    public id!: number;
    public title!: string;
    public genre!: string;
    public releaseYear!: number;
    public director!: string;
    public rating!: number | null; // Rating can be null if not rated yet

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initMoviesModel(sequelize: Sequelize): typeof Movies {
    Movies.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            releaseYear: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            director: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Movies',
            timestamps: true,
        }
    );

    return Movies;
}