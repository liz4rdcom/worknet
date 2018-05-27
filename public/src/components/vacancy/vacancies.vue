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
    <b-col class="vacancy-list-container" cols="4">
      <b-list-group>
        <b-list-group-item
          v-for="(vacancy, clickedIndexOnCurrentPage) in vacanciesOnCurrentPage"
          :key="vacancy.id"
          :active="currentVacancy !== null && currentVacancy.id === vacancy.id"
          @click="onVacancyClickInList(clickedIndexOnCurrentPage)"
        >
          <h5><b>{{vacancy.positionName}}</b></h5>
          <h6>{{vacancy.endDate | stringDateToDateMonthYearForm}}<i style="opacity: 0.6;">{{' - ბოლო ვადა'}}</i></h6>
          <h6>{{vacancy.organization}}</h6>
          <h6>{{vacancy.locationName}}{{', '}}{{vacancy.locationUnitName}}</h6>
        </b-list-group-item>
      </b-list-group>

      <b-pagination
        v-if="vacancies.length !== 0"
        size="md"
        :total-rows="vacancies !== null ? vacancies.length : 0"
        v-model="vacancyListCurrentPageIndex"
        :per-page="vacancyMaxCountOnPage"
        style="display: sticky;"
      />

      <b-container v-if="vacancies.length === 0">
        <b-form-group />

        თქვენი არჩეული პარამეტრებით ვაკანსიები ვერ მოიძებნა:

        <b-form-group />

        <ul>
          <li>დარწმუნდით რომ სიტყვების ან რიცხვების აკრეფისას შეცდომა არ დაგიშვიათ</li>
          <li>სცადეთ შედარებით ზოგადი, ყოვლისმომცველი პარამეტრებით ძიება</li>
        </ul>
      </b-container>
    </b-col>

    <b-col class="current-vacancy-container" cols="8">
      <div class="current-vacancy-inner-container">
        <vacancy-public-view v-if="currentVacancy !== null" :vacancy="currentVacancy" />
        <!-- {{'bb'}} -->
        <!-- {{currentVacancy}} -->
        <!-- {{currentVacancyIndex}} -->
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script>
// import find from 'lodash/find'
import georgiaLocations from '../common/georgia-locations'
import { bus } from '../common/bus'
import vacancyPublicView from '../common/vacancy-public-view'
import sideModal from '../common/side-modal'
import dummyVacanciesList from './dummy-vacancies-list'
// import libs from '../../libs'

export default {
  name: 'vacancies',
  data: () => ({
    vacancies: [],
    currentVacancyIndex: null,
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
    await this.search()
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

        this.vacancies = dummyVacanciesList
        // this.vacancies = []
        // this.vacancies = response.data

        if (response.data.length !== 0) {
          this.currentVacancyIndex = 0
        }
      } catch (error) {
      }
    },
    onVacancyClickInList (clickedIndexOnCurrentPage) {
      this.currentVacancyIndex = (this.vacancyListCurrentPageIndex - 1) * this.vacancyMaxCountOnPage + clickedIndexOnCurrentPage
    },
  },
  computed: {
    currentVacancy () {
      return this.currentVacancyIndex !== null ? this.vacancies[this.currentVacancyIndex] : null
    },
    vacanciesOnCurrentPage () {
      const startIndex = (this.vacancyListCurrentPageIndex - 1) * this.vacancyMaxCountOnPage

      if (startIndex > this.vacancies.length - 1) {
        return this.vacancies
      }

      return this.vacancies.slice(startIndex, this.vacancyListCurrentPageIndex * this.vacancyMaxCountOnPage)
    },
  },
  components: {
    'side-modal': sideModal,
    'vacancy-public-view': vacancyPublicView,
    'georgia-locations': georgiaLocations,
  },
}
</script>

<style lang="scss" scoped>
@import '@/main.scss';

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
  border-top: 8px solid $fresh;
  background: white;
  overflow-y: scroll;
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
.list-group-item:first-child {
  border-radius: 0px;
}
.list-group-item:last-child {
  border-radius: 0px;
}
</style>
