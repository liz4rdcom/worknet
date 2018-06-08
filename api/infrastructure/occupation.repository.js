const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.occupationIndex')
const type = config.get('elastic.occupationType')

async function search(queryString = '*') {
  const options = {
    index,
    type,
    q: '*' + queryString + '*',
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

module.exports = {
  search,
  exists,
  add,
}
