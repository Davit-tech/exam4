import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.mysql.js';
import bcrypt from 'bcrypt';

class Users extends Model {
    static associate({Events, UserEvents}) {
        this.belongsToMany(Events, {
            through: UserEvents,
            foreignKey: 'userId',
            otherKey: 'eventId',
            as: 'registeredEvents',
        });

        this.hasMany(Events, {
            foreignKey: 'userId',
            as: 'createdEvents',
        });
    }

    static async passwordHash(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async createDefaults() {
        return {};
    }
}

Users.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const saltRounds = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hash);
        },
        get() {
            return undefined;
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    activationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'users',
    modelName: 'users',
    indexes: [
        {fields: ['email'], unique: true}
    ]
});

export default Users;
