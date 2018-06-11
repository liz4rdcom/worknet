const _ = require('lodash')
const skillInteractor = require('./skill.interactor')
const occupationInterctor = require('./occupation.interactor')
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

async function getBySearch(body, queryAll = false) {
  let keyArray = Object.keys(body)
  let filteredObject = {}
  for (let i = 0; i < keyArray.length; i++) {
    if (body[keyArray[i]]) {
      filteredObject[keyArray[i]] = body[keyArray[i]]
    }
  }

  return await vacancyRepository.getBySearch(filteredObject, queryAll)
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
    interviewSupposedStartDate,
    endDate,
    useMediationService,
    vacantPlacesQuantity,
    additionalDescription,
    minimalSalary,
    maximalSalary,
    fullTime,
    partTime,
    shiftBased,
    formalEducationLevelName,
    isInternship,
    militaryObligation,
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

    if (interviewSupposedStartDate && !_.isString(interviewSupposedStartDate)) {
      throw new PermissionError('interviewSupposedStartDate must be string', 400)
    }

    if (endDate && !_.isString(endDate)) {
      throw new PermissionError('endDate must be string', 400)
    }

    if (_.isString(interviewSupposedStartDate)) {
      if (new Date(interviewSupposedStartDate) - new Date() < 0) {
        throw new PermissionError('interviewSupposedStartDate must not be in the past', 400)
      }
    }

    if (_.isString(endDate)) {
      if (new Date(endDate) - new Date() < 0) {
        throw new PermissionError('endDate must not be in the past', 400)
      }
    }

    if (!_.isNil(useMediationService) && !_.isBoolean(useMediationService)) {
      throw new PermissionError('useMediationService boolean string', 400)
    }

    if (!_.isNil(vacantPlacesQuantity) && (!_.isNumber(vacantPlacesQuantity) || vacantPlacesQuantity < 0)) {
      throw new PermissionError('invalid vacantPlacesQuantity', 400)
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

    if (minimalSalary > maximalSalary) {
      throw new PermissionError('maximalSalary should be greater than minimalSalary', 400)
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

    if (!_.isNil(isInternship) && !_.isBoolean(isInternship)) {
      throw new PermissionError('invalid isInternship', 400)
    }

    if (!_.isNil(militaryObligation) && !_.isBoolean(militaryObligation)) {
      throw new PermissionError('invalid militaryObligation', 400)
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

  let promises = [
    await vacancyRepository.addVacancy(vacan),
  ]

  if (_.isArray(vacan.skills)) {
    promises.push(
      skillInteractor.addIfNotExists(vacan.skills.map(nxtSkill => nxtSkill.skillName))
    )
  }

  if (vacan.positionName) {
    promises.push(
      occupationInterctor.addIfNotExists(vacan.positionName)
    )
  }

  let [vacancyId] = Promise.all(promises)

  return vacancyId
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
    await skillInteractor.addIfNotExists(vacan.skills.map(nxtSkill => nxtSkill.skillName))
  }

  if (vacan.positionName) {
    await occupationInterctor.addIfNotExists(vacan.positionName)
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

const validateAndGenerateUserMatchingFields = (projectionConfigFields, percent) => {
  if (!_.isInteger(percent) && (percent < 0 || percent > 100)) {
    throw new PermissionError('invalid percent', 400)
  }

  if (!_.isObject(projectionConfigFields)) {
    throw new PermissionError('invalid projectionConfigFields', 400)
  }

  const correctProjectionConfigFields = {...projectionConfigFields}

  const {
    factLocation,
    salary,
    workSchedule,
    formalEducationLevel,
    militaryObligation,
    internship,
    drivingLicenses,
    languages,
    skills,
    jobExperiences,
    desirableJobs,
    desirableJobLocations,
    ...restConfigFields
  } = correctProjectionConfigFields

  // todo validate

  if (!_.isEmpty(restConfigFields)) {
    throw new PermissionError('invalid configFields: redundant fields found', 400)
  }

  let includeFields = []

  if (factLocation) {
    includeFields.push('factLocationName')
    includeFields.push('factLocationUnitName')
  }

  if (salary) {
    includeFields.push('desirableSalary')
  }

  if (workSchedule) {
    includeFields.push('fullTime')
    includeFields.push('partTime')
    includeFields.push('shiftBased')
  }

  if (formalEducationLevel) {
    includeFields.push('formalEducationLevelName')
  }

  if (drivingLicenses) {
    includeFields.push('drivingLicenceA')
    includeFields.push('drivingLicenceB')
    includeFields.push('drivingLicenceC')
    includeFields.push('drivingLicenceD')
    includeFields.push('drivingLicenceE')
    includeFields.push('drivingLicenceT1')
    includeFields.push('drivingLicenceT2')
    includeFields.push('airLicence')
    includeFields.push('seaLicence')
    includeFields.push('railwayLicence')
  }

  if (languages) {
    includeFields.push('languages')
  }

  if (skills) {
    includeFields.push('skills')
  }

  if (jobExperiences) {
    includeFields.push('jobExperiences')
  }

  if (desirableJobs) {
    includeFields.push('desirableJobs')
  }

  if (desirableJobLocations) {
    includeFields.push('desirableJobLocations')
  }

  if (militaryObligation) {
    includeFields.push('militaryObligation')
  }

  if (internship) {
    includeFields.push('interestedInInternship')
  }

  return includeFields
}

async function searchUserMatchings(userName, percent = 0, projectionConfigFields) {
  let includeFields = validateAndGenerateUserMatchingFields(projectionConfigFields, percent)

  let user = await userRepository.getUserByUserName(userName)

  let userToMatch = _.pick(user, includeFields)

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
