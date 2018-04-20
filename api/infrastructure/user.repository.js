const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const utils = require('./utils')

const index = config.get('elastic.usersIndex')
const type = config.get('elastic.usersType')

async function getUsers() {
  let options = {
    index,
    type
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getMainInfo(userName) {
  console.log(userName)

  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      }
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
      'contactDescription'
    ]
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
          userName: userName
        }
      },
      script: {
        inline: 'ctx._source.factLocationUnitName = test',
        params: { test: 'aaaaaaaaaa' }
      }
      // script: {
      //   inline:
      //     `ctx._source.factLocationUnitName=${mainInfo.factLocationUnitName};
      //   ctx._source.mobileNumber=${mainInfo.mobileNumber};
      //   `
      // }
    }
  }
  let result = await client.updateByQuery(options)
  console.log(result)
  return result
}

async function getSkills(userName) {
  let options = {
    index,
    type,
    body: {
      query: {
        term: {
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'skills'
    ]
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'desirableJobs'
    ]
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'desirableTrainings'
    ]
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'desirableTrainingLocations'
    ]
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'jobExperiences'
    ]
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
          userName: userName
        }
      },
      script: {
        source: 'ctx._source.jobExperiences = params.experiences',
        params: { experiences }
      }
    }
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
          userName: userName
        }
      }
    }
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return null

  return utils.toObject(result.hits.hits[0])
}

async function saveUser(user) {
  let options = {
    index,
    type,
    body: user
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'educations'
    ]
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
          userName: userName
        }
      },
      script: {
        source: 'ctx._source.educations = params.educations',
        params: {
          educations
        }
      }
    }
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'formalEducationLevelName'
    ]
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
          userName: userName
        }
      },
      script: {
        source: 'ctx._source.formalEducationLevelName = params.level',
        params: {
          level
        }
      }
    }
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'languages'
    ]
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
          userName: userName
        }
      },
      script: {
        source: 'ctx._source.languages = params.languages',
        params: {
          languages
        }
      }
    }
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
          userName: userName
        }
      }
    },
    _sourceInclude: [
      'desirableJobLocations'
    ]
  }

  let result = await client.search(options)

  if (result.hits.total === 0) return []

  return result.hits.hits[0]._source.desirableJobLocations
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
  getDesirableJobLocations
}
