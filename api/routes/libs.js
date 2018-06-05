const router = require('express').Router()
const isAuthorized = require('../umpack').isAuthorized

const libRepository = require('../infrastructure/lib.repository')

const baseUrl = '/api/libs'

router.get('/locationsOfGeorgia', async (req, res, next) => {
  try {
    let result = await libRepository.getLocationsInGeorgia()

    res.send(result[0].locationsInGeorgia)
  } catch (error) {
    res.status(500).send({ message: 'მონაცემების ჩატვირთვის დროს მოხდა შეცდომა', error })
  }
})

router.get('/educationTypes', isAuthorized, async (req, res, next) => {
  try {
    let result = await libRepository.getEducationTypes()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/educationLevels', isAuthorized, async (req, res, next) => {
  try {
    let result = await libRepository.getEducationLevels()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/formalEducationLevels', isAuthorized, async (req, res, next) => {
  try {
    let result = await libRepository.getFormalEducationLevels()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/languages', isAuthorized, async (req, res, next) => {
  try {
    let result = await libRepository.getLanguages()

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/ISCOList', isAuthorized, async (req, res, next) => {
  try {
    let result = await libRepository.getISCOList()

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl,
}
