import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface BooksAttributes {
    id: number;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    rating: number | null; // Rating can be null if not rated yet
}

interface BooksCreationAttributes extends Optional<BooksAttributes, 'id'> {}

class Books extends Model<BooksAttributes, BooksCreationAttributes> implements BooksAttributes {
    public id!: number;
    public title!: string;
    public author!: string;
    public genre!: string;
    public publicationYear!: number;
    public rating!: number | null; // Rating can be null if not rated yet

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initBooksModel(sequelize: Sequelize): typeof Books {
    Books.init(
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
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            publicationYear: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: true, // Rating can be null if not rated yet
            },
        },
        {
            sequelize,
            modelName: 'Books',
            timestamps: true, // Automatically manage createdAt and updatedAt fields
        }
    );

    return Books;
}