import Cookies from 'js-cookie'
import isString from 'lodash/isString'
import { PERSONAL_NUMBER_LENGTH } from './constants'

/**
 * Java ს String.hashCode() მეთოდის იმპლემენტაცია Javascript ზე.
 * წყარო http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
 * @param {*} str
 */
const hashCode = (str) => {
  var hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function isNullOrUndefined(value) {
  return value === null || value === undefined
}

function getHeaders() {
  return {
    authorization: Cookies.get('token'),
  }
}

const getRangeNumberArray = (start, end) => {
  const retVal = []

  for (let i = start; i < end + 1; i++) {
    retVal.push(i)
  }

  return retVal
}

const stringContainsOnlyNumbers = str => /^\d+$/.test(str)

const isValidEmail = str => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/i.test(str)

const couldBePersonalId = num => isString(num) && num.length === PERSONAL_NUMBER_LENGTH && stringContainsOnlyNumbers(num)

function idWithPrefix(idPrefix, idPart) {
  if (!idPrefix) return idPart

  return idPrefix + '-' + idPart
}

function compareDatesByMilliseconds(date1, date2) {
  return date1.getTime() - date2.getTime()
}

export default {
  hashOfString: hashCode,
  isNullOrUndefined,
  getHeaders,
  getRangeNumberArray,
  stringContainsOnlyNumbers,
  isValidEmail,
  couldBePersonalId,
  idWithPrefix,
  compareDatesByMilliseconds,
}
