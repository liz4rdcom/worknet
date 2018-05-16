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

function constantScoreQuery(key, value) {
  return {
    constant_score: {
      query: {
        term: {
          key: value,
        },
      },
    },
  }
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
    .map(key => constantScoreQuery(key, user[key]))
    .reduce((arr, should) => {
      arr.push(should)

      return arr
    }, [])

  shoulds.push(
    constantScoreQuery('formalEducationLevelName.keyword', user.formalEducationLevelName)
  )

  return shoulds
}

function skillsShoulds(user) {
  let skills = user.skills

  let shoulds = skills.map(skill => constantScoreQuery('skills.skillName.keyword', skill))

  return shoulds
}

async function matchVacanciesToUser(user, percent) {
  let shoulds = []

  shoulds = shoulds.concat(commonShoulds(user))

  if (user.skills) {
    shoulds = shoulds.concat(skillsShoulds(user))
  }

  let searchOptions = {
    index,
    type,
    body: {
      query: {
        bool: {
          should: shoulds,
          minimum_should_match: percentToString(percent),
        },
      },
    },
    searchType: 'dfs_query_then_fetch',
  }

  return await client.search(searchOptions)
}

function percentToString(percent) {
  return Math.floor(percent * 100).toString() + '%'
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
