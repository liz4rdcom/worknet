const desirableJobRepo = require('../infrastructure/desirable.job.repository')

async function search(queryString) {
  return await desirableJobRepo.search(queryString)
}

async function addIfNotExists(desirableJobName) {
  let exists = await desirableJobRepo.exists(desirableJobName)

  if (exists) return

  await desirableJobRepo.add(desirableJobName)
}

module.exports = {
  search,
  addIfNotExists,
}
