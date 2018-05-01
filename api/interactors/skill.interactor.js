const skillRepo = require('../infrastructure/skill.repository')

async function search(queryString) {
  return await skillRepo.search(queryString)
}

async function addIfNotExists(skillName) {
  let exists = await skillRepo.exists(skillName)

  if (exists) return

  await skillRepo.add(skillName)
}

module.exports = {
  search,
  addIfNotExists,
}
