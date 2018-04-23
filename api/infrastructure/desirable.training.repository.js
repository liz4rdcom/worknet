const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host')
})

const index = config.get('elastic.desirableTrainingsIndex')
const type = config.get('elastic.desirableTrainingsType')

async function search(queryString) {
  queryString = queryString || '*'

  const options = {
    index,
    type,
    q: '*' + queryString + '*'
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function exists(desirableTraining) {
  const options = {
    index,
    type,
    body: {
      query: {
        term: {
          'name.keyword': desirableTraining
        }
      }
    }
  }

  let result = await client.search(options)

  return result.hits.total > 0
}

async function add(desirableTraining) {
  const options = {
    index,
    type,
    body: {
      name: desirableTraining
    }
  }

  return await client.index(options)
}

module.exports = {
  search,
  exists,
  add
}
