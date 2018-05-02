const desirableTrainingRepo = require('../infrastructure/desirable.training.repository')

async function search(queryString) {
  return await desirableTrainingRepo.search(queryString)
}

async function addIfNotExists(desirableTraining) {
  let exists = await desirableTrainingRepo.exists(desirableTraining)

  if (exists) return

  await desirableTrainingRepo.add(desirableTraining)
}

module.exports = {
  search,
  addIfNotExists,
}
