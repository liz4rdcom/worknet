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

  let terms = Object.keys(params)
    .filter(key => key !== 'filter' && !listFields.includes(key))
    .map(key => {
      let result = {
        term: {},
      }

      result.term[key] = params[key]

      return result
    })

  if (params.skills && params.skills.length > 0) {
    let skillQueries = params.skills
      .map(skill => {
        return {
          term: {
            'skills.skillName': skill,
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
                term: {
                  locationName: location.locationName,
                },
              },
              {
                term: {
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

  terms.push(
    {
      query_string: {
        query: params.filter || '*',
      },
    }
  )

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

module.exports = {
  getVacancies,
  addVacancy,
  editVacancy,
  deleteVacancy,
  getById,
  getByAuthorUserName,
  getBySearch,
}
