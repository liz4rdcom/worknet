<template>
<div class="vacancy-view">
  <!-- <b-card title="ორგანიზაციის შესახებ">
    <label>ორგანიზაცია: <b>{{vacancy.organization}}</b></label><br />
    <label>მისამართი: <b>{{vacancy.locationName}} &nbsp; {{vacancy.locationUnitName}}</b></label><br />
  </b-card>
  <b-card title="თარიღები">
    <label>ვაკანსიის დადების თარიღი: <b>{{vacancy.publishDate}}</b></label><br />
    <label>გასაუბრებების დაწყების სავარაუდო თარიღი: <b>{{vacancy.interviewSupposedStartDate}}</b></label><br />
    <label>ბოლო ვადა: <b>{{vacancy.endDate}}</b></label><br />
  </b-card>
  <b-card title="ვაკანსიის მოკლე აღწერილობა">
    <label>პოზიცია: <b>{{vacancy.positionName}}</b></label><br />
    <label>ვაკანტური ადგილების რაოდენობა: <b>{{vacancy.vacantPlacesQuantity}}</b></label><br />
    <label>ანაზღაურება:
      <b v-if="vacancy.minimalSalary">
        {{vacancy.minimalSalary}} ლარიდან
      </b>
      <b v-if="vacancy.maximalSalary">
         {{vacancy.maximalSalary}} ლარამდე
      </b>
    </label><br />
    <label v-if="jobDescription.fullTime"><div class="chip">სრული განაკვეთი</div></label>
    <label v-if="jobDescription.partTime"><div class="chip">არასრული განაკვეთი</div></label>
    <label v-if="jobDescription.shiftBased"><div class="chip">ცვლებში</div></label>
  </b-card>
  <b-card title="განათლება">
    <label>განათლება: <b>{{vacancy.formalEducationLevelName}}</b></label>
  </b-card>
  <b-card title="ენები">
    <div class="chip" v-for="item in languagesArray" :key="item.languageName">
      {{item.languageName}}
    </div>
  </b-card>
  <b-card title="სკილები">
    <div class="chip" v-for="item in skillsArray" :key="item.skillName">
      {{item.skillName}}
    </div>
  </b-card>
  <b-card title="მართვის მოწმობა">
    <label v-if="drivingLicence.drivingLicenceA"><div class="chip">ლიცენზია A</div></label>
    <label v-if="drivingLicence.drivingLicenceB"><div class="chip">ლიცენზია B</div></label>
    <label v-if="drivingLicence.drivingLicenceC"><div class="chip">ლიცენზია C</div></label>
    <label v-if="drivingLicence.drivingLicenceD"><div class="chip">ლიცენზია D</div></label>
    <label v-if="drivingLicence.drivingLicenceE"><div class="chip">ლიცენზია E</div></label>
    <label v-if="drivingLicence.drivingLicenceT1"><div class="chip">ლიცენზია T1</div></label>
    <label v-if="drivingLicence.drivingLicenceT2"><div class="chip">ლიცენზია T2</div></label>
    <label v-if="drivingLicence.airLicence"><div class="chip">ფრენის ლიცენზია</div></label>
    <label v-if="drivingLicence.seaLicence"><div class="chip">საზღვაო ლიცენზია</div></label>
    <label v-if="drivingLicence.railwayLicence"><div class="chip">სარკინიგზო ლიცენზია</div></label>
  </b-card> -->
</div>
</template>

<script>
// const baseUrl = '/api/vacancies'

// export default {
//   name: 'vacancy-view',
//   props: ['id'],
//   data: () => ({
//     vacancy: {},
//     jobDescription: {
//       fullTime: false,
//       partTime: false,
//       shiftBased: false,
//     },
//     drivingLicence: {
//       drivingLicenceA: false,
//       drivingLicenceB: false,
//       drivingLicenceC: false,
//       drivingLicenceD: false,
//       drivingLicenceE: false,
//       drivingLicenceT1: false,
//       drivingLicenceT2: false,
//       airLicence: false,
//       seaLicence: false,
//       railwayLicence: false,
//     },
//     languagesArray: [],
//     skillsArray: [],
//   }),
//   async created() {
//     this.getById()
//   },
//   methods: {
//     goBack() {
//       this.$router.back()
//     },
//     async getById() {
//       let response = await this.$http.get(baseUrl + '/' + this.id)

//       this.vacancy = response.data

//       this.jobDescription.fullTime = response.data.fullTime
//       this.jobDescription.partTime = response.data.partTime
//       this.jobDescription.shiftBased = response.data.shiftBased

//       this.drivingLicence.drivingLicenceA = response.data.drivingLicenceA
//       this.drivingLicence.drivingLicenceB = response.data.drivingLicenceB
//       this.drivingLicence.drivingLicenceC = response.data.drivingLicenceC
//       this.drivingLicence.drivingLicenceD = response.data.drivingLicenceD
//       this.drivingLicence.drivingLicenceE = response.data.drivingLicenceE
//       this.drivingLicence.drivingLicenceT1 = response.data.drivingLicenceT1
//       this.drivingLicence.drivingLicenceT2 = response.data.drivingLicenceT2
//       this.drivingLicence.airLicence = response.data.airLicence
//       this.drivingLicence.seaLicence = response.data.seaLicence
//       this.drivingLicence.railwayLicence = response.data.railwayLicence

//       this.languagesArray = response.data.languages

//       this.skillsArray = response.data.skills
//     },
//   },
//   watch: {
//     id() {
//       this.getById()
//     },
//   },
//   computed: {
//     languagesText() {
//       let languages = this.vacancy.languages || []

//       return languages.map(item => item.languageName).join(' , ')
//     },
//     jobType() {
//       let types = []

//       if (this.vacancy.fullTime) types.push('სრული')
//       if (this.vacancy.partTime) types.push('არასრული')
//       if (this.vacancy.shiftBased) types.push('ცვლებში')

//       return types.join(' , ')
//     },
//     drivingLicences() {
//       let licences = []

//       let roadLicences = ['A', 'B', 'C', 'D', 'E', 'T1', 'T2']
//       const fieldBase = 'drivingLicence'

//       let existingLicences = roadLicences
//         .filter(licenceSign => !!this.vacancy[fieldBase + licenceSign])

//       licences = licences.concat(existingLicences)

//       if (this.vacancy.airLicence) licences.push('საჰაერო')
//       if (this.vacancy.seaLicence) licences.push('საზღვაო')
//       if (this.vacancy.railwayLicence) licences.push('სარკინიგზო')

//       return licences
//     },
//   },
// }
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

.chip {
    display: inline-block;
    padding: 0 25px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-radius: 25px;
    background-color: gold;
    margin: 5px;
  }
</style>
