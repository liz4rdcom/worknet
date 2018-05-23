const _ = require('lodash')
const shortid = require('shortid')
const userRepository = require('../infrastructure/user.repository')
const skillInterctor = require('./skill.interactor')
const desirableJobInterctor = require('./desirable.job.interactor')
const desirableTrainingInterctor = require('./desirable.training.interactor')
const factory = require('../domain/factory')
const RecordError = require('../exceptions/record.error')
const domainUtils = require('../domain/domainUtils')
const umpack = require('../umpack')
const PermissionError = require('../exceptions/permission.error')
const getRegisteringUser = require('../domain/user').getRegisteringUser
const utils = require('../utils')
const dummyCRA = require('../infrastructure/dummy.CRA')

async function register({ userName, password, email, phone, birthDate }) {
  if (!userName) {
    throw new PermissionError('მიუთითეთ userName.', 400)
  }

  if (!password) {
    throw new PermissionError('მიუთითეთ password.', 400)
  }

  if (!birthDate) {
    throw new PermissionError('მიუთითეთ birthDate.', 400)
  }

  if (!email && !phone) {
    throw new PermissionError('იმაილი და საკონტაქტო ნომერიდან ერთერთი მაინც უნდა შეიყვანო.', 400)
  }

  const signUpObj = {
    userName,
    password,
  }

  if (email) {
    signUpObj.email = email
  } else {
    signUpObj.phone = phone
  }

  const umpackResult = await umpack.signup(signUpObj)

  const userObj = {
    userName,
    birthDate,
    phone,
    email,
  }

  try {
    if (utils.couldBePersonalId(userName) && dummyCRA.arePersonalIdAndBirthDateValid(userName, birthDate, true)) { // todo CRA instead
      userObj.personalId = userName
    }

    await userRepository.saveUser(getRegisteringUser(userObj))
  } catch (e) {
    // todo signup reverse
    throw e
  }

  return umpackResult
}

async function getList() {
  return await userRepository.getUsers()
}

async function getUserMainInfo(userName) {
  let user = await userRepository.getMainInfo(userName)
  return user
}

function validateMainInfo(mainInfo) {
  const {
    firstName,
    lastName,
    genderName,
    birthDate,
    registrationLocationName,
    registrationLocationUnitName,
    registrationAddressDescription,
    factLocationName,
    factLocationUnitName,
    factAddressDescription,
    mobileNumber,
    email,
    contactDescription,
    ...restProps
  } = mainInfo

  if (!_.isEmpty(restProps)) {
    throw new PermissionError('extra properties found', 500)
  }

  if (firstName && !_.isString(firstName)) {
    throw new PermissionError('firstName should be string', 400)
  }

  if (lastName && !_.isString(lastName)) {
    throw new PermissionError('lastName should be string', 400)
  }

  if (genderName && !_.isString(genderName)) {
    throw new PermissionError('genderName should be string', 400)
  }

  if (birthDate && (!_.isDate(birthDate) && !_.isString(birthDate))) {
    throw new PermissionError('invalid birthDate', 400)
  }

  if ((registrationLocationName || registrationLocationUnitName) && (!_.isString(registrationLocationName) || !_.isString(registrationLocationUnitName))) {
    throw new PermissionError('invalid: registrationLocationName, registrationLocationUnitName', 400)
  }

  if ((factLocationName || factLocationUnitName) && (!_.isString(factLocationName) || !_.isString(factLocationUnitName))) {
    throw new PermissionError('invalid: factLocationName, factLocationUnitName', 400)
  }

  if (registrationAddressDescription && !_.isString(registrationAddressDescription)) {
    throw new PermissionError('registrationAddressDescription must be string', 400)
  }

  if (factAddressDescription && !_.isString(factAddressDescription)) {
    throw new PermissionError('factAddressDescription must be string', 400)
  }

  if (mobileNumber && (!_.isString(mobileNumber) || !utils.isValidPhone(mobileNumber))) {
    throw new PermissionError('invalid mobileNumber', 400)
  }

  if (email && (!_.isString(email) || !utils.isValidEmail(email))) {
    throw new PermissionError('invalid email', 400)
  }

  if (contactDescription && !_.isString(contactDescription)) {
    throw new PermissionError('contactDescription must be string', 400)
  }
}

async function updateMainInfo(userName, mainInfo) {
  validateMainInfo(mainInfo)

  let foundUser = await userRepository.getUserByUserName(userName)

  let userToSave

  if (!foundUser) {
    throw new RecordError('ჩანაწერი ვერ მოიძებნა')
  } else {
    userToSave = Object.assign(foundUser, mainInfo)
  }

  let result = await userRepository.saveUser(userToSave)
  return result._id
}

async function getUserProfile(userName) {
  let user = await userRepository.getUserByUserName(userName)

  return _.omit(user, ['userName', 'isActive', 'deactivationDate'])
}

async function fillUserProfile(userName, profile) {
  let foundUser = await userRepository.getUserByUserName(userName)

  let userToSave

  if (!foundUser) {
    userToSave = Object.assign({
      userName,
    }, profile)
  } else {
    userToSave = Object.assign(foundUser, profile)
  }

  await userRepository.saveUser(userToSave)
}

async function getSkills(userName) {
  return await userRepository.getSkills(userName)
}

function validateSkillParam(skill) {
  if (!_.isString(skill)) {
    throw new PermissionError('skill parameter must be string', 400)
  }
}

async function addSkill(userName, skill) {
  validateSkillParam(skill)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.addSkill(skill)

    await skillInterctor.addIfNotExists(skill)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function removeSkill(userName, skill) {
  validateSkillParam(skill)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.removeSkill(skill)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function getDesirableJobs(userName) {
  return await userRepository.getDesirableJobs(userName)
}

function validateDesirableJobParam(desirableJob) {
  if (!_.isString(desirableJob)) {
    throw new PermissionError('desirableJob parameter must be string', 400)
  }
}

async function addDesirableJob(userName, desirableJob) {
  validateDesirableJobParam(desirableJob)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.addDesirableJob(desirableJob)

    await desirableJobInterctor.addIfNotExists(desirableJob)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function removeDesirableJob(userName, desirableJob) {
  validateDesirableJobParam(desirableJob)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.removeDesirableJob(desirableJob)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function getDesirableTrainings(userName) {
  return await userRepository.getDesirableTrainings(userName)
}

function validateDesirableTrainingParam(desirableTraining) {
  if (!_.isString(desirableTraining)) {
    throw new PermissionError('desirableTraining parameter must be string', 400)
  }
}

async function addDesirableTraining(userName, desirableTraining) {
  validateDesirableTrainingParam(desirableTraining)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.addDesirableTraining(desirableTraining)

    await desirableTrainingInterctor.addIfNotExists(desirableTraining)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function removeDesirableTraining(userName, desirableTraining) {
  validateDesirableTrainingParam(desirableTraining)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.removeDesirableTraining(desirableTraining)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function getDesirableTrainingLocations(userName) {
  return await userRepository.getDesirableTrainingLocations(userName)
}

function validateDesirableTrainingLocationParam(desirableTrainingLocation) {
  if (!_.isObject(desirableTrainingLocation)) {
    throw new PermissionError('desirableTrainingLocation parameter must be object', 400)
  }

  const {
    name,
    unitName,
    ...restProps
  } = desirableTrainingLocation

  if (!_.isEmpty(restProps)) {
    throw new PermissionError('extra properties found in desirableTrainingLocation', 400)
  }

  if (!_.isString(name)) {
    throw new PermissionError('desirableTrainingLocation property name should be string', 400)
  }

  if (!_.isString(unitName)) {
    throw new PermissionError('desirableTrainingLocation property unitName should be string', 400)
  }
}

async function addDesirableTrainingLocation(userName, desirableTrainingLocation) {
  validateDesirableTrainingLocationParam(desirableTrainingLocation)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.addDesirableTrainingLocation(desirableTrainingLocation)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function removeDesirableTrainingLocation(userName, desirableTrainingLocation) {
  validateDesirableTrainingLocationParam(desirableTrainingLocation)

  let userObject = await userRepository.getUserByUserName(userName)

  let user = factory.createUser(userObject)

  try {
    user.removeDesirableTrainingLocation(desirableTrainingLocation)
  } catch (e) {
    if (!(e instanceof RecordError)) {
      throw e
    }

    return
  }

  return await userRepository.saveUser(user)
}

async function getJobExperiences(userName) {
  return await userRepository.getJobExperiences(userName)
}

async function deactivateUserProfile(userName) {
  let foundUser = await userRepository.getUserByUserName(userName)

  if (!foundUser) return

  foundUser.isActive = false
  foundUser.deactivationDate = new Date()

  await userRepository.saveUser(foundUser)
}

async function activateUserProfile(userName) {
  let foundUser = await userRepository.getUserByUserName(userName)

  if (!foundUser) return

  foundUser.isActive = true

  await userRepository.saveUser(foundUser)
}

function validateExperienceParam(experience) {
  if (!_.isObject(experience)) {
    throw new PermissionError('jobExperience parameter must be object', 400)
  }

  const {
    id,
    jobTitle,
    organization,
    description,
    locationIsInGeorgia,
    locationName,
    locationUnitName,
    additionalAddressInfo,
    startMonth,
    startYear,
    endMonth,
    endYear,
    hasDocument,
    ...restProps
  } = experience

  if (!_.isEmpty(restProps)) {
    throw new PermissionError('extra properties found in jobExperience', 400)
  }

  if (id && !_.isString(id)) {
    throw new PermissionError('invalid id', 400)
  }

  if (jobTitle && !_.isString(jobTitle)) {
    throw new PermissionError('invalid jobTitle', 400)
  }

  if (organization && !_.isString(organization)) {
    throw new PermissionError('invalid organization', 400)
  }

  if (description && !_.isString(description)) {
    throw new PermissionError('invalid description', 400)
  }

  if (locationIsInGeorgia && !_.isBoolean(locationIsInGeorgia)) {
    throw new PermissionError('invalid locationIsInGeorgia field', 400)
  }

  if (locationName && !_.isString(locationName)) {
    throw new PermissionError('invalid locationName', 400)
  }

  if (locationUnitName && !_.isString(locationUnitName)) {
    throw new PermissionError('invalid locationUnitName', 400)
  }

  if (additionalAddressInfo && !_.isString(additionalAddressInfo)) {
    throw new PermissionError('invalid additionalAddressInfo', 400)
  }

  if (hasDocument && !_.isBoolean(hasDocument)) {
    throw new PermissionError('invalid hasDocument field', 400)
  }

  if (startMonth && !_.isInteger(startMonth)) {
    throw new PermissionError('invalid startMonth', 400)
  }

  if (startYear && !_.isInteger(startYear)) {
    throw new PermissionError('invalid startYear', 400)
  }

  if (endMonth && !_.isInteger(endMonth)) {
    throw new PermissionError('invalid endMonth', 400)
  }

  if (endYear && !_.isInteger(endYear)) {
    throw new PermissionError('invalid endYear', 400)
  }

  domainUtils.validatePeriod(
    startMonth,
    startYear,
    endMonth,
    endYear
  )
}

async function addJobExperience(userName, experience) {
  validateExperienceParam(experience)

  experience.id = shortid.generate()

  let experiences = await userRepository.getJobExperiences(userName)

  experiences.push(experience)

  await userRepository.saveJobExperiences(userName, experiences)

  return experience.id
}

async function replaceJobExperience(userName, id, experience) {
  if (!experience.id) experience.id = id

  validateExperienceParam(experience)

  let experiences = await userRepository.getJobExperiences(userName)

  let index = experiences.findIndex(item => item.id === experience.id)

  experiences[index] = experience

  await userRepository.saveJobExperiences(userName, experiences)
}

async function deleteJobExperience(userName, id) {
  let experiences = await userRepository.getJobExperiences(userName)

  let index = experiences.findIndex(item => item.id === id)

  experiences.splice(index, 1)

  await userRepository.saveJobExperiences(userName, experiences)
}

async function getEducations(userName) {
  return await userRepository.getEducations(userName)
}

function validateEducationParam(education) {
  if (!_.isObject(education)) {
    throw new PermissionError('education parameter must be object', 400)
  }

  const {
    id,
    educationType,
    educationLevel,
    institution,
    locationIsInGeorgia,
    locationName,
    locationUnitName,
    additionalAddressInfo,
    startMonth,
    startYear,
    endMonth,
    endYear,
    directionName,
    ...restProps
  } = education

  if (!_.isEmpty(restProps)) {
    throw new PermissionError('extra properties found in jobExperience', 400)
  }

  if (id && !_.isString(id)) {
    throw new PermissionError('invalid id', 400)
  }

  if (educationType && !_.isString(educationType)) {
    throw new PermissionError('invalid educationType', 400)
  }

  if (educationLevel && !_.isString(educationLevel)) {
    throw new PermissionError('invalid educationLevel', 400)
  }

  if (institution && !_.isString(institution)) {
    throw new PermissionError('invalid institution', 400)
  }

  if (locationIsInGeorgia && !_.isBoolean(locationIsInGeorgia)) {
    throw new PermissionError('invalid locationIsInGeorgia field', 400)
  }

  if (locationName && !_.isString(locationName)) {
    throw new PermissionError('invalid locationName', 400)
  }

  if (locationUnitName && !_.isString(locationUnitName)) {
    throw new PermissionError('invalid locationUnitName', 400)
  }

  if (additionalAddressInfo && !_.isString(additionalAddressInfo)) {
    throw new PermissionError('invalid additionalAddressInfo', 400)
  }

  if (directionName && !_.isString(directionName)) {
    throw new PermissionError('invalid directionName', 400)
  }

  if (startMonth && !_.isInteger(startMonth)) {
    throw new PermissionError('invalid startMonth', 400)
  }

  if (startYear && !_.isInteger(startYear)) {
    throw new PermissionError('invalid startYear', 400)
  }

  if (endMonth && !_.isInteger(endMonth)) {
    throw new PermissionError('invalid endMonth', 400)
  }

  if (endYear && !_.isInteger(endYear)) {
    throw new PermissionError('invalid endYear', 400)
  }

  domainUtils.validatePeriod(
    startMonth,
    startYear,
    endMonth,
    endYear
  )
}

async function addEducation(userName, education) {
  validateEducationParam(education)

  education.id = shortid.generate()

  let educations = await userRepository.getEducations(userName)

  educations.push(education)

  await userRepository.saveEducations(userName, educations)

  return education.id
}

async function editEducation(userName, id, education) {
  if (!education.id) education.id = id

  validateEducationParam(education)

  let educations = await userRepository.getEducations(userName)

  let index = educations.findIndex(item => item.id === education.id)

  educations[index] = education

  await userRepository.saveEducations(userName, educations)
}

async function deleteEducation(userName, id) {
  let educations = await userRepository.getEducations(userName)

  let index = educations.findIndex(item => item.id === id)

  educations.splice(index, 1)

  await userRepository.saveEducations(userName, educations)
}

async function getFormalEducationLevel(userName) {
  return await userRepository.getFormalEducationLevel(userName)
}

async function setFormalEducationLevel(userName, level) {
  await userRepository.setFormalEducationLevel(userName, level)
}

async function getLanguages(userName) {
  return await userRepository.getLanguages(userName)
}

async function addLanguage(userName, languageObject) {
  if (!_.isObject(languageObject)) {
    throw new PermissionError('language parameter must be object', 400)
  }

  let language = {
    languageName: languageObject.languageName,
    languageLevel: languageObject.languageLevel,
  }

  if (!language.languageName) throw new RecordError('ენის სახელი არაა მითითებული')

  if (!_.isString(language.languageName)) {
    throw new PermissionError('languageName field must be string', 400)
  }

  if (language.languageLevel && !_.isString(language.languageLevel)) {
    throw new PermissionError('languageLevel field must be string', 400)
  }

  let languages = await userRepository.getLanguages(userName)

  let foundLanguage = languages.find(item => item.languageName === language.languageName)

  if (foundLanguage) throw new RecordError('ენის ცოდნა უკვე დამატებულია პროფილში')

  languages.push(language)

  await userRepository.saveLanguages(userName, languages)
}

async function setLanguageLevel(userName, languageName, level) {
  if (!languageName) throw new RecordError('ენის სახელი არაა მითითებული')
  if (!level) throw new RecordError('ენის ცოდნის დონე არაა მითითებული')

  if (!_.isString(languageName)) {
    throw new PermissionError('languageName parameter must be string', 400)
  }

  if (!_.isString(level)) {
    throw new PermissionError('languageLevel parameter must be string', 400)
  }

  let languages = await userRepository.getLanguages(userName)

  let languageIndex = languages.findIndex(item => item.languageName === languageName)

  if (languageIndex === -1) throw new RecordError('მითითებული ენის ცოდნა არაა დამატებული პროფილში')

  languages[languageIndex].languageLevel = level

  await userRepository.saveLanguages(userName, languages)
}

async function removeLanguage(userName, languageName) {
  if (!languageName) throw new RecordError('ენის სახელი არაა მითითებული')

  if (!_.isString(languageName)) {
    throw new PermissionError('languageName parameter must be string', 400)
  }

  let languages = await userRepository.getLanguages(userName)

  let languageIndex = languages.findIndex(item => item.languageName === languageName)

  if (languageIndex === -1) throw new RecordError('მითითებული ენის ცოდნა არაა დამატებული პროფილში')

  languages.splice(languageIndex, 1)

  await userRepository.saveLanguages(userName, languages)
}

async function getDesirableJobLocations(userName) {
  return await userRepository.getDesirableJobLocations(userName)
}

async function deleteDesirableJobLocations(userName, location) {
  let desirableJobLocations = await getDesirableJobLocations(userName)
  let index = desirableJobLocations.findIndex((d) => d.locationName === location.locationName && d.locationUnitName === location.locationUnitName)
  desirableJobLocations.splice(index, 1)
  return await userRepository.saveDesirableJobLocations(userName, desirableJobLocations)
}

async function addDesirableJobLocations(userName, location) {
  let jobLocation = {
    locationName: location.locationName,
    locationUnitName: location.locationUnitName,
  }

  let desirableJobLocations = await userRepository.getDesirableJobLocations(userName)

  let foundDesirableJobLocation = desirableJobLocations.find((d) => d.locationName === location.locationName && d.locationUnitName === location.locationUnitName)

  if (foundDesirableJobLocation) throw new RecordError('მისამართი უკვე დამატებულია პროფილში')

  desirableJobLocations.push(jobLocation)

  await userRepository.saveDesirableJobLocations(userName, desirableJobLocations)
}

async function getDrivingLicence(userName) {
  return await userRepository.getDrivingLicence(userName)
}

async function addDrivingLicence(userName, licence) {
  let drivingLicence = await userRepository.getDrivingLicence(userName)
  drivingLicence = licence
  await userRepository.saveDrivingLicence(userName, drivingLicence)
}

async function getHasDrivingLicence(userName) {
  return await userRepository.getHasDrivingLicence(userName)
}

async function addHasDrivingLicence(userName, licence) {
  let drivingLicence = await userRepository.getHasDrivingLicence(userName)
  drivingLicence = licence
  await userRepository.saveHasDrivingLicence(userName, drivingLicence)
}

async function getMilitaryObligation(userName) {
  return await userRepository.getMilitaryObligation(userName)
}

async function addMilitaryObligation(userName, obligation) {
  let militaryObligation = await userRepository.getMilitaryObligation(userName)
  militaryObligation = obligation
  await userRepository.saveMilitaryObligation(userName, militaryObligation)
}

async function getDesirableSalary(userName) {
  return await userRepository.getDesirableSalary(userName)
}

async function addDesirableSalary(userName, salary) {
  let desirableSalary = await userRepository.getDesirableSalary(userName)
  desirableSalary = salary
  await userRepository.saveDesirableSalary(userName, desirableSalary)
}

async function getJobDescription(userName) {
  return await userRepository.getJobDescription(userName)
}

async function addJobDescription(userName, jobDesc) {
  let jobDescription = await userRepository.getDrivingLicence(userName)
  jobDescription = jobDesc
  await userRepository.saveJobDescription(userName, jobDescription)
}

async function getUseMediationService(userName) {
  return await userRepository.getUseMediationService(userName)
}

async function addUseMediationService(userName, useMediation) {
  let useMediationService = await userRepository.getUseMediationService(userName)
  useMediationService = useMediation
  await userRepository.saveUseMediationService(userName, useMediationService)
}

const validateAndFixSearchVacancyMatchings = (configFields, percent) => {
  if (_.isNumber(percent) && (percent < 0 || percent > 100)) {
    throw new PermissionError('invalid percent', 400)
  }

  if (!_.isObject(configFields)) {
    throw new PermissionError('invalid configFields', 400)
  }

  const correctConfigFields = {...configFields}

  const {
    positionName,
    locationName,
    locationUnitName,
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
    ...restConfigFields
  } = correctConfigFields

  // todo validate

  if (!_.isEmpty(restConfigFields)) {
    throw new PermissionError('invalid configFields: redundant fields found', 400)
  }

  if (!minimalSalary) {
    correctConfigFields.minimalSalary = 0
  }

  if (!maximalSalary) {
    correctConfigFields.maximalSalary = Number.MAX_SAFE_INTEGER
  }

  return {configFields: correctConfigFields, percent}
}

async function searchVacancyMatchings(configFields = {}, percent) {
  const result = validateAndFixSearchVacancyMatchings(configFields, percent)

  return await userRepository.matchUsersToVacancy(result.configFields, result.percent)
}

module.exports = {
  getList,
  getUserMainInfo,
  updateMainInfo,
  getUserProfile,
  fillUserProfile,
  deactivateUserProfile,
  activateUserProfile,
  getSkills,
  addSkill,
  removeSkill,
  getDesirableJobs,
  addDesirableJob,
  removeDesirableJob,
  getDesirableTrainings,
  addDesirableTraining,
  removeDesirableTraining,
  getDesirableTrainingLocations,
  addDesirableTrainingLocation,
  removeDesirableTrainingLocation,
  getJobExperiences,
  addJobExperience,
  replaceJobExperience,
  deleteJobExperience,
  getEducations,
  addEducation,
  editEducation,
  deleteEducation,
  getFormalEducationLevel,
  setFormalEducationLevel,
  getLanguages,
  addLanguage,
  setLanguageLevel,
  removeLanguage,
  getDesirableJobLocations,
  deleteDesirableJobLocations,
  addDesirableJobLocations,
  getDrivingLicence,
  addDrivingLicence,
  getHasDrivingLicence,
  addHasDrivingLicence,
  getMilitaryObligation,
  addMilitaryObligation,
  getDesirableSalary,
  addDesirableSalary,
  getJobDescription,
  addJobDescription,
  getUseMediationService,
  addUseMediationService,
  register,
  searchVacancyMatchings,
}
