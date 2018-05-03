const _ = require('lodash')
const skillRepo = require('../infrastructure/skill.repository')

async function search(queryString) {
  return await skillRepo.search(queryString)
}

async function addIfNotExists(skillNames) {
  const skillsToIter = _.isArray(skillNames) ? skillNames : [skillNames]

  skillsToIter.forEach(async nextSk => {
    let exists = await skillRepo.exists(nextSk)

    if (exists) return

    await skillRepo.add(nextSk)
  })
}

module.exports = {
  search,
  addIfNotExists,
}
