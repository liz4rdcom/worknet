<template>
<div id="vacancies" class="vacancies-container">
  <div class="upper-search-row">
    <b-row>
      <b-col>
        <b-navbar-brand href="#/login">შეუერთდით ვორქნეტს</b-navbar-brand>
      </b-col>

      <b-col>
        <div @keyup.enter="search">
          <b-form-input type="text" v-model="query" />
        </div>
      </b-col>

      <b-col>
        <locations idPrefix="desirable-job" :locations="locationsList" @onLocationChanged="onLocationChanged"></locations>
      </b-col>

      <b-col>
        <b-row>
          <b-col>
            <form>
              <b-form-input
                type="text"
                id="vacancies-filter-salary-from"
                required
                @click="minSalary($event.target.value)"
                placeholder="ხელფასი ლარიდან"
              />
            </form>
          </b-col>

          <b-col>
            <form>
              <b-form-input
                type="text"
                id="vacancies-filter-salary-to"
                required
                @click="maxSalary($event.target.value)"
                placeholder="ლარამდე"
              />
            </form>
          </b-col>
        </b-row>
      </b-col>

      <b-col>
        <b-button @click="search" style="width: 100%;"> <!-- <i class="fa fa-search fa-2x" aria-hidden="true"></i> -->
          ძებნა
        </b-button>
      </b-col>
    </b-row>

  </div>

  <div class="lower-search-row">
    <b-row>
      <b-col>
        <b-form-checkbox
          class="full-width"
          id="fullTime"
          v-model="filterObject.fullTime">
          სრული განაკვეთი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="partTime"
          v-model="filterObject.partTime"
        >
          არასრული განაკვეთი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="shiftBased"
          v-model="filterObject.shiftBased"
        >
          ცვლაში
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="interestedInInternship"
          v-model="filterObject.interestedInInternship"
        >
          სტაჟირება
        </b-form-checkbox>
      </b-col>

      <b-col>
        <b-form-checkbox
          class="full-width"
          id="interestedToBeVolunteer"
          v-model="filterObject.interestedToBeVolunteer"
        >
          მოხალისე
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          d="interestedInTemporaryJob"
          v-model="filterObject.interestedInTemporaryJob"
        >
          დროებითი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="interestedInDangerousJob"
          v-model="filterObject.interestedInDangerousJob"
        >
          სახიფათო
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="drivingLicence"
          v-model="filterObject.hasDrivingLicence"
        >
          მართვის მოწმობა
        </b-form-checkbox>
      </b-col>

      <b-col>
        <b-form-checkbox
          class="full-width"
          id="militaryObligation"
          v-model="filterObject.militaryObligation"
        >
          სამხედრო ვალდებულება
        </b-form-checkbox>
      </b-col>
    </b-row>
  </div>

  <div class="vacancies-search-content">
    <div class="vacancy-list-container">
      <b-list-group>
        <b-list-group-item
          v-for="vacancy in vacancies"
          :key="vacancy.id"
        >
          <h3>{{vacancy.positionName}}</h3>
          <h5>{{vacancy.organization}}</h5>
          <h5>{{vacancy.publishDate}}</h5>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="current-vacancy-container">
      <div class="current-vacancy-inner-container">
        <pre>{{
          JSON.stringify({currentVacancy}, null, 2)
        }}</pre>
      </div>
    </div>
  </div>

  <!-- <vacancies-search-list :vacancies="vacancies"></vacancies-search-list> -->
</div>
</template>

<script>
import find from 'lodash/find'
import locations from '../common/locations'
import utils from '../../utils'
import { bus } from '../common/bus'
import sideModal from '../common/side-modal'
import vacancyView from './vacancy-view'
import libs from '../../libs'
import vacancySearchList from './vacancies-search-list'
import dummyVacanciesList from './dummy-vacancies-list'

const baseUrl = '/api/vacancies/published'

export default {
  name: 'vacancies',
  components: {
    'side-modal': sideModal,
    'vacancy-view': vacancyView,
    locations,
    'vacancies-search-list': vacancySearchList,
  },
  data: () => ({
    vacancies: [],
    currentVacancyId: null,
    query: '',
    vacancyId: null,
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
      locations: [],
      skills: [],
    },
    locationsList: [],
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
    onLocationChanged(location) {
      this.filterObject.locations.push(location)
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
        let response = await this.$http.get(baseUrl, {params: {query: this.query}}, {headers: utils.getHeaders()}) // eslint-disable-line

        this.vacancies = dummyVacanciesList

        this.currentVacancyId = this.vacancies[0].id
        // this.vacancies = response.data
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  computed: {
    currentVacancy () {
      console.log(111, this.currentVacancyId, this.vacancies)
      return this.currentVacancyId !== null ? find(this.vacancies, nextVacan => nextVacan.id === this.currentVacancyId) : null
    },
  },
}
</script>

<style scoped>
.vacancies-container {
  width: 100%;
  height: 100%;
}
.upper-search-row {
  border-bottom: 1px solid #459e91;
  background-color: #4ABDAC;
  padding-right: 340px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.lower-search-row {
  border-bottom: 1px solid #46867c;
  background-color: #4ABDAC;
  padding-left: 340px;
  padding-right: 340px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.navbar-brand {
  padding: 0px;
  color: white;
  font-weight: bold;
}
.full-width {
  width: 100%;
}
.btn-secondary {
  background-color: #FC4A1A;
  border-color: #FC4A1A;
}
.btn-secondary:hover {
  background-color: #bf4d2e;
  border-color: #bf4d2e;
}
.vacancies-search-content {

}
.vacancy-list-container {

}
.current-vacancy-container {

}
.current-vacancy-inner-container {

}
</style>
