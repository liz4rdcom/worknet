const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const utils = require('./utils')

const index = config.get('elastic.vacanciesIndex')
const type = config.get('elastic.vacanciesType')

async function getVacancies(query = '') {
  let options = {
    index,
    type,
    q: '*' + query + '*',
    searchType: 'dfs_query_then_fetch',
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getPublishedVacancies(query = '') {
  let options = {
    index,
    type,
    q: '*' + query + '* AND published:true',
    searchType: 'dfs_query_then_fetch',
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function getById(id) {
  const options = {
    index,
    type,
    id,
  }

  let result = await client.get(options)

  return utils.toObject(result)
}

async function getByAuthorUserName(userName) {
  const options = {
    index,
    type,
    q: `authorUserName:${userName}`,
    size: 300,
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

async function addVacancy(vacancy) {
  let options = {
    index,
    type,
    body: vacancy,
  }

  let result = await client.index(options)

  return result.id
}

async function editVacancy(id, vacancy) {
  let options = {
    index,
    type,
    body: vacancy,
    id: id,
  }

  await client.index(options)
}

async function deleteVacancy(id) {
  let options = {
    index,
    type,
    id,
  }

  await client.delete(options)
}

async function getBySearch(params) {
  let listFields = ['skills', 'locations']
  let conditionFields = ['minimalSalary', 'maximalSalary']

  let terms = Object.keys(params)
    .filter(key => key !== 'filter' && !listFields.includes(key) && !conditionFields.includes(key))
    .map(key => {
      let result = {
        match: {},
      }

      result.match[key] = params[key]

      return result
    })

  if (params.skills && params.skills.length > 0) {
    let skillQueries = params.skills
      .map(skill => {
        return {
          match: {
            'skills.skillName': skill.skillName,
          },
        }
      })

    terms.push({
      dis_max: {
        queries: skillQueries,
      },
    })
  }

  if (params.locations && params.locations.length > 0) {
    let locationQueries = params.locations
      .map(location => {
        return {
          bool: {
            must: [
              {
                match: {
                  locationName: location.locationName,
                },
              },
              {
                match: {
                  locationUnitName: location.locationUnitName,
                },
              },
            ],
          },
        }
      })

    terms.push({
      dis_max: {
        queries: locationQueries,
      },
    })
  }

  if (params.minimalSalary || params.maximalSalary) {
    let mustNots = []

    if (params.maximalSalary) {
      mustNots.push({
        range: {
          minimalSalary: {
            gt: params.maximalSalary,
          },
        },
      })
    }
    if (params.minimalSalary) {
      mustNots.push({
        range: {
          maximalSalary: {
            lt: params.minimalSalary,
          },
        },
      })
    }

    terms.push({
      bool: {
        should: [
          {
            range: {
              fixedSalary: {
                gte: params.minimalSalary,
                lte: params.maximalSalary,
              },
            },
          },
          {
            bool: {
              must_not: mustNots,
              should: [
                {
                  exists: {
                    field: 'minimalSalary',
                  },
                },
                {
                  exists: {
                    field: 'maximalSalary',
                  },
                },
              ],
            },
          },
        ],
      },
    })
  }

  terms.push({
    query_string: {
      query: params.filter || '*',
    },
  })

  let options = {
    index,
    type,
    body: {
      query: {
        bool: {
          must: terms,
        },
      },
    },
  }

  let result = await client.search(options)

  return result.hits.hits.map(utils.toObject)
}

function commonShoulds(user) {
  let booleanFields = [
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
    'fullTime',
    'partTime',
    'shiftBased',
  ]

  let shoulds = Object.keys(user)
    .filter(key => booleanFields.includes(key) && user[key])
    .map(key => utils.constantScoreQuery(key, user[key]))
    .reduce((arr, should) => {
      arr.push(should)

      return arr
    }, [])

  shoulds.push(
    utils.constantScoreQuery('formalEducationLevelName.keyword', user.formalEducationLevelName)
  )

  return shoulds
}

function skillsShoulds(user) {
  let skills = user.skills

  let shoulds = skills.map(skill => utils.constantScoreQuery('skills.skillName.keyword', skill.skillName))

  return shoulds
}

function languageShoulds(user) {
  let languages = user.languages

  return languages.map(lang => utils.constantScoreQuery('languages.languageName.keyword', lang.languageName))
}

function desirableJobShoulds(user) {
  let desirableJobs = user.desirableJobs

  let pairs = desirableJobs.map(job => ['positionName', job.name])

  return utils.constantMultiShouldQuery(pairs)
}

function desirableJobLocationShoulds(user) {
  let desirableJobLocations = user.desirableJobLocations

  let shoulds = desirableJobLocations.map(location => utils.constantMultiMustQuery([
    ['locationName.keyword', location.locationName],
    ['locationUnitName.keyword', location.locationUnitName],
  ]))

  return utils.functionBoolScore({
    should: shoulds,
  })
}

function jobExperiencesShoulds(user) {
  let jobExperiences = user.jobExperiences

  let pairs = jobExperiences.map(experience => ['positionName', experience.jobTitle])

  return utils.constantMultiShouldQuery(pairs)
}

async function matchVacanciesToUser(user, percent) {
  let shoulds = []

  shoulds = shoulds.concat(commonShoulds(user))

  if (user.skills) {
    shoulds = shoulds.concat(skillsShoulds(user))
  }

  if (user.languages) {
    shoulds = shoulds.concat(languageShoulds(user))
  }

  if (user.desirableJobs) {
    shoulds = shoulds.concat(desirableJobShoulds(user))
  }

  if (user.desirableJobLocations) {
    shoulds = shoulds.concat(desirableJobLocationShoulds(user))
  }

  if (user.jobExperiences) {
    shoulds = shoulds.concat(jobExperiencesShoulds(user))
  }

  let searchOptions = {
    index,
    type,
    body: {
      query: {
        bool: {
          should: shoulds,
          minimum_should_match: utils.percentToString(percent),
          filter: {
            term: {
              published: true,
            },
          },
        },
      },
    },
    searchType: 'dfs_query_then_fetch',
  }

  let result = await client.search(searchOptions)

  return result.hits.hits.map(utils.toObject)
}

module.exports = {
  getVacancies,
  getPublishedVacancies,
  addVacancy,
  editVacancy,
  deleteVacancy,
  getById,
  getByAuthorUserName,
  getBySearch,
  matchVacanciesToUser,
}
