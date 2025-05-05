import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.mysql.js';

class UserEvents extends Model {
    static async createDefaults() {
        return {};
    }
}

UserEvents.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'userEvents',
    modelName: 'userEvents',
});

export default UserEvents;
