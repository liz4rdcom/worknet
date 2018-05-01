const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.desirableJobsIndex')
const type = config.get('elastic.desirableJobsType')

async function search(queryString) {
  queryString = queryString || '*'

  const options = {
    index,
    type,
    q: '*' + queryString + '*',
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source.name)
}

async function exists(desirableJob) {
  const options = {
    index,
    type,
    body: {
      query: {
        term: {
          'name.keyword': desirableJob,
        },
      },
    },
  }

  let result = await client.search(options)

  return result.hits.total > 0
}

async function add(desirableJob) {
  const options = {
    index,
    type,
    body: {
      name: desirableJob,
    },
  }

  return await client.index(options)
}

module.exports = {
  search,
  exists,
  add,
}
