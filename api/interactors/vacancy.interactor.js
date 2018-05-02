const vacancyRepository = require('../infrastructure/vacancy.repository')
const PermissionError = require('../exceptions/permission.error')
const _ = require('lodash')

async function getList(queryString) {
  return await vacancyRepository.getVacancies(queryString)
}

async function getById(id) {
  return await vacancyRepository.getById(id)
}

async function getUserVacancies(userName) {
  return await vacancyRepository.getByAuthorUserName(userName)
}

function validateVacancy(vacancy) {
  const aa = {
    'authorUserName': 'root',
    'positionName': 'JavaScript Developer',
    'organization': 'შპს FX1',
    'organizationTaxCode': '123456789',
    'locationName': 'თბილისი', //
    'locationUnitName': 'ისანი', //
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2018-01-07T00:00:00',
    // todo kitxe es cvladi sajiroa saertod? cvlilebebi ar iqneba da, mashin draftis cvlilebebi avsaxo? is unda
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'salaryInfoName': '150-300', //
    'fullTime': true, //
    'partTime': true, //
    'shiftBased': true, //
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //
    'drivingLicenceA': true, //
    'drivingLicenceB': true, //
    'drivingLicenceC': true, //
    'drivingLicenceD': true, //
    'drivingLicenceE': true, //
    'drivingLicenceT1': true, //
    'drivingLicenceT2': true, //
    'airLicence': true, //
    'seaLicence': true, //
    'railwayLicence': true, //
    'languages': [ //
      {
        'languageName': 'აფხაზური',
      },
    ],
    'skills': [ //
      {
        'skillName': 'Javascript',
      },
    ],
    'status': 0, // 0 - draft, 1 - published, 2 - expired.
  }

  const {
    authorUserName,
    positionName,
    organization,
    organizationTaxCode,
    locationName,
    locationUnitName,
    addressLine,
    publishDate,
    interviewSupposedStartDate,
    endDate,
    useMediationService,
    vacantPlacesQuantity,
    functionsDescription,
    additionalDescription,
    salaryInfoName,
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
    ...restProps
  } = vacancy

  if (!_.isEmpty(restProps)) {
    throw new PermissionError('extra properties found', 500)
  }

  if (!authorUserName || !_.isString(authorUserName)) {
    throw new PermissionError('Internal error concerning authorUserName', 500)
  }

  if (!positionName || !_.isString(positionName)) {
    throw new PermissionError('userName not found', 400)
  }

  // todo organization name an tu araa organizacia ramea mosatxovi ar vici jer ra

  if (addressLine && !_.isString(addressLine)) {
    throw new PermissionError('addressLine must be string', 400)
  }

  if (!publishDate || !_.isString(publishDate)) {
    throw new PermissionError('publishDate not found or is not string', 400)
  }

  if (endDate && !_.isString(endDate)) {
    throw new PermissionError('endDate must be string', 400)
  }

  // todo rom gaarkvev date last changeds mere dawere validacia

  if (!_.isNil(useMediationService) && !_.isBoolean(useMediationService)) {
    throw new PermissionError('useMediationService boolean string', 400)
  }

  if (vacantPlacesQuantity !== 0 || (vacantPlacesQuantity && (!_.isInteger(vacantPlacesQuantity) || vacantPlacesQuantity < 0))) {
    throw new PermissionError('invalid vacantPlacesQuantity', 400)
  }

  if (functionsDescription && !_.isString(functionsDescription)) {
    throw new PermissionError('invalid functionsDescription', 400)
  }

  if (additionalDescription && !_.isString(additionalDescription)) {
    throw new PermissionError('invalid additionalDescription', 400)
  }

  if (salaryInfoName && !_.isString(salaryInfoName)) {
    throw new PermissionError('invalid salaryInfoName', 400)
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
}

async function addVacancy(userName, vacancy) {
  vacancy.authorUserName = userName

  validateVacancy(vacancy)

  return await vacancyRepository.addVacancy(vacancy)
}

async function editVacancy(userName, id, vacancy) {
  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('edit is permitted only for author')
  }

  return await vacancyRepository.editVacancy(id, {...vacancy, authorUserName: userName})
}

async function deleteVacancy(userName, id) {
  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('delete is permitted only for author')
  }

  return await vacancyRepository.deleteVacancy(id)
}

module.exports = {
  getList,
  addVacancy,
  editVacancy,
  deleteVacancy,
  getUserVacancies,
  getById,
}
