function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit._id

  return object
}

module.exports = {
  toObject,
}
