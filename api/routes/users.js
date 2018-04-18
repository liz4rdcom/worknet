const router = require('express').Router()
const userInteractor = require('../interactors/user.interactor')
const utils = require('../utils')
const isAuthorized = require('../umpack').isAuthorized

const baseUrl = '/api/users'

router.get('/profile/maininfo', isAuthorized, async (req, res, next) => {
  try {
    let userName = utils.getUserNameFromRequest(req)

    let result = await userInteractor.getUserMainInfo(userName)
    next({ result })
  } catch (error) {
    next({ error })
  }
})

router.put('/profile/maininfo', isAuthorized, async (req, res, next) => {
  try {
    let userName = utils.getUserNameFromRequest(req)

    let result = await userInteractor.updateMainInfo(userName, req.body)
    next({ result })
  } catch (error) {
    next({ error })
  }
})

router.get('/', isAuthorized, (req, res, next) => {
  userInteractor.getList().then(res.send.bind(res)).catch(next)
})

router.get('/profile', isAuthorized, (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.getUserProfile(userName)
    .then(res.send.bind(res))
    .catch(next)
})

router.post('/profile', isAuthorized, (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.fillUserProfile(userName, req.body)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.get('/profile/skills', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getSkills(userName)
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/skills', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.addSkill(userName, req.body.skillName)
    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/skills/:skillName', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.removeSkill(userName, req.params.skillName)
    next({})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/experiences', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getJobExperiences(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/experiences', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.addJobExperience(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.put('/profile/experiences/:id', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.replaceJobExperience(userName, req.params.id, req.body)

    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/experiences/:id', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.deleteJobExperience(userName, req.params.id)

    next({})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/educations', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getEducations(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/educations/formalEducationLevel', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getFormalEducationLevel(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/educations/formalEducationLevel', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.setFormalEducationLevel(userName, req.body.level)

    next({})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/educations', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.addEducation(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.put('/profile/educations/:id', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.editEducation(userName, req.params.id, req.body)

    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/educations/:id', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.deleteEducation(userName, req.params.id)

    next({})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/deactivation', isAuthorized, (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.deactivateUserProfile(userName)
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(next)
})

router.post('/profile/activation', isAuthorized, (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  userInteractor.activateUserProfile(userName)
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
