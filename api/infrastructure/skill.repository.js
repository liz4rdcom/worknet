const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.skillsIndex')
const type = config.get('elastic.skillsType')

const utils = require('./utils')

async function search(queryString) {
  const options = {
    index,
    type,
    q: !queryString ? '*' : '*' + utils.escapeQuery(queryString) + '*',
    size: 10000,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function exists(skill) {
  const options = {
    index,
    type,
    body: {
      query: {
        term: {
          'name.keyword': skill,
        },
      },
    },
  }

  let result = await client.search(options)

  return result.hits.total > 0
}

async function add(skill) {
  const options = {
    index,
    type,
    body: {
      name: skill,
    },
  }

  return await client.index(options)
}

module.exports = {
  search,
  exists,
  add,
}
