const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')

const baseUrl = '/api/umpackPlus'

router.post('/register', async (req, res, next) => {
  try {
    const { userName, password, email, phone, birthDate } = req.body

    const result = userInteractor.register({ userName, password, email, phone, birthDate })

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl
}
