const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const utils = require('./utils')

const index = config.get('elastic.usersIndex')
const type = config.get('elastic.usersType')

async function getUsers() {
  let options = {
    index,
    type,
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getMainInfo(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'firstName',
      'lastName',
      'personalId',
      'birthDate',
      'genderName',
      'registrationLocationName',
      'registrationLocationUnitName',
      'registrationAddressDescription',
      'factLocationName',
      'factLocationUnitName',
      'factAddressDescription',
      'mobileNumber',
      'email',
      'contactDescription',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return null

  return utils.toObject(result.hits.hits[0])
}

async function updateMainInfo(userName, mainInfo) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        inline: 'ctx._source.factLocationUnitName = test',
        params: { test: 'aaaaaaaaaa' },
      },
      // script: {
      //   inline:
      //     `ctx._source.factLocationUnitName=${mainInfo.factLocationUnitName};
      //   ctx._source.mobileNumber=${mainInfo.mobileNumber};
      //   `
      // }
    },
  }
  let result = await client.updateByQuery(options)

  return result
}

async function getSkills(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'skills',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.skills
}

async function getDesirableJobs(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'desirableJobs',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableJobs
}

async function getDesirableTrainings(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'desirableTrainings',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableTrainings
}

async function getDesirableTrainingLocations(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'desirableTrainingLocations',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableTrainingLocations
}

async function getJobExperiences(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'jobExperiences',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.jobExperiences
}

async function saveJobExperiences(userName, experiences) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.jobExperiences = params.experiences',
        params: { experiences },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getUserByUserName(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return null

  return utils.toObject(result.hits.hits[0])
}

async function saveUser(user) {
  let options = {
    index,
    type,
    body: user,
  }

  if (user.id) options.id = user.id

  return await client.index(options)
}

async function getEducations(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'educations',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.educations
}

async function saveEducations(userName, educations) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.educations = params.educations',
        params: {
          educations,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getFormalEducationLevel(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'formalEducationLevelName',
    ],
  }

  let result = await client.search(options) // here

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.formalEducationLevelName
}

async function setFormalEducationLevel(userName, level) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.formalEducationLevelName = params.level',
        params: {
          level,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getLanguages(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'languages',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.languages
}

async function saveLanguages(userName, languages) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.languages = params.languages',
        params: {
          languages,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getDesirableJobLocations(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'desirableJobLocations',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableJobLocations
}

async function saveDesirableJobLocations(userName, desirableJobLocations) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.desirableJobLocations = params.desirableJobLocations',
        params: {
          desirableJobLocations,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getDrivingLicence(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'drivingLicenceA',
      'drivingLicenceB',
      'drivingLicenceC',
      'drivingLicenceD',
      'drivingLicenceE',
      'drivingLicenceT1',
      'drivingLicenceT2',
      'airLicence',
      'seaLicence',
      'railwayLicence',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source
}

async function saveDrivingLicence(userName, drivingLicence) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: `ctx._source.drivingLicenceA = params.drivingLicenceA;
                 ctx._source.drivingLicenceB = params.drivingLicenceB;
                 ctx._source.drivingLicenceC = params.drivingLicenceC;
                 ctx._source.drivingLicenceD = params.drivingLicenceD;
                 ctx._source.drivingLicenceE = params.drivingLicenceE;
                 ctx._source.drivingLicenceT1 = params.drivingLicenceT1;
                 ctx._source.drivingLicenceT2 = params.drivingLicenceT2;
                 ctx._source.airLicence = params.airLicence;
                 ctx._source.seaLicence = params.seaLicence;
                 ctx._source.railwayLicence = params.railwayLicence;
        `,
        params: drivingLicence,
      },
    },
  }

  await client.updateByQuery(options)
}

async function getHasDrivingLicence(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'hasDrivingLicence',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.hasDrivingLicence
}

async function saveHasDrivingLicence(userName, hasDrivingLicence) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.hasDrivingLicence = params.hasDrivingLicence',
        params: {
          hasDrivingLicence,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getMilitaryObligation(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'militaryObligation',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.militaryObligation
}

async function saveMilitaryObligation(userName, militaryObligation) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.militaryObligation = params.militaryObligation',
        params: {
          militaryObligation,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getDesirableSalary(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'desirableSalary',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableSalary
}

async function saveDesirableSalary(userName, desirableSalary) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.desirableSalary = params.desirableSalary',
        params: {
          desirableSalary,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

async function getJobDescription(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'fullTime',
      'partTime',
      'shiftBased',
      'interestedInInternship',
      'interestedToBeVolunteer',
      'interestedInTemporaryJob',
      'interestedInDangerousJob',
      'interestedInTraining',
      'unemployed',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source
}

async function saveJobDescription(userName, jobDescription) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: `ctx._source.fullTime = params.fullTime;
                 ctx._source.partTime = params.partTime;
                 ctx._source.shiftBased = params.shiftBased;
                 ctx._source.interestedInInternship = params.interestedInInternship;
                 ctx._source.interestedToBeVolunteer = params.interestedToBeVolunteer;
                 ctx._source.interestedInTemporaryJob = params.interestedInTemporaryJob;
                 ctx._source.interestedInDangerousJob = params.interestedInDangerousJob;
                 ctx._source.interestedInTraining = params.interestedInTraining;
                 ctx._source.unemployed = params.unemployed;
        `,
        params: jobDescription,
      },
    },
  }

  await client.updateByQuery(options)
}

async function getUseMediationService(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
    },
    _sourceInclude: [
      'useMediationService',
    ],
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.useMediationService
}

async function saveUseMediationService(userName, useMediationService) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName,
        },
      },
      script: {
        source: 'ctx._source.useMediationService = params.useMediationService',
        params: {
          useMediationService,
        },
      },
    },
  }

  await client.updateByQuery(options)
}

module.exports = {
  getUsers,
  getMainInfo,
  updateMainInfo,
  getUserByUserName,
  saveUser,
  getSkills,
  getDesirableJobs,
  getDesirableTrainings,
  getDesirableTrainingLocations,
  getJobExperiences,
  saveJobExperiences,
  getEducations,
  saveEducations,
  getFormalEducationLevel,
  setFormalEducationLevel,
  getLanguages,
  saveLanguages,
  getDesirableJobLocations,
  saveDesirableJobLocations,
  getDrivingLicence,
  saveDrivingLicence,
  getHasDrivingLicence,
  saveHasDrivingLicence,
  getMilitaryObligation,
  saveMilitaryObligation,
  getDesirableSalary,
  saveDesirableSalary,
  getJobDescription,
  saveJobDescription,
  getUseMediationService,
  saveUseMediationService,
}
