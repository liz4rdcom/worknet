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

function percentToString(percent) {
  return percent.toString() + '%'
}

const isValidEmail = str => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i.test(str)

function isValidPhone(phone) {
  let trimmedPhone = phone.replace(/ /g, '')

  return /[+0-9]{6,}/.test(trimmedPhone)
}

function replaceAll(string, searchString, replaceString) {
  return string.split(searchString).join(replaceString)
}

module.exports = {
  getUserNameFromRequest,
  stringContainsOnlyNumbers,
  couldBePersonalId,
  stringIsNonNegativeInteger,
  percentToString,
  isValidEmail,
  isValidPhone,
  replaceAll,
}
