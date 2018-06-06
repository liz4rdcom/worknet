const _ = require('lodash')
const PermissionError = require('../exceptions/permission.error')
const unprocessedOccupationToISCORelationsRepo = require('../infrastructure/unprocessed.occupation.to.ISCO.relations.repository')
const occupationInteractor = require('../interactors/occupation.interactor')
const libRepository = require('../infrastructure/lib.repository')

async function addRelation(occupationName, ISCOId) {
  const occupationsList = await occupationInteractor.search()

  if (!occupationsList.includes(occupationName)) {
    throw new PermissionError('There is no such occupation.', 400)
  }

  const ISCOList = await libRepository.getISCOList()

  if (_.find(ISCOList, nextISCO => nextISCO.id === ISCOId) === undefined) {
    throw new PermissionError('There is no such ISCO value.', 400)
  }

  const relationByOccupation = await unprocessedOccupationToISCORelationsRepo.findRelationByOccupation(occupationName)

  if (relationByOccupation.length > 1) {
    throw new PermissionError('There is more than one relation for occupation.', 500)
  }

  if (relationByOccupation.length === 1) {
    await unprocessedOccupationToISCORelationsRepo.deleteRelation(relationByOccupation[0].id)
  }

  return await unprocessedOccupationToISCORelationsRepo.addRelation(occupationName, ISCOId)
}

async function deleteRelation(id) {
  return await unprocessedOccupationToISCORelationsRepo.deleteRelation(id)
}

module.exports = {
  addRelation,
  deleteRelation,
}
