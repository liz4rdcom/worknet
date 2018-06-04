const occupationRepo = require('../infrastructure/occupation.repository')

async function search(queryString) {
  return await occupationRepo.search(queryString)
}

async function addIfNotExists(occupationName) {
  let exists = await occupationRepo.exists(occupationName)

  if (exists) return

  await occupationRepo.add(occupationName)
}

module.exports = {
  search,
  addIfNotExists,
}
