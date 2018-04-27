<template>
<div id="">
  <div class="backButton">
    <a @click="goBack">
      <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
    </a>
  </div>
  <label>პოზიცია: <b>{{vacancy.positionName}}</b></label><br />
  <label>ორგანიზაცია: <b>{{vacancy.organization}}</b></label><br />
  <label>მისამართი: <b>{{vacancy.locationName}} &nbsp; {{vacancy.locationUnitName}} &nbsp; {{vacancy.addressLine}}</b></label><br />
  <label>ვაკანსიის დადების თარიღი: <b>{{vacancy.publishDate}}</b></label><br />
  <label>გასაუბრებების დაწყების სავარაუდო თარიღი: <b>{{vacancy.interviewSupposedStartDate}}</b></label><br />
  <label>ბოლო ვადა: <b>{{vacancy.endDate}}</b></label><br />
  <label>ვაკანტური ადგილები: <b>{{vacancy.vacantPlacesQuantity}}</b></label><br />
  <label>ანაზღაურება: <b>{{vacancy.salaryInfoName}}</b></label><br />
  <label>განათლების საფეხური: <b>{{vacancy.formalEducationLevelName}}</b></label><br />
  <label>სავალდებულო ენები: <b>{{languagesText}}</b></label><br />
  <label>სამუშაოს ტიპი: <b>{{jobType}}</b></label><br />

  <label v-if="drivingLicences.length > 0">
      <span v-if="drivingLicences.length === 1">სავალდებულო მართვის მოწმობა</span>
      <span v-else>სავალდებულო მართვის მოწმობები</span>
      : <b>{{drivingLicences.join(' , ')}}</b>
  </label><br />

  <div class="description">
    <div class="description-title">სამუშაოს აღწერა</div>
    <div class="description-text">{{vacancy.functionsDescription}}</div>
  </div>

  <div class="list-field">
    <div class="list-title">სავალდებულო მოთხოვნები:</div>
    <ul>
      <li v-for="skill in vacancy.skills" :key="skill.skillName">{{skill.skillName}}</li>
    </ul>
  </div>

  <div class="description">
    <div class="description-title">დამატებითი ინფორმაცია</div>
    <div class="description-text">{{vacancy.additionalDescription}}</div>
  </div>

</div>
</template>

<script>
const baseUrl = '/api/vacancies'

export default {
  name: 'vacancy-view',
  props: ['id'],
  data: () => ({
    vacancy: {}
  }),
  created() {
    this.$http.get(baseUrl + '/' + this.id)
      .then(response => {
        this.vacancy = response.data
      })
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  },
  computed: {
    languagesText() {
      let languages = this.vacancy.languages || []

      return languages.map(item => item.languageName).join(' , ')
    },
    jobType() {
      let types = []

      if (this.vacancy.fullTime) types.push('სრული')
      if (this.vacancy.partTime) types.push('არასრული')
      if (this.vacancy.shiftBased) types.push('ცვლებში')

      return types.join(' , ')
    },
    drivingLicences() {
      let licences = []

      let roadLicences = ['A', 'B', 'C', 'D', 'E', 'T1', 'T2']
      const fieldBase = 'drivingLicence'

      let existingLicences = roadLicences
        .filter(licenceSign => !!this.vacancy[fieldBase + licenceSign])

      licences = licences.concat(existingLicences)

      if (this.vacancy.airLicence) licences.push('საჰაერო')
      if (this.vacancy.seaLicence) licences.push('საზღვაო')
      if (this.vacancy.railwayLicence) licences.push('სარკინიგზო')

      return licences
    }
  }
}
</script>

<style scoped>
.description {
  border: groove;
  border-width: 3px;
  text-align: start;
  padding: 15px;
  margin-left: 1%;
  margin-right: 1%;
}

.description-title {
  align-self: left;
  font-weight: bold;
}

.description-text {
  margin: 5px;
}

.list-field {
  text-align: start;
  padding: 15px;
  margin-left: 1%;
  margin-right: 1%;
}

.list-title {
  align-self: left;
  font-weight: bold;
}

.backButton {
  text-align: start;
  margin-left: 5%;
}
</style>
