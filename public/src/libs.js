import utils from './utils'
import webApi from './webApi'

/**
 * მისამართების ჩატვირთვა (რეგიონები და რაიონები)
 */
async function fetchLocationsOfGeorgia() {
  if (this.locationsOfGeorgia) return this.locationsOfGeorgia
  let response = await webApi.get('api/libs/locationsOfGeorgia', {headers: utils.getHeaders()})
  this.locationsOfGeorgia = response.data
  return this.locationsOfGeorgia
}

/**
 * განათლების ტიპების ჩატვირთვა.
 * @return {Array<String>}
 */
async function fetchEducationTypes() {
  if (this.educationTypes) return this.educationTypes
  let response = await webApi.get('api/libs/educationTypes', {headers: utils.getHeaders()})
  this.educationTypes = response.data
  return this.educationTypes
}

/**
 * განათლების საფეხურების ჩატვირთვა
 * @return {Array<String>}
 */
async function fetchEducationLevels() {
  if (this.educationLevels) return this.educationLevels
  let response = await webApi.get('api/libs/educationLevels', {headers: utils.getHeaders()})
  this.educationLevels = response.data
  return this.educationLevels
}

/**
 * ფორმალური განათლების საფეხურების ჩატვირთვა
 * @return {Array<String>}
 */
async function fetchFormalEducationLevels() {
  if (this.formalEducationLevels) return this.formalEducationLevels
  let response = await webApi.get('api/libs/formalEducationLevels', {headers: utils.getHeaders()})
  this.formalEducationLevels = response.data
  return this.formalEducationLevels
}

/**
 * ენების ჩატვირთვა
 * @return {Array<String>}
 */
async function fetchLanguages() {
  if (this.languagesSelect) return this.languagesSelect
  let response = await webApi.get('api/libs/languages', {headers: utils.getHeaders()})
  this.languagesSelect = response.data
  return this.languagesSelect
}

async function searchOcupations(occupation = '') {
  let response = await webApi.get('/api/occupations/search', {params: {query: occupation}})

  return response.data
}

export default {
  locationsOfGeorgia: undefined,
  educationTypes: undefined,
  educationLevels: undefined,
  formalEducationLevels: undefined,
  languagesSelect: undefined,
  fetchLocationsOfGeorgia,
  fetchEducationTypes,
  fetchEducationLevels,
  fetchFormalEducationLevels,
  fetchLanguages,
  searchOcupations,
}
