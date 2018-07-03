const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.occupationIndex')
const type = config.get('elastic.occupationType')

const utils = require('./utils')

async function search(queryString) {
  const options = {
    index,
    type,
    q: !queryString ? '*' : '*' + utils.escapeQuery(queryString) + '*',
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source)
}

async function exists(occupation) {
  const options = {
    index,
    type,
    body: {
      query: {
        term: {
          'name.keyword': occupation,
        },
      },
    },
  }

  let result = await client.search(options)

  return result.hits.total > 0
}

async function add(occupation) {
  const options = {
    index,
    type,
    body: {
      name: occupation,
    },
  }

  return await client.index(options)
}

async function addMany(occupations) {
}

module.exports = {
  search,
  exists,
  add,
  addMany,
}
