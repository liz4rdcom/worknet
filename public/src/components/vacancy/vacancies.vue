<template>
<div id="vacancies" class="vacancies-container">
  <div class="vacancy-search-bar">
    <b-row class="upper-search-row vancay-add-row">
      <b-col class="vacancy-brand-column">
        <b-navbar-brand href="#/login">შემოგვიერთდი</b-navbar-brand>
      </b-col>

      <b-col style="padding-left: 0px;" cols="3">
        <div @keyup.enter="search">
          <b-form-input type="text" v-model="filterObject.filter" placeholder="თანამდებობა, დამსაქმებელი ან სხვა..." />
        </div>
      </b-col>

      <b-col>
        <georgia-locations
          idPrefix="desirable-job"
          @onLocationChanged="onLocationChanged"
          :currentLocationName="null"
          :currentLocationUnitName="null"
        />
      </b-col>

      <b-col cols="4">
        <b-row class="vancay-add-row">
          <b-col style="padding-left: 0px; padding-right: 4px;">
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

          <b-col style="padding-left: 4px; padding-right: 0px;">
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

      <b-col style="padding-right: 0px;" cols="auto">
        <b-button @click="search" style="width: 100%;">
          ძებნა
        </b-button>
      </b-col>

      <b-col class="profile-link-container">
        <a href="#/profile">
          <i class="fa fa-user-circle fa-2x"></i>
        </a>
      </b-col>
    </b-row>

    <b-row class="lower-search-row vancay-add-row">
      <b-col style="padding-left: 0px; padding-right: 10px;">
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

      <b-col style="padding-left: 10px; padding-right: 10px;">
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

      <b-col style="padding-left: 10px; padding-right: 0px;">
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

  <b-row class="vacancies-search-content vancay-add-row">
    <b-col class="vacancy-list-container" cols="5">
      <b-list-group>
        <b-list-group-item
          v-for="vacancy in vacanciesOnCurrentPage"
          :key="vacancy.id"
          :active="currentVacancyId === vacancy.id"
          @click="onVacancyClickInList(vacancy.id)"
        >
          <h5><b>{{vacancy.positionName + ' - ' + vacancy.organization}}</b></h5>
          <h6>{{vacancy.publishDate}}</h6>
        </b-list-group-item>
      </b-list-group>

      <b-pagination size="md" :total-rows="vacancies !== null ? vacancies.length : 0" v-model="vacancyListCurrentPageIndex" :per-page="vacancyMaxCountOnPage" />
    </b-col>

    <b-col class="current-vacancy-container" cols="7">
      <div class="current-vacancy-inner-container">
        <vacancy-view :id="currentVacancyId" v-if="currentVacancyId !== null"></vacancy-view>
        <!-- {{currentVacancy}} -->
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script>
import find from 'lodash/find'
import georgiaLocations from '../common/georgia-locations'
import { bus } from '../common/bus'
import sideModal from '../common/side-modal'
import vacancyView from './vacancy-view'
// import libs from '../../libs'

export default {
  name: 'vacancies',
  components: {
    'side-modal': sideModal,
    'vacancy-view': vacancyView,
    'georgia-locations': georgiaLocations,
  },
  data: () => ({
    vacancies: [],
    currentVacancyId: null,
    vacancyListCurrentPageIndex: 1,
    vacancyMaxCountOnPage: 15,
    queryExpiredToo: false,
    filterObject: {
      filter: null,
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
  }),
  async created() {
    try {
      let response = await this.$http.post('/api/vacancies/search', {params: this.filterObject, queryAll: false}, { needsToken: false })

      this.vacancies = response.data

      this.currentVacancyId = this.vacancies[0].id
    } catch (error) {
    }
  },
  // watch: {
  //   filterObject: {
  //     async handler () {
  //       let response = await this.$http.post(baseUrl + '/search', this.filterObject, { needsToken: false })
  //       this.vacancies = response.data
  //     },
  //     deep: true,
  //   },
  // },
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
      // TODO at this time only one. but it should be multiple
      if (location.locationName) {
        this.filterObject.locations = [location]
      }
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
    async search() {
      try {
        let response = await this.$http.post('/api/vacancies/search', {params: this.filterObject, queryAll: this.queryExpiredToo}, { needsToken: false })

        this.vacancies = response.data

        this.currentVacancyId = this.vacancies[0].id
      } catch (error) {
      }
    },
    onVacancyClickInList (vacancyId) {
      this.currentVacancyId = vacancyId
    },
  },
  computed: {
    currentVacancy () {
      console.log('currentVacancy: ', this.currentVacancyId)

      return this.currentVacancyId !== null ? find(this.vacancies, nextVacan => nextVacan.id === this.currentVacancyId) : null
    },
    vacanciesOnCurrentPage () {
      const startIndex = (this.vacancyListCurrentPageIndex - 1) * this.vacancyMaxCountOnPage

      if (startIndex > this.vacancies.length - 1) {
        return this.vacancies
      }

      return this.vacancies.slice(startIndex, this.vacancyListCurrentPageIndex * this.vacancyMaxCountOnPage)
    },
  },
}
</script>

<style lang="scss" scoped>
$horizontal-shrink-size: 15%;

.vacancies-container {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.vacancy-brand-column {
  position: absolute;
  left: 0px;
  width: 1px;
  padding-top: 4px;
}
.profile-link-container{
  position: absolute;
  right: 28px;
  width: 1px;
  padding-top: 4px;
}
.vacancy-search-bar {
  flex: 0 1 auto;
  padding: 0px;
}
.upper-search-row {
  border-bottom: 1px solid #459e91;
  background-color: #4ABDAC;
  padding-left: $horizontal-shrink-size;
  padding-right: $horizontal-shrink-size;
  padding-top: 7px;
  padding-bottom: 7px;
}
.lower-search-row {
  border-bottom: 1px solid #46867c;
  background-color: #4ABDAC;
  padding-left: $horizontal-shrink-size;
  padding-right: $horizontal-shrink-size;
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
  padding: 18px $horizontal-shrink-size 8px $horizontal-shrink-size;

  height: 100%;

  flex: 1 1 auto;
}
.vacancy-list-container {
  overflow-y: scroll;
  min-height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  background: white;
  text-align: left;
}
.current-vacancy-container {
  padding-left: 8px;
  padding-right: 0px;
  height: 100%;
}
.current-vacancy-inner-container {
  height: 100%;
}
.list-group-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125)
}
.vancay-add-row {
  margin-left: 0px;
  margin-right: 0px;
}
.vacancy-view {
  height: 100%;
  overflow-y: scroll;
}
</style>
