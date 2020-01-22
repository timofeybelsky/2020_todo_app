const { User } = require('./db/models');
const bcrypt = require('bcrypt');

const hashPassword = async password => {
  try {
    return bcrypt.hash(password, 10);
  } catch (e) {

  }
};

const createUser = async data => {
  try {

    data.passwordHash = await hashPassword(data.password);
    const createdUser = await User.create(data);
    if (createdUser) {
      return createdUser.get();
    }
    new Error();
  } catch (e) {
    throw e;
  }
};

const getUserById = async id => {
  try {
    return (await User.findByPk(id)).get();
  } catch (e) {
    throw e;
  }
};

/*
createUser({
             firstName: 'Name',
             lastName: 'Surname',
             email: 'test_test12',
             password: 'teh1234_ytI'
           })
  .then(console.log)
  .catch(console.err);
*/

getUserById(99).then(console.log).catch(console.error);