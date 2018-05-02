const vacancyRepository = require('../infrastructure/vacancy.repository')
const PermissionError = require('../exceptions/permission.error')

async function getList(queryString) {
  return await vacancyRepository.getVacancies(queryString)
}

async function getById(id) {
  return await vacancyRepository.getById(id)
}

async function getUserVacancies(userName) {
  return await vacancyRepository.getByAuthorUserName(userName)
}

async function addVacancy(userName, vacancy) {
  vacancy.authorUserName = userName

  return await vacancyRepository.addVacancy(vacancy)
}

async function editVacancy(userName, id, vacancy) {
  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('edit is permitted only for author')
  }

  return await vacancyRepository.editVacancy(vacancy)
}

async function deleteVacancy(userName, id) {
  let foundVacancy = await vacancyRepository.getById(id)

  if (foundVacancy.authorUserName !== userName) {
    throw new PermissionError('delete is permitted only for author')
  }

  return await vacancyRepository.deleteVacancy(id)
}

module.exports = {
  getList,
  addVacancy,
  editVacancy,
  deleteVacancy,
  getUserVacancies,
  getById,
}
