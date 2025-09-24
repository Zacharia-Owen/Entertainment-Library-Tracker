import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    username!: string;
    email!: string;
    password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Hash password before saving
    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    // Validate password
    async validatePassword(password: string) {
        return bcrypt.compare(password, this.password);
    }
}

export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            sequelize,
        }
    );

    // Hook to hash password before creating or updating user
    User.beforeCreate(async (user) => {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    User.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    return User;
}