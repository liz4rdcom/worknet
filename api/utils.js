const jwt = require('jsonwebtoken')
const _ = require('lodash')

function getUserNameFromRequest(req) {
  console.log('-----------', jwt.decode(req.headers.authorization).user)

  return jwt.decode(req.headers.authorization).user
}

const stringContainsOnlyNumbers = str => /^\d+$/.test(str)

const couldBePersonalId = num => _.isString(num) && num.length === 11 && stringContainsOnlyNumbers(num)

module.exports = {
  getUserNameFromRequest,
  stringContainsOnlyNumbers,
  couldBePersonalId,
}
