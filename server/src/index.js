import { User, sequelize } from './db/models';
import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

class Task extends Model {

}

Task.init({
            value: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                notEmpty: true
              }
            },
            deadline: {
              type: DataTypes.DATE,
              allowNull: false,
              validate: {
                isDate: true,
                isAfter: new Date(),
              }
            },
            isDone: {
              type: DataTypes.BOOLEAN,
              defaultValue: false,
              allowNull: false,
            }
          }, {
            sequelize,
            timestamps: true,
          });

// Tasks n:1 Users

Task.belongsTo(User, {
  foreignKey: {
    name: 'ownerId'
  },
});
User.hasMany(Task, {
  foreignKey: {
    name: 'ownerId'
  },
});

Task.sync({
            force: true,
          });

//---

class Role extends Model {
}

Role.init({
            name: {
              type: DataTypes.STRING,
              unique: true,
              allowNull: false
            },
          }, {
            sequelize,
          });

class UserRoles extends Model {

};

UserRoles.init({

               }, {
  sequelize,
});

Role.belongsToMany(User, {
  through: 'UserRoles',
});

User.belongsToMany(Role, {
  through: 'UserRoles',
});

Role.sync();