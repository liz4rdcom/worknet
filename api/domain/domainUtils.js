const MonthPeriod = require('./monthPeriod')
const RecordError = require('../exceptions/record.error')

function validatePeriod(startMonth, startYear, endMonth, endYear) {
  let start = new MonthPeriod(startMonth, startYear)
  let end = endMonth && endYear
    ? new MonthPeriod(endMonth, endYear)
    : MonthPeriod.currentMonthPeriod()

  if (start.isFuture()) {
    throw new RecordError('პერიოდის დაწყების თარიღი ჯერ არ დამდგარა')
  }

  if (end.isFuture()) {
    throw new RecordError('პერიოდის დასრულების თარიღი ჯერ არ დამდგარა')
  }

  if (start.compareTo(end) > 0) {
    throw new RecordError('პერიოდის დაწყების თარიღი დასრულების თარიღზე მეტია')
  }
}

module.exports = {
  validatePeriod,
}
