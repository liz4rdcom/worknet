const elasticsearch = require('elasticsearch')
const config = require('config')

const client = new elasticsearch.Client({
  host: config.get('elastic.host'),
})

const index = config.get('elastic.unprocessedOccupationToISCORelationsIndex')
const type = config.get('elastic.unprocessedOccupationToISCORelationsType')

async function getList() {
  let options = {
    index,
    type,
    size: 10000,
  }

  let result = await client.search(options)

  return result.hits.hits.map(item => item._source)
}

module.exports = {
  getList,
}
