const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const unprocessedOccupationToISCORelations = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')

const baseUrl = '/api/unprocessedOccupationToISCORelations'

router.get('/', isAuthorized, async (req, res, next) => {
  try {
    let result = await unprocessedOccupationToISCORelations.getList()
    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
