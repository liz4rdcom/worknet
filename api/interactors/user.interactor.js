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

async function updateMainInfo(userName, mainInfo) {
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

async function addSkill(userName, skill) {
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

async function addDesirableJob(userName, desirableJob) {
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

async function addDesirableTraining(userName, desirableTraining) {
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

async function addDesirableTrainingLocation(userName, desirableTrainingLocation) {
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

async function addJobExperience(userName, experience) {
  domainUtils.validatePeriod(
    experience.startMonth,
    experience.startYear,
    experience.endMonth,
    experience.endYear
  )

  experience.id = shortid.generate()

  let experiences = await userRepository.getJobExperiences(userName)

  experiences.push(experience)

  await userRepository.saveJobExperiences(userName, experiences)

  return experience.id
}

async function replaceJobExperience(userName, id, experience) {
  if (!experience.id) experience.id = id

  domainUtils.validatePeriod(
    experience.startMonth,
    experience.startYear,
    experience.endMonth,
    experience.endYear
  )

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

async function addEducation(userName, education) {
  domainUtils.validatePeriod(
    education.startMonth,
    education.startYear,
    education.endMonth,
    education.endYear
  )

  education.id = shortid.generate()

  let educations = await userRepository.getEducations(userName)

  educations.push(education)

  await userRepository.saveEducations(userName, educations)

  return education.id
}

async function editEducation(userName, id, education) {
  if (!education.id) education.id = id

  domainUtils.validatePeriod(
    education.startMonth,
    education.startYear,
    education.endMonth,
    education.endYear
  )

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
  let language = {
    languageName: languageObject.languageName,
    languageLevel: languageObject.languageLevel,
  }

  if (!language.languageName) throw new RecordError('ენის სახელი არაა მითითებული')

  let languages = await userRepository.getLanguages(userName)

  let foundLanguage = languages.find(item => item.languageName === language.languageName)

  if (foundLanguage) throw new RecordError('ენის ცოდნა უკვე დამატებულია პროფილში')

  languages.push(language)

  await userRepository.saveLanguages(userName, languages)
}

async function setLanguageLevel(userName, languageName, level) {
  let languages = await userRepository.getLanguages(userName)

  let languageIndex = languages.findIndex(item => item.languageName === languageName)

  if (languageIndex === -1) throw new RecordError('მითითებული ენის ცოდნა არაა დამატებული პროფილში')

  languages[languageIndex].languageLevel = level

  await userRepository.saveLanguages(userName, languages)
}

async function removeLanguage(userName, languageName) {
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
}
