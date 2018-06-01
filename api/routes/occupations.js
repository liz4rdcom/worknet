const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized
const occupationInteractor = require('../interactors/occupation.interactor')

const baseUrl = '/api/occupations'

router.get('/search', isAuthorized, async (req, res, next) => {
  try {
    let result = await occupationInteractor.search(req.query.query)
    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
