const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized

const baseUrl = '/api/vacancies'

const vacancyInteractor = require('../interactors/vacancy.interactor')
const utils = require('../utils')

router.get('/', async (req, res, next) => {
  try {
    let result = await vacancyInteractor.getList(req.query.query)
    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/own', isAuthorized, (req, res, next) => {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.getUserVacancies(userName)
    .then(res.send.bind(res))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  try {
    let result = await vacancyInteractor.getById(req.params.id)
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/', isAuthorized, (req, res, next) => {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.addVacancy(userName, req.body)
    .then((id) => {
      res.send({
        id: id
      })
    })
    .catch(next)
})

router.put('/:id', isAuthorized, (req, res, next) => {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.editVacancy(userName, req.params.id, req.body)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.delete('/:id', isAuthorized, (req, res, next) => {
  const userName = utils.getUserNameFromRequest(req)

  vacancyInteractor.deleteVacancy(userName, req.params.id)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

module.exports = {
  router,
  baseUrl
}
