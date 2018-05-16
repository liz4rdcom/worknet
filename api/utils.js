const jwt = require('jsonwebtoken')
const _ = require('lodash')

function getUserNameFromRequest(req) {
  return jwt.decode(req.headers.authorization).user
}

const stringContainsOnlyNumbers = str => /^\d+$/.test(str)

const stringIsPositiveInteger = str =>
  _.isString(str) &&
  str.length !== 0 &&
  stringContainsOnlyNumbers(str) &&
  str[0] !== '0'

const stringIsNonNegativeInteger = str => str === '0' || stringIsPositiveInteger(str)

const couldBePersonalId = num => _.isString(num) && num.length === 11 && stringContainsOnlyNumbers(num)

module.exports = {
  getUserNameFromRequest,
  stringContainsOnlyNumbers,
  couldBePersonalId,
  stringIsNonNegativeInteger,
}
