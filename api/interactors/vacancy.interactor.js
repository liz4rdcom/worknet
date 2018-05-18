const _ = require('lodash')
const skillInteractor = require('./skill.interactor')
const vacancyRepository = require('../infrastructure/vacancy.repository')
const userRepository = require('../infrastructure/user.repository')
const PermissionError = require('../exceptions/permission.error')
const utils = require('../utils')

async function getList(queryString) {
  return await vacancyRepository.getVacancies(queryString)
}

async function getPublishedList(queryString) {
  return await vacancyRepository.getPublishedVacancies(queryString)
}

async function getById(id) {
  return await vacancyRepository.getById(id)
}

async function getBySearch(body) {
  let keyArray = Object.keys(body)
  let filteredObject = {}
  for (let i = 0; i < keyArray.length; i++) {
    if (body[keyArray[i]]) {
      filteredObject[keyArray[i]] = body[keyArray[i]]
    }
  }

  return await vacancyRepository.getBySearch(filteredObject)
}

async function getUserVacancies(userName) {
  return await vacancyRepository.getByAuthorUserName(userName)
}

function validateVacancy(vacancy) {
  const {
    positionName,
    organization,
    organizationTaxCode,
    authorFullName,
    authorPersonalId,
    locationName,
    locationUnitName,
    addressLine,
    interviewSupposedStartDate,
    endDate,
    useMediationService,
    vacantPlacesQuantity,
    functionsDescription,
    additionalDescription,
    minimalSalary,
    maximalSalary,
    fullTime,
    partTime,
    shiftBased,
    formalEducationLevelName,
    drivingLicenceA,
    drivingLicenceB,
    drivingLicenceC,
    drivingLicenceD,
    drivingLicenceE,
    drivingLicenceT1,
    drivingLicenceT2,
    airLicence,
    seaLicence,
    railwayLicence,
    languages,
    skills,
    published,
    ...restProps
  } = vacancy

  if (!_.isNil(published) && !_.isBoolean(published)) {
    throw new PermissionError('invalid: published', 400)
  }

  if (published) {
    if (!_.isEmpty(restProps)) {
      throw new PermissionError('extra properties found', 500)
    }

    if (!positionName || !_.isString(positionName)) {
      throw new PermissionError('userName not found', 400)
    }

    if (organization) {
      if (!_.isString(organization) || !_.isString(organizationTaxCode)) {
        throw new PermissionError('invalid: organization, organizationTaxCode', 400)
      }
    } else {
      if (!_.isString(authorFullName)) {
        throw new PermissionError('invalid: authorFullName', 400)
      }

      if (!_.isNil(authorPersonalId) && (!_.isString(authorPersonalId) || authorPersonalId.length !== 11 || !utils.stringContainsOnlyNumbers(authorPersonalId))) {
        throw new PermissionError('invalid: authorPersonalId', 400)
      }
    }

    if ((locationName || locationUnitName) && (!_.isString(locationName) || !_.isString(locationUnitName))) {
      throw new PermissionError('invalid: locationName, locationUnitName', 400)
    }

    if (addressLine && !_.isString(addressLine)) {
      throw new PermissionError('addressLine must be string', 400)
    }

    if (interviewSupposedStartDate && !_.isString(interviewSupposedStartDate)) {
      throw new PermissionError('interviewSupposedStartDate must be string', 400)
    }

    if (endDate && !_.isString(endDate)) {
      throw new PermissionError('endDate must be string', 400)
    }

    if (_.isString(interviewSupposedStartDate) && _.isString(endDate)) {
      if (new Date(endDate) - new Date(interviewSupposedStartDate) < 0) {
        throw new PermissionError('interviewSupposedStartDate must be lower than endDate', 400)
      }
    }

    if (!_.isNil(useMediationService) && !_.isBoolean(useMediationService)) {
      throw new PermissionError('useMediationService boolean string', 400)
    }

    if (vacantPlacesQuantity !== 0 && (vacantPlacesQuantity && (!utils.stringIsNonNegativeInteger(vacantPlacesQuantity) || vacantPlacesQuantity < 0))) {
      throw new PermissionError('invalid vacantPlacesQuantity', 400)
    }

    if (functionsDescription && !_.isString(functionsDescription)) {
      throw new PermissionError('invalid functionsDescription', 400)
    }

    if (additionalDescription && !_.isString(additionalDescription)) {
      throw new PermissionError('invalid additionalDescription', 400)
    }

    if (minimalSalary && !_.isNumber(minimalSalary)) {
      throw new PermissionError('invalid minimalSalary', 400)
    }

    if (maximalSalary && !_.isNumber(maximalSalary)) {
      throw new PermissionError('invalid maximalSalary', 400)
    }

    if (!_.isNil(fullTime) && !_.isBoolean(fullTime)) {
      throw new PermissionError('invalid fullTime', 400)
    }

    if (!_.isNil(partTime) && !_.isBoolean(partTime)) {
      throw new PermissionError('invalid partTime', 400)
    }

    if (!_.isNil(shiftBased) && !_.isBoolean(shiftBased)) {
      throw new PermissionError('invalid shiftBased', 400)
    }

    if (formalEducationLevelName && !_.isString(formalEducationLevelName)) {
      throw new PermissionError('invalid formalEducationLevelName', 400)
    }

    if (!_.isNil(drivingLicenceA) && !_.isBoolean(drivingLicenceA)) {
      throw new PermissionError('invalid drivingLicenceA', 400)
    }

    if (!_.isNil(drivingLicenceB) && !_.isBoolean(drivingLicenceB)) {
      throw new PermissionError('invalid drivingLicenceB', 400)
    }

    if (!_.isNil(drivingLicenceC) && !_.isBoolean(drivingLicenceC)) {
      throw new PermissionError('invalid drivingLicenceC', 400)
    }

    if (!_.isNil(drivingLicenceD) && !_.isBoolean(drivingLicenceD)) {
      throw new PermissionError('invalid drivingLicenceD', 400)
    }

    if (!_.isNil(drivingLicenceE) && !_.isBoolean(drivingLicenceE)) {
      throw new PermissionError('invalid drivingLicenceE', 400)
    }

    if (!_.isNil(drivingLicenceT1) && !_.isBoolean(drivingLicenceT1)) {
      throw new PermissionError('invalid drivingLicenceT1', 400)
    }

    if (!_.isNil(drivingLicenceT2) && !_.isBoolean(drivingLicenceT2)) {
      throw new PermissionError('invalid drivingLicenceT2', 400)
    }

    if (!_.isNil(airLicence) && !_.isBoolean(airLicence)) {
      throw new PermissionError('invalid airLicence', 400)
    }

    if (!_.isNil(seaLicence) && !_.isBoolean(seaLicence)) {
      throw new PermissionError('invalid seaLicence', 400)
    }

    if (!_.isNil(railwayLicence) && !_.isBoolean(railwayLicence)) {
      throw new PermissionError('invalid railwayLicence', 400)
    }

    if (languages && !_.isArray(languages)) {
      throw new PermissionError('invalid languages', 400)
    }

    if (skills && !_.isArray(skills)) {
      throw new PermissionError('invalid skills', 400)
    }
  }
}

async function addVacancy(userName, vacancy) {
  validateVacancy(vacancy)

  const vacan = { ...vacancy, authorUserName: userName }

  const nowDate = new Date()
  if (vacan.published) {
    vacan.publishDate = nowDate
  }
  vacan.dateLastChanged = nowDate

  if (_.isArray(vacan.skills)) {
    skillInteractor.addIfNotExists(vacan.skills.map(nxtSkill => nxtSkill.skillName))
  }

  return await vacancyRepository.addVacancy(vacan)
}

async function editVacancy(userName, id, vacancy) {
  validateVacancy(vacancy)

  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('edit is permitted only for author')
  }

  const vacan = {...vacancy, authorUserName: userName}

  const nowDate = new Date()
  if (vacan.published) {
    vacan.publishDate = nowDate
  }
  vacan.dateLastChanged = nowDate

  if (_.isArray(vacan.skills)) {
    skillInteractor.addIfNotExists(vacan.skills.map(nxtSkill => nxtSkill.skillName))
  }

  return await vacancyRepository.editVacancy(id, vacan)
}

async function deleteVacancy(userName, id) {
  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('delete is permitted only for author')
  }

  return await vacancyRepository.deleteVacancy(id)
}

async function searchUserMatchings(userName, percent = 100, excludeFields) {
  if (!_.isNumber(percent)) {
    throw new PermissionError('invalid percent', 400)
  }

  if (!_.isArray(excludeFields)) {
    throw new PermissionError('invalid excludeFields', 400)
  }

  let user = await userRepository.getUserByUserName(userName)

  let userToMatch = _.omit(user, excludeFields)

  return await vacancyRepository.matchVacanciesToUser(userToMatch, percent)
}

module.exports = {
  getList,
  getPublishedList,
  addVacancy,
  editVacancy,
  deleteVacancy,
  getUserVacancies,
  getById,
  getBySearch,
  searchUserMatchings,
}
