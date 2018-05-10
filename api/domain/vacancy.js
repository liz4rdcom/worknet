const RecordError = require('../exceptions/record.error')

class Vacancy {
  addLanguage(language) {
    if (this.languages.find(item => item.languageName === language)) throw new RecordError('language already exists')

    this.languages.push({ languageName: language })
  }

  removeLanguage(language) {
    let index = this.languages.findIndex(item => item.languageName === language)

    if (index === -1) throw new RecordError('language does not exist')

    this.languages.splice(index, 1)
  }

  addSkill(skill) {
    if (this.skills.find(item => item.skillName === skill)) throw new RecordError('skill already exists')

    this.skills.push({ skillName: skill })
  }

  removeSkill(skill) {
    let index = this.skills.findIndex(item => item.skillName === skill)

    if (index === -1) throw new RecordError('skill does not exist')

    this.skills.splice(index, 1)
  }
}

module.exports = Vacancy
