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

router.get('/profile/desirableJobs', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getDesirableJobs(userName)
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/desirableJobs', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.addDesirableJob(userName, req.body.name)
    next({})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/desirableJobs/:desirableJobName', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.removeDesirableJob(userName, req.params.desirableJobName)
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

router.get('/profile/languages', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getLanguages(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/languages', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.addLanguage(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/languages/:languageName', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.removeLanguage(userName, req.params.languageName)

    next({})
  } catch (error) {
    next({error})
  }
})

router.put('/profile/languages/:languageName/level', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    await userInteractor.setLanguageLevel(userName, req.params.languageName, req.body.languageLevel)

    next({})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/desirableJobLocations', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getDesirableJobLocations(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.delete('/profile/desirableJobLocations', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  let location = {
    locationName: req.query.locationName,
    locationUnitName: req.query.locationUnitName
  }
  try {
    await userInteractor.deleteDesirableJobLocations(userName, location)
    next({})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/desirableJobLocations', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addDesirableJobLocations(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/drivinglicence', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getDrivingLicence(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/drivinglicence', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addDrivingLicence(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/hasdrivinglicence', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getHasDrivingLicence(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/hasdrivinglicence', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addHasDrivingLicence(userName, req.body.hasDrivingLicence)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/militaryObligation', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getMilitaryObligation(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/militaryObligation', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addMilitaryObligation(userName, req.body.militaryObligation)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/desirableSalary', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getDesirableSalary(userName)
    
    next({result: {
      salary: result
    }})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/desirableSalary', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addDesirableSalary(userName, req.body.desirableSalary)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/jobDescription', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getJobDescription(userName)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/jobDescription', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addJobDescription(userName, req.body)

    next({result})
  } catch (error) {
    next({error})
  }
})

router.get('/profile/usemediationservice', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)

  try {
    let result = await userInteractor.getUseMediationService(userName)
    
    next({result})
  } catch (error) {
    next({error})
  }
})

router.post('/profile/usemediationservice', isAuthorized, async (req, res, next) => {
  let userName = utils.getUserNameFromRequest(req)
  try {
    let result = await userInteractor.addUseMediationService(userName, req.body.useMediationService)

    next({result})
  } catch (error) {
    next({error})
  }
})

module.exports = {
  router,
  baseUrl
}
