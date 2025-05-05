import {DataTypes, Model} from 'sequelize';
import db from '../clients/db.mysql.js';

class Events extends Model {


    static associate({Users, UserEvents}) {
        this.belongsToMany(Users, {
            through: UserEvents,
            foreignKey: 'eventId',
            otherKey: 'userId',
            as: 'participants',
        });

        this.belongsTo(Users, {
            foreignKey: 'userId',
            as: 'creator',
        });
    }

    static async createDefaults() {
        return {};
    }
}

Events.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE},
    location: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true},
}, {
    sequelize: db,
    tableName: 'events',
    modelName: 'events',
});

export default Events;
