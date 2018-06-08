<template>
<div id="vacancies" class="vacancies-container">
  <div class="vacancy-search-bar">
    <b-row class="upper-search-row vancay-add-row">
      <b-col class="vacancy-brand-column">
        <b-navbar-brand href="#/login">შემოგვიერთდი</b-navbar-brand>
      </b-col>

      <b-col style="padding-left: 0px;" cols="3">
        <div @keyup.enter="search">
          <b-form-input type="text" v-model="filterObject.filter" placeholder="თანამდებობა, დამსაქმებელი ან სხვა..." :disabled="profileMatchingMode" />
        </div>
      </b-col>

      <b-col>
        <georgia-locations
          idPrefix="desirable-job"
          @onLocationChanged="onLocationChanged"
          :currentLocationName="null"
          :currentLocationUnitName="null"
          :disabled="profileMatchingMode"
        />
      </b-col>

      <b-col cols="4">
        <b-row class="vancay-add-row">
          <b-col style="padding-left: 0px; padding-right: 4px;">
            <form>
              <b-form-input
                type="text"
                id="vacancies-filter-salary-from"
                v-model.number="filterObject.minimalSalary"
                placeholder="ხელფასი ლარიდან"
                :disabled="profileMatchingMode"
              />
            </form>
          </b-col>

          <b-col style="padding-left: 4px; padding-right: 0px;">
            <form>
              <b-form-input
                type="text"
                id="vacancies-filter-salary-to"
                v-model.number="filterObject.maximalSalary"
                placeholder="ლარამდე"
                :disabled="profileMatchingMode"
              />
            </form>
          </b-col>
        </b-row>
      </b-col>

      <b-col style="padding-right: 0px;" cols="auto">
        <b-button @click="search" style="width: 100%;" class="vacancy-search-button" :disabled="profileMatchingMode">
          ძებნა
        </b-button>
      </b-col>

      <b-col class="profile-link-container">
        <a href="#/profile">
          <i class="fa fa-user-circle fa-2x"></i>
        </a>
      </b-col>
    </b-row>

    <b-form-group label="პროფილით ძიება" class="profile-matching-switcher" v-if="loggedIn">
      <b-form-radio-group
        v-model="profileMatchingMode"
        :button-variant="profileMatchingMode ? 'success' : 'secondary'"
        :options="[{text: 'კი', value: true}, {text: 'არა', value: false}]"
        buttons
        size="sm"
      />
      <b-btn
        v-b-popover.hover="profileMatchingHintText"
        title=""
        variant="outline-primary"
        class="hint-element-class"
      >
        <b>?</b>
      </b-btn>
    </b-form-group>

    <b-row class="lower-search-row vancay-add-row">
      <b-col style="padding-left: 0px; padding-right: 10px;" v-if="!profileMatchingMode">
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
          v-model="filterObject.isInternship"
        >
          სტაჟირება
        </b-form-checkbox>
      </b-col>

      <b-col style="padding-left: 10px; padding-right: 10px;" v-if="!profileMatchingMode">
        <b-form-checkbox
          class="full-width"
          id="drivingLicence"
          v-model="filterObject.hasDrivingLicence"
        >
          მართვის მოწმობა
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="militaryObligation"
          v-model="filterObject.militaryObligation"
        >
          სამხედრო ვალდებულება
        </b-form-checkbox>
      </b-col>

      <b-col style="padding-left: 0px; padding-right: 10px;" v-if="profileMatchingMode">
        <b-form-checkbox
          class="full-width"
          id="factLocation"
          v-model="profileMatchingFilters.factLocation">
          ფაქტიური მისამართი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="salary"
          v-model="profileMatchingFilters.salary"
        >
          ხელფასი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="workSchedule"
          v-model="profileMatchingFilters.workSchedule"
        >
          სამუშაო გრაფიკი
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="formalEducationLevel"
          v-model="profileMatchingFilters.formalEducationLevel"
        >
          განათლების დონე
        </b-form-checkbox>
      </b-col>

      <b-col style="padding-left: 10px; padding-right: 10px;" v-if="profileMatchingMode">
        <b-form-checkbox
          class="full-width"
          id="drivingLicenses"
          v-model="profileMatchingFilters.drivingLicenses"
        >
          მართვის მოწმობა
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          d="languages"
          v-model="profileMatchingFilters.languages"
        >
          ენები
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="skills"
          v-model="profileMatchingFilters.skills"
        >
          უნარები
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="jobExperiences"
          v-model="profileMatchingFilters.jobExperiences"
        >
          გამოცდილება
        </b-form-checkbox>
      </b-col>

      <b-col style="padding-left: 10px; padding-right: 0px;" v-if="profileMatchingMode">
        <b-form-checkbox
          class="full-width"
          id="desirableJobs"
          v-model="profileMatchingFilters.desirableJobs"
        >
          სასურველი სამსახური
        </b-form-checkbox>

        <b-form-checkbox
          class="full-width"
          id="desirableJobLocations"
          v-model="profileMatchingFilters.desirableJobLocations"
        >
          სასურ. სამუშაო ადგილი
        </b-form-checkbox>
      </b-col>

      <b-col style="padding-right: 0px;" cols="auto" v-if="profileMatchingMode">
        <b-button @click="searchByProfile" style="width: 100%;">
          პროფილით ძებნა
        </b-button>
      </b-col>
    </b-row>
  </div>

  <b-row class="vacancies-search-content vancay-add-row">
    <b-col class="vacancy-list-container" cols="4">
      <b-list-group>
        <b-list-group-item
          class="vacancy-list-item"
          v-for="(vacancy, clickedIndexOnCurrentPage) in vacanciesOnCurrentPage"
          :key="vacancy.id"
          :active="currentVacancy !== null && currentVacancy.id === vacancy.id"
          @click="onVacancyClickInList(clickedIndexOnCurrentPage)"
          button
        >
          <h5>
            <b>{{vacancy.positionName}}</b>
            <i
              v-if="vacancy._percent"
              v-bind:style="{
                color: 'red',
                opacity: percentStringToOpacity(vacancy._percent),
              }"
            >
              {{` - დამთხვევა: ${vacancy._percent}`}}
            </i>
          </h5>

          <h6>
            <i v-if="vacancy.approvedByMediationService" class="fa fa-check" style="color: green;">&nbsp;გადამოწმებულია</i>

            <i v-if="!vacancy.approvedByMediationService" class="fa fa-times" style="color: red;">&nbsp;გადაუმოწმებელია</i>
          </h6>

          <h6 v-if="vacancy.endDate">
            {{vacancy.endDate | stringDateToDateMonthYearForm}}<i style="opacity: 0.6;">{{' - ბოლო ვადა'}}</i>
          </h6>

          <h6 v-if="vacancy.organization">
            {{vacancy.organization}}
          </h6>

          <h6 v-if="vacancy.locationName && vacancy.locationUnitName">
            {{vacancy.locationName}}{{', '}}{{vacancy.locationUnitName}}
          </h6>
        </b-list-group-item>
      </b-list-group>

      <b-pagination
        v-if="vacancies.length !== 0"
        :limit="4"
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
        <vacancy-public-view v-if="currentVacancy !== null" :vacancy="currentVacancy" style="min-height: 100%;"/>
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
// import dummyVacanciesList from './dummy-vacancies-list'
import isNumber from 'lodash/isNumber'
// import libs from '../../libs'

export default {
  name: 'vacancies',
  props: ['loggedIn'],
  data: () => ({
    vacancies: [],
    currentVacancyIndex: null,
    vacancyListCurrentPageIndex: 1,
    vacancyMaxCountOnPage: 15,
    queryExpiredToo: true, // temporarily searches expired too
    filterObject: {
      filter: null,
      hasDrivingLicence: null,
      militaryObligation: false,
      fullTime: false,
      partTime: false,
      shiftBased: false,
      isInternship: false,
      minimalSalary: null,
      maximalSalary: null,
      locations: [],
      skills: [],
    },
    profileMatchingMode: false,
    profileMatchingFilters: {
      salary: true,
      workSchedule: true,
      formalEducationLevel: true,
      factLocation: true,
      drivingLicenses: true,
      languages: true,
      skills: true,
      jobExperiences: true,
      desirableJobs: true,
      desirableJobLocations: true,
    },
    profileMatchingHintText: 'პროფილის შევსების შემდეგ შეგიძლიათ მოძებნოთ ვაკანსიების სია, რომლებიც მიესადაგებიან თქვენს მიერ შევსებულ მონაცემებს',
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
    percentStringToOpacity(str) {
      const calcVal = (str.slice(0, str.length - 1) / 100)

      return calcVal > 0.3 ? calcVal : 0.3
    },
    onLocationChanged(location) {
      // TODO at this time only one. but it should be multiple
      if (location.locationName) {
        this.filterObject.locations = [location]
      } else {
        this.filterObject.locations = []
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
      if (
        (this.filterObject.minimalSalary && !isNumber(this.filterObject.minimalSalary)) ||
        (this.filterObject.maximalSalary && !isNumber(this.filterObject.maximalSalary))
      ) {
        bus.$emit('warning', 'ხელფასის ველებში გთხოვთ შეიყვანოთ რიცხვი')
        return
      }

      if (this.filterObject.minimalSalary &&
          this.filterObject.maximalSalary &&
          this.filterObject.maximalSalary < this.filterObject.minimalSalary
      ) {
        bus.$emit('warning', 'მაქსიმალური ხელფასი უნდა აღემატებოდეს მინიმალურს')
        return
      }

      try {
        let response = await this.$http.post('/api/vacancies/search', {params: this.filterObject, queryAll: this.queryExpiredToo}, { needsToken: false })

        // this.vacancies = dummyVacanciesList
        this.vacancies = response.data

        if (response.data.length !== 0) {
          this.currentVacancyIndex = 0
        } else {
          this.currentVacancyIndex = null
        }
      } catch (error) {
      }
    },
    async searchByProfile() {
      try {
        let response = await this.$http.post('/api/vacancies/profile/matchings', {projectionConfigFields: this.profileMatchingFilters})

        this.vacancies = response.data.list

        if (response.data.list.length !== 0) {
          this.currentVacancyIndex = 0
        } else {
          this.currentVacancyIndex = null
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
@import '@/color-palette.scss';

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
.profile-matching-switcher {
  position: absolute;
  left: 10px;
  width: 1px;
  padding-top: 4px;
  color: white;
}
.profile-link-container {
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
  border-bottom: 1px solid darken($palette-color-1, 7%);
  background-color: $palette-color-1;
  padding-left: $horizontal-shrink-size;
  padding-right: $horizontal-shrink-size;
  padding-top: 7px;
  padding-bottom: 7px;
}
.lower-search-row {
  border-bottom: 1px solid darken($palette-color-1, 10%);
  background-color: $palette-color-1;
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
.vacancy-search-button {
  background-color: $palette-color-2;
  border-color: $palette-color-2;
}
.vacancy-search-button:hover {
  background-color: darken($palette-color-2, 12%);
  border-color: darken($palette-color-2, 12%);
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
  border-top: 8px solid $palette-color-1;
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
.list-group-item:first-child {
  border-radius: 0px;
}
.list-group-item:last-child {
  border-radius: 0px;
}
.vacancy-list-item {
  outline: none;
  border-left: 5px solid transparent
}
.vacancy-list-item:hover {
  cursor: pointer;
}
.vacancy-list-item.active {
  border-left: 5px solid $palette-color-1;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-right: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #e9ecef;
  color: inherit;
}
.hint-element-class {
  border-radius: 50%;
  box-shadow: none !important;
}
</style>
