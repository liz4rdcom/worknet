function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit._id

  return object
}

function constantScoreQuery(key, value, boost = 1) {
  return {
    constant_score: {
      filter: {
        term: {
          [key]: value,
        },
      },
      boost,
    },
  }
}

function functionBoolScore(boolQuery, source) {
  return {
    function_score: {
      query: {
        bool: boolQuery,
      },
      script_score: {
        script: {
          source: '1',
        },
      },
    },
  }
}

function constantMultiMustQuery(pairs) {
  return functionBoolScore({
    must: pairs.map(pair => constantScoreQuery(pair[0], pair[1])),
  })
}

function constantMultiShouldQuery(pairs) {
  return functionBoolScore({
    should: pairs.map(pair => constantScoreQuery(pair[0], pair[1])),
  })
}

module.exports = {
  toObject,
  constantScoreQuery,
  functionBoolScore,
  constantMultiMustQuery,
  constantMultiShouldQuery,
}
