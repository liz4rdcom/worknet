const arePersonalNumberAndBirthDateValid = (personalNumber, birthDate, retVal = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(retVal), 100)
  })
}

export default {
  arePersonalNumberAndBirthDateValid
}
