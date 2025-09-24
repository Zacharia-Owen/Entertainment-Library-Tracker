import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface TVShowsAttributes {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    network: string;
    rating: number | null; // Rating can be null if not rated yet
}

interface TVShowsCreationAttributes extends Optional<TVShowsAttributes, 'id'> {}

class TVShows extends Model<TVShowsAttributes, TVShowsCreationAttributes> implements TVShowsAttributes {
    public id!: number;
    public title!: string;
    public genre!: string;
    public seasons!: number;
    public network!: string;
    public rating!: number | null; // Rating can be null if not rated yet

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initTVShowsModel(sequelize: Sequelize): typeof TVShows {
    TVShows.init(
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
            seasons: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            network: {
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
            modelName: 'TVShows',
            timestamps: true,
        }
    );

    return TVShows;
}