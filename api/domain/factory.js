const User = require('./user')

function createUser(userObject) {
  let user = new User()

  Object.assign(user, userObject)

  return user
}

module.exports = {
  createUser,
}
