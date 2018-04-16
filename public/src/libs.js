import axios from 'axios'
import utils from './utils'

/**
 * მისამართების ჩატვირთვა (რეგიონები და რაიონები)
 */
async function fetchLocationsOfGeorgia() {
  if (this.locationsOfGeorgia) return this.locationsOfGeorgia
  let response = await axios.get('api/libs/locationsOfGeorgia', {headers: utils.getHeaders()})
  this.locationsOfGeorgia = response.data
  return this.locationsOfGeorgia
}

/**
 * განათლების ტიპების ჩატვირთვა.
 * @return {Array<String>}
 */
async function fetchEducationTypes() {
  if (this.educationTypes) return this.educationTypes
  let response = await axios.get('api/libs/educationTypes', {headers: utils.getHeaders()})
  this.educationTypes = response.data
  return this.educationTypes
}

/**
 * განათლების საფეხურების ჩატვირთვა
 * @return {Array<String>}
 */
async function fetchEducationLevels() {
  if (this.educationLevels) return this.educationLevels
  let response = await axios.get('api/libs/educationLevels', {headers: utils.getHeaders()})
  this.educationLevels = response.data
  return this.educationLevels
}

/**
 * ფორმალური განათლების საფეხურების ჩატვირთვა
 * @return {Array<String>}
 */
async function fetchFormalEducationLevels() {
  if (this.formalEducationLevels) return this.formalEducationLevels
  let response = await axios.get('api/libs/formalEducationLevels', {headers: utils.getHeaders()})
  this.formalEducationLevels = response.data
  return this.formalEducationLevels
}

export default {
  locationsOfGeorgia: undefined,
  educationTypes: undefined,
  educationLevels: undefined,
  formalEducationLevels: undefined,
  fetchLocationsOfGeorgia,
  fetchEducationTypes,
  fetchEducationLevels,
  fetchFormalEducationLevels
}
