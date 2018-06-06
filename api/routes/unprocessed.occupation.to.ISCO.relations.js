const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const unprocessedOccupationToISCORelationsInter = require('../interactors/unprocessed.occupation.to.ISCO.relations.interactor')

const baseUrl = '/api/unprocessedOccupationToISCORelations'

router.get('/', isAuthorized, async (req, res, next) => {
  try {
    let result = await unprocessedOccupationToISCORelationsRepo.search()
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/', isAuthorized, async (req, res, next) => {
  try {
    let id = await unprocessedOccupationToISCORelationsInter.addRelation(req.body.occupationName, req.body.ISCOId)

    next({result: { id }})
  } catch (error) {
    next({error})
  }
})

router.delete('/:id', isAuthorized, async (req, res, next) => {
  try {
    let result = await unprocessedOccupationToISCORelationsInter.deleteRelation(req.params.id)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
