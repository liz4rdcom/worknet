const elasticsearch = require('elasticsearch')
const config = require('config')
const _ = require('lodash')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const libRepo = require('./lib.repository')
const utils = require('./utils')
const generalUtils = require('..//utils')

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
    size: 500,
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

function notExpiredQuery() {
  return {
    bool: {
      should: [
        {
          range: {
            endDate: {
              gt: new Date(),
            },
          },
        },
        {
          bool: {
            must_not: {
              exists: {
                field: 'endDate',
              },
            },
          },
        },
      ],
    },
  }
}

async function getBySearch(params, all = false) {
  let listFields = ['skills', 'locations']
  let conditionFields = ['minimalSalary', 'maximalSalary']

  let terms = Object.keys(params)
    .filter(key => key !== 'filter' && key !== 'hasDrivingLicence' && !listFields.includes(key) && !conditionFields.includes(key))
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
        let query = {
          bool: {
            must: [
              {
                match: {
                  'locationName.keyword': location.locationName,
                },
              },
            ],
          },
        }

        if (location.locationUnitName) {
          query.bool.must.push({
            match: {
              'locationUnitName.keyword': location.locationUnitName,
            },
          })
        }

        return query
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

  if (params.hasDrivingLicence) {
    terms.push({
      bool: {
        should: [
          {
            match: {
              drivingLicenceA: true,
            },
          },
          {
            match: {
              drivingLicenceB: true,
            },
          },
          {
            match: {
              drivingLicenceC: true,
            },
          },
          {
            match: {
              drivingLicenceD: true,
            },
          },
          {
            match: {
              drivingLicenceE: true,
            },
          },
          {
            match: {
              drivingLicenceT1: true,
            },
          },
          {
            match: {
              drivingLicenceT2: true,
            },
          },
          {
            match: {
              airLicence: true,
            },
          },
          {
            match: {
              seaLicence: true,
            },
          },
          {
            match: {
              railwayLicence: true,
            },
          },
        ],
      },
    })
  }

  terms.push({
    query_string: {
      query: params.filter ? '*' + utils.escapeQuery(params.filter) + '*' : '*',
    },
  })

  let options = {
    index,
    type,
    body: {
      query: {
        bool: {
          must: terms,
          filter: [
            {
              term: {
                published: true,
              },
            },
          ],
        },
      },
    },
    size: 1000,
  }

  if (!all) {
    options.body.query.bool.filter.push(notExpiredQuery())
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
    .filter(key => booleanFields.includes(key) && user[key] != null)
    .map(key => utils.constantScoreQuery(key, user[key]))

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

  let shoulds = desirableJobLocations.map(location => {
    if (location.locationName === 'თბილისი') {
      return utils.constantScoreQuery('locationName.keyword', location.locationName)
    }

    return utils.constantMultiMustQuery([
      ['locationName.keyword', location.locationName],
      ['locationUnitName.keyword', location.locationUnitName],
    ])
  })

  return utils.functionBoolScore({
    should: shoulds,
  })
}

function jobExperiencesShoulds(user) {
  let jobExperiences = user.jobExperiences

  let pairs = jobExperiences.map(experience => ['positionName', experience.jobTitle])

  return utils.constantMultiShouldQuery(pairs)
}

function desirableSalaryShoulds(user) {
  let desirableSalary = user.desirableSalary

  let localShoulds = []

  localShoulds.push(
    {
      bool: {
        must: [
          {
            range: {
              minimalSalary: {
                lte: desirableSalary,
              },
            },
          },
          {
            range: {
              maximalSalary: {
                gte: desirableSalary,
              },
            },
          },
        ],
      },
    }
  )

  localShoulds.push(
    {
      bool: {
        must: {
          range: {
            minimalSalary: {
              lte: desirableSalary,
            },
          },
        },
        must_not: {
          exists: {
            field: 'maximalSalary',
          },
        },
      },
    }
  )

  localShoulds.push(
    {
      bool: {
        must: {
          range: {
            maximalSalary: {
              gte: desirableSalary,
            },
          },
        },
        must_not: {
          exists: {
            field: 'minimalSalary',
          },
        },
      },
    }
  )

  return utils.functionBoolScore({
    should: localShoulds,
  })
}

async function matchVacanciesToUser(user, percent) {
  let shoulds = []

  shoulds = shoulds.concat(commonShoulds(user))

  if (user.skills && user.skills.length > 0) {
    shoulds = shoulds.concat(skillsShoulds(user))
  }

  if (user.languages && user.languages.length > 0) {
    shoulds = shoulds.concat(languageShoulds(user))
  }

  if (user.desirableJobs && user.desirableJobs.length > 0) {
    shoulds = shoulds.concat(desirableJobShoulds(user))
  }

  // TODO desirableJobs and jobExperiences on one should
  if (user.desirableJobLocations && user.desirableJobLocations.length > 0) {
    shoulds = shoulds.concat(desirableJobLocationShoulds(user))
  }

  if (user.jobExperiences && user.jobExperiences.length > 0) {
    shoulds = shoulds.concat(jobExperiencesShoulds(user))
  }

  if (user.formalEducationLevelName) {
    const formalEducationLevels = await libRepo.getFormalEducationLevels()

    shoulds.push(
      utils.constantMultiShouldQuery(
        formalEducationLevels
          .slice(formalEducationLevels.indexOf(user.formalEducationLevelName))
          .map(nextVal => ['formalEducationLevelName.keyword', nextVal])
      )
    )
  }

  if (_.isInteger(user.desirableSalary)) {
    shoulds = shoulds.concat(desirableSalaryShoulds(user))
  }

  if (user.factLocationName === 'თბილისი') {
    shoulds.push(utils.constantScoreQuery('locationName.keyword', user.factLocationName))
  } else if (user.factLocationName && user.factLocationUnitName) {
    shoulds.push(utils.constantMultiMustQuery([
      ['locationName.keyword', user.factLocationName],
      ['locationUnitName.keyword', user.factLocationUnitName],
    ]))
  }

  let searchOptions = {
    index,
    type,
    body: {
      query: {
        bool: {
          should: shoulds,
          minimum_should_match: generalUtils.percentToString(percent),
          filter: [
            {
              term: {
                published: true,
              },
            },
            notExpiredQuery(),
          ],
        },
      },
    },
    searchType: 'dfs_query_then_fetch',
  }

  let result = await client.search(searchOptions)

  let resutlList = result.hits.hits.map(hit => {
    let object = utils.toObject(hit)

    object._percent = Math.floor((hit._score / shoulds.length) * 100).toString() + '%'

    return object
  })

  return {
    total: result.hits.total,
    list: resutlList,
  }
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
