const RecordError = require('../exceptions/record.error')

class User {
  addSkill(skill) {
    if (this.skills.find(item => item.skillName === skill)) throw new RecordError('skill already exists')

    this.skills.push({
      skillName: skill,
      endorsements: 0,
      users: [],
    })
  }

  removeSkill(skill) {
    let index = this.skills.findIndex(item => item.skillName === skill)

    if (index === -1) throw new RecordError('skill does not exist')

    this.skills.splice(index, 1)
  }

  addDesirableJob(desirableJob) {
    if (this.desirableJobs.find(item => item.name === desirableJob)) throw new RecordError('desirable job already exists')

    this.desirableJobs.push({ name: desirableJob })
  }

  removeDesirableJob(desirableJob) {
    let index = this.desirableJobs.findIndex(item => item.name === desirableJob)

    if (index === -1) throw new RecordError('desirable job does not exist')

    this.desirableJobs.splice(index, 1)
  }

  addDesirableTraining(desirableTraining) {
    if (this.desirableTrainings.find(item => item.name === desirableTraining)) throw new RecordError('desirable training already exists')

    this.desirableTrainings.push({ name: desirableTraining })
  }

  removeDesirableTraining(desirableTraining) {
    let index = this.desirableTrainings.findIndex(item => item.name === desirableTraining)

    if (index === -1) throw new RecordError('desirable training does not exist')

    this.desirableTrainings.splice(index, 1)
  }

  addDesirableTrainingLocation(desirableTrainingLocation) {
    const newLocName = desirableTrainingLocation.name
    const newLocUnitName = desirableTrainingLocation.unitName

    if (this.desirableTrainingLocations.find(item => item.name === newLocName && item.unitName === newLocUnitName)) {
      throw new RecordError('desirable training location already exists')
    }

    this.desirableTrainingLocations.push({ name: newLocName, unitName: newLocUnitName })
  }

  removeDesirableTrainingLocation(desirableTrainingLocation) {
    const newLocName = desirableTrainingLocation.name
    const newLocUnitName = desirableTrainingLocation.unitName

    let index = this.desirableTrainingLocations.findIndex(item => item.name === newLocName && item.unitName === newLocUnitName)

    if (index === -1) throw new RecordError('desirable training location does not exist')

    this.desirableTrainingLocations.splice(index, 1)
  }
}

const getRegisteringUser = ({
  userName,
  birthDate,
  personalId,
  phone,
  email,
}) => {
  const newUser = {
    'userName': userName,
    'birthDate': birthDate,
    'educations': [],
    'languages': [],
    'skills': [],
    'jobExperiences': [],
    'desirableJobs': [],
    'desirableJobLocations': [],
    'desirableTrainings': [],
    'desirableTrainingLocations': [],
  }

  if (personalId) {
    newUser.personalId = personalId
  }

  if (phone) {
    newUser.mobileNumber = phone
  }

  if (email) {
    newUser.email = email
  }

  return newUser
}

module.exports = User

module.exports.getRegisteringUser = getRegisteringUser
