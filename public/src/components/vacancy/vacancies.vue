<template>
<div id="vacancies">
  <div class="searchArea">
    <div class="form-group flex" @keyup.enter="search">
      <input type="text" class="form-control" v-model="query">
    </div>
    &nbsp;
    <b-button class="searchButton" variant="primary" size="" @click="search">
      <i class="fa fa-search fa-2x" aria-hidden="true"></i>
    </b-button>
    <b-button @click="filter = !filter, fillSalaryType()">Filter</b-button>
  </div>
  <b-card v-if="filter">
    <b-row>
      <b-col lg="6">
        <div>
            <form class="go-bottom">
            <div>
              <input id="vacancies-filter-salary-from" name="name" type="text" required @click="minSalary($event.target.value)">
              <label for="name">ხელფასი ლარიდან</label>
            </div>
          </form>
          <form class="go-bottom">
            <div>
              <input id="vacancies-filter-salary-to" name="name" type="text" required @click="maxSalary($event.target.value)">
              <label for="name">ლარამდე</label>
            </div>
          </form>
        </div>
        <div>
          <locations idPrefix="desirable-job" :locations="locationsList" @onLocationChanged="onLocationChanged"></locations>
        </div>
        <div>
          <b-form-select class="mb-2 mr-sm-2 mb-sm-0"
                     v-model="filterObject.salaryTypeName"
                     :value="null"
                     :options="salaryTypes"
                     value-field="typeName" text-field="typeName"
                     id="inlineFormCustomSelectPref">
        <option slot="first" :value="null">-აირჩიეთ ხელფასის ტიპი-</option>
      </b-form-select>
        </div>
        <b-form-checkbox id="isSalaryByEarnings"
        v-model="filterObject.isSalaryByEarnings">
        გამომუშავება
      </b-form-checkbox>
      </b-col>
      <b-col lg="6">
        <b-form-checkbox id="drivingLicence"
        v-model="filterObject.hasDrivingLicence">
        მართვის მოწმობა
      </b-form-checkbox>
      <b-form-checkbox id="militaryObligation"
        v-model="filterObject.militaryObligation">
        სამხედრო ვალდებულება
      </b-form-checkbox>
      <div>
        <b-form-checkbox id="fullTime"
        v-model="filterObject.fullTime">
        სრული განაკვეთი
      </b-form-checkbox>
      <b-form-checkbox id="partTime"
        v-model="filterObject.partTime">
        არასრული განაკვეთი
      </b-form-checkbox>
      <b-form-checkbox id="shiftBased"
        v-model="filterObject.shiftBased">
        ცვლაში
      </b-form-checkbox>
      <b-form-checkbox id="interestedInInternship"
        v-model="filterObject.interestedInInternship">
        სტაჟირება
      </b-form-checkbox>
      <b-form-checkbox id="interestedToBeVolunteer"
        v-model="filterObject.interestedToBeVolunteer">
        მოხალისე
      </b-form-checkbox>
      <b-form-checkbox id="interestedInTemporaryJob"
        v-model="filterObject.interestedInTemporaryJob">
        დროებითი
      </b-form-checkbox>
      <b-form-checkbox id="interestedInDangerousJob"
        v-model="filterObject.interestedInDangerousJob">
        სახიფათო
      </b-form-checkbox>
      </div>
      </b-col>
    </b-row>
  </b-card>
  <b-card>
      <div class="chip" v-for="item in desirableJobLocations" :key="item.locationName + ' ' + item.locationUnitName">
          {{item.locationName}} - {{item.locationUnitName}}
          <span class="closebtn" @click="removeLocation(item)">&times;</span>
        </div>
  </b-card>
  <b-card>
    <div class="chip" v-for="item in skillArray" :key="item.skillName">
        {{item.skillName}}
        <span class="closebtn" @click="removeSkill(item)">&times;</span>
      </div>
</b-card>
  <b-card class="mb-2 vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
    <div @click="viewVacancy(vacancy.id)">
      <h3 class="card-title">{{vacancy.positionName}}</h3>
      <h5 class="card-text">{{vacancy.organization}}</h5>
      <h5 class="card-text" v-if="vacancies.averageSalaryName !== ''">{{vacancy.averageSalaryName}}</h5>
      <h5 class="card-text">{{getFunctionDescription(vacancy)}}</h5>
      <h5 class="card-text" v-for="skill in getSkills(vacancy)" :key="skill.skillName" @click="skillFilter(skill.skillName, $event)">{{skill.skillName}}</h5>
      <h5 class="card-text">{{vacancy.publishDate}}</h5>
      <h5 class="card-text">სრულად ნახვა...</h5>
    </div>
  </b-card>
  <side-modal ref="modalRef">
    <vacancy-view :id="vacancyId" v-if="vacancyId"></vacancy-view>
  </side-modal>
</div>
</template>

<script>
import locations from '../common/locations'
import utils from '../../utils'
import { bus } from '../common/bus'
import sideModal from '../common/side-modal'
import vacancyView from './vacancy-view'
import libs from '../../libs'

const baseUrl = '/api/vacancies/published'

export default {
  name: 'vacancies',
  components: {
    'side-modal': sideModal,
    'vacancy-view': vacancyView,
    locations,
  },
  data: () => ({
    vacancies: [],
    query: '',
    vacancyId: null,
    filter: false,
    filterObject: {
      hasDrivingLicence: null,
      militaryObligation: false,
      fullTime: false,
      partTime: false,
      shiftBased: false,
      interestedInInternship: false,
      interestedToBeVolunteer: false,
      interestedInTemporaryJob: false,
      interestedInDangerousJob: false,
      minimalSalary: null,
      maximalSalary: null,
      salaryTypeName: null,
      isSalaryByEarnings: false,
      locations: [],
      skills: [],
    },
    skillArray: [],
    desirableJobLocations: [],
    locationsList: [],
    salaryTypes: [],
  }),
  async created() {
    this.locationsList = await libs.fetchLocationsOfGeorgia()

    try {
      let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})
      this.vacancies = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  watch: {
    filterObject: {
      async handler () {
        let response = await this.$http.post('/api/vacancies/search', this.filterObject, { needsToken: false })
        this.vacancies = response.data
      },
      deep: true,
    },
  },
  methods: {
    maxSalary (value) {
      if (isNaN(value)) {
        bus.$emit('warning', 'გთხოვთ შეიყვანოთ რიცხვი')
        return
      }

      value = parseInt(value)

      if (value <= this.filterObject.minimalSalary) {
        bus.$emit('warning', 'მაქსიმალური რიცხვი უნდა აღემატებოდეს მინიმალურს')
        return
      }

      this.filterObject.maximalSalary = value
    },
    minSalary (value) {
      if (isNaN(value)) {
        bus.$emit('warning', 'გთხოვთ შეიყვანოთ რიცხვი')
        return
      }

      value = parseInt(value)

      this.filterObject.minimalSalary = value
    },
    async fillSalaryType () {
      try {
        this.salaryTypes = await libs.fetchSalaryTypes()
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    skillFilter (skill, event) {
      event.stopPropagation()
      this.skillArray.push({skillName: skill})
      this.filterObject.skills = this.skillArray
    },
    removeLocation: async function (item) {
      try {
        let index = this.desirableJobLocations.findIndex((d) => d.locationName === item.locationName && d.locationUnitName === item.locationUnitName)
        this.desirableJobLocations.splice(index, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async removeSkill (item) {
      try {
        let index = this.skillArray.findIndex((d) => d.skillName === item.skillName)
        this.skillArray.splice(index, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    onLocationChanged(location) {
      this.filterObject.locations.push(location)
      try {
        if (this.filterObject.locations.locationName !== '' || this.filterObject.locations.locationUnitName !== '') {
          this.desirableJobLocations = this.filterObject.locations
        } else {
          bus.$emit('warning', 'გთხოვთ შეავსოთ მონაცემები')
        }
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    getFunctionDescription(vacancy) {
      if (!vacancy.functionsDescription) {
        return ''
      }
      let arr = vacancy.functionsDescription.split(' ', 10)
      let string = ''
      for (let i = 0; i < arr.length; i++) {
        string += arr[i] + ' '
      }
      return string
    },
    getSkills(vacancy) {
      if (!vacancy.skills) {
        return ''
      }
      let arr = []
      let vacancyLeght = vacancy.skills.length
      if (vacancyLeght > 10) {
        vacancyLeght = 10
      }
      for (let i = 0; i < vacancyLeght; i++) {
        arr.push(vacancy.skills[i])
      }
      return arr
    },
    viewVacancy(vacancyId) {
      this.vacancyId = vacancyId
      this.$refs.modalRef.sideModalOpen()
    },
    async search() {
      try {
        let response = await this.$http.get(baseUrl, {params: {query: this.query}}, {headers: utils.getHeaders()})
        this.vacancies = response.data
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
}
</script>

<style scoped>
.vacancy:hover {
  box-shadow: 0 0 6px rgba(161, 161, 161, 0.89);
}

.searchArea {
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: auto;
  padding: 20px;
  vertical-align: center;
}

.form-group {
  margin-top: 16px;
}

.searchButton {
  border-radius: 50%;
  margin: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
}
* {
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

form {
  width: 320px;
  float: left;
  margin: 20px;
}

form > div {
  position: relative;
  overflow: hidden;
}

form label {
  transition:
    background 0.2s,
    color 0.2s,
    top 0.2s,
    bottom 0.2s,
    right 0.2s,
    left 0.2s;
  position: absolute;
  color: #999;
  padding: 7px 6px;
}

form textarea {
  display: block;
  resize: vertical;
}

form input, textarea {
  width: 100%;
  border: 2px solid gray;
  background: none;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 8px 12px;
  outline: 0;
}

form textarea:valid {
  background: white;
}

form input:valid {
  background: white;
}

form textarea:focus {
  border-color: #3A9F02;
}

form input:focus {
  border-color: #3A9F02;
}

form textarea:focus + label {
  background: #3A9F02;
  color: white;
  font-size: 70%;
  padding: 1px 6px;
  z-index: 2;
  text-transform: uppercase;
  margin-bottom: 0;
}

form input:focus + label {
  background: #3A9F02;
  color: white;
  font-size: 70%;
  padding: 1px 6px;
  z-index: 2;
  text-transform: uppercase;
  margin-bottom: 0;
}

form.go-bottom input, textarea {
  padding: 12px 12px 12px 12px;
}

form.go-bottom label {
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

form.go-bottom input:focus, textarea:focus {
  padding: 4px 6px 20px 6px;
}

form.go-bottom input:focus + label {
  top: 100%;
  margin-top: -16px;
}
form.go-bottom textarea:focus + label {
  top: 100%;
  margin-top: -16px;
}

form.go-right label {
  top: 2px;
  right: 100%;
  width: 100%;
  margin-right: -100%;
  bottom: 2px;
}

form.go-right input:focus + label {
  right: 0;
  margin-right: 0;
  width: 30%;
  padding-top: 5px;
}
form.go-right textarea:focus + label {
  right: 0;
  margin-right: 0;
  width: 30%;
  padding-top: 5px;
}
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 45px;
  border-radius: 25px;
  background-color: gold;
  margin: 5px;
}

.closebtn {
  padding-left: 10px;
  color: #888;
  font-weight: bold;
  float: right;
  font-size: 20px;
  cursor: pointer;
}

.closebtn:hover {
  color: #000;
}
</style>
