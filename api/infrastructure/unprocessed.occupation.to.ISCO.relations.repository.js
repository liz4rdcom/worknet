const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.unprocessedOccupationToISCORelationsIndex')
const type = config.get('elastic.unprocessedOccupationToISCORelationsType')

async function search(queryString) {
  queryString = queryString || '*'

  const options = {
    index,
    type,
    q: '*' + queryString + '*',
    size: 10000,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source)
}

async function addRelation(occupationName, ISCOId) {
  let options = {
    index,
    type,
    body: { occupationName, ISCOId },
  }

  let result = await client.index(options)

  return result._id
}

async function deleteRelation(id) {
  let options = {
    index,
    type,
    id,
  }

  return await client.delete(options)
}

async function findRelationByOccupation(occupationName) {
  const options = {
    index,
    type,
    body: {
      query: {
        bool: {
          must: {
            term: { 'occupationName.keyword': occupationName },
          },
        },
      },
    },
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => ({ ...item._source, id: item._id }))
}

module.exports = {
  search,
  addRelation,
  deleteRelation,
  findRelationByOccupation,
}
