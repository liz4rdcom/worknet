<template>
  <div class="vacancy-add">
    <data-shower :data="this.$data" />

    <h1 class="hint-element">დაამატეთ ვაკანსია</h1>

    <b-form-group label="თანამდებობა">
      <b-form-input id="vacancy-add-position" autofocus type="text" v-model="vacancy.positionName"
      ></b-form-input>
    </b-form-group>

    <b-card>
      <b-form-checkbox
        v-model="isOrganization"
        :value="false"
        :unchecked-value="true"
        id="vacancy-add-is-organization-checkbox"
      >
        არ ვაქვეყნებ ორგანიზაციის სახელით
      </b-form-checkbox>

      <b-form-group v-if="isOrganization" label="ორგანიზაცია">
        <b-form-input id="vacancy-add-organization-name" type="text" v-model="vacancy.organization"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="isOrganization" label="საგადასახადო კოდი">
        <b-form-input id="vacancy-add-organization-taxcode" type="text" v-model="vacancy.organizationTaxCode"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="!isOrganization" label="გამომქვეყნებლის სრული სახელი">
        <b-form-input id="vacancy-add-author-full-name" type="text" v-model="vacancy.authorFullName"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="!isOrganization" label="გამომქვეყნებლის პირადი ნომერი">
        <b-form-input id="vacancy-add-author-personal-id" type="text" v-model="vacancy.authorPersonalId"
        ></b-form-input>
      </b-form-group>
    </b-card>

    <b-form-group label="ადგილდებარეობა">
      <georgia-locations
        idPrefix="vacancy-add"
        :onLocationChanged="onLocationChanged"
        :currentLocationName="vacancy.locationName"
        :currentLocationUnitName="vacancy.locationUnitName"
      />
    </b-form-group>

    <b-form-group label="დამატებითი მისამართი">
      <b-form-textarea
        id="vacancy-add-adress-line"
        v-model="vacancy.addressLine"
        :rows="3"
        :max-rows="6"
      >
      </b-form-textarea>
    </b-form-group>

    <b-form-group label="გასაუბრებების დაწყების სავარაუდო თარიღი">
      <b-container>
          <b-row>
            <b-col class="interview-supposed-start-day">
                <b-form-select id="vacancy-add-interview-supposed-start-day" v-model="vacancy.interviewSupposedStartDay" :options="daysOptions"/>
            </b-col>

            <b-col class="interview-supposed-start-month">
                <b-form-select id="vacancy-add-interview-supposed-start-month" v-model="vacancy.interviewSupposedStartMonth" :options="monthOptions"/>
            </b-col>

            <b-form-radio-group
              v-model="vacancy.interviewSupposedStartYear"
              name="radioSubComponent"
              button-variant="outline-primary"
              buttons
              stacked
            >
              <b-form-radio id="vacancy-add-interview-supposed-start-year-current" :value="new Date().getFullYear()">{{new Date().getFullYear() + " წელი"}}</b-form-radio>
              <b-form-radio id="vacancy-add-interview-supposed-start-year-next" :value="new Date().getFullYear() + 1">{{new Date().getFullYear() + 1 + " წელი"}}</b-form-radio>
            </b-form-radio-group>
          </b-row>
      </b-container>
    </b-form-group>

    <b-form-group label="ვაკანსიის დახურვის თარიღი">
        <b-container>
            <b-row>
              <b-col class="end-date-day">
                  <b-form-select id="vacancy-add-end-date-day" v-model="vacancy.endDateDay" :options="daysOptions"/>
              </b-col>

              <b-col class="end-date-month">
                  <b-form-select id="vacancy-add-end-date-month" v-model="vacancy.endDateMonth" :options="monthOptions"/>
              </b-col>

              <b-col class="end-date-year">
                  <b-form-select id="vacancy-add-end-date-year" v-model="vacancy.endDateYear" :options="endDateYearOptions"/>
              </b-col>
            </b-row>
        </b-container>
    </b-form-group>

    <b-form-checkbox
      id="vacancy-add-use-mediation-service"
      v-model="vacancy.useMediationService"
      :value="true"
      :unchecked-value="false"
    >
      გამოიყენეთ მედიაციის სერვისი
    </b-form-checkbox>

    <b-form-group label="ვაკანტური ადგილების რაოდენობა"> <!-- optional -->
      <b-form-input id="vacancy-add-vacant-places" type="number" v-model="vacancy.vacantPlacesQuantity" />
    </b-form-group>

    <b-form-group label="თანამდებობრივი მოვალეობის აღწერილობა"> <!-- optional -->
      <b-form-textarea
        id="vacancy-add-functions-description"
        v-model="vacancy.functionsDescription"
        :rows="3"
        :max-rows="6"
      >
      </b-form-textarea>
    </b-form-group>

    <b-form-group label="დამატებითი აღწერილობა"> <!-- optional -->
      <b-form-textarea
        id="vacancy-add-additional-description"
        v-model="vacancy.additionalDescription"
        :rows="3"
        :max-rows="6"
      >
      </b-form-textarea>
    </b-form-group>

    <b-container class="mb-4">
      <b-row>
        <b-col><legend class="col-form-legend">ხელფასი დან</legend></b-col>
        <b-col cols="0"></b-col>
        <b-col><legend class="col-form-legend">ხელფასი მდე</legend></b-col>
      </b-row>
      <b-row>
        <b-col class="salary-from">
          <b-form-input id="vacancy-add-salary-from" v-model="vacancy.minimalSalary"/>
        </b-col>
        <b-col cols="0">-</b-col>
        <b-col class="salary-to">
          <b-form-input id="vacancy-add-salary-to" v-model="vacancy.maximalSalary"/>
        </b-col>
      </b-row>
    </b-container>

    <b-card>
        <b-form-checkbox
          id="vacancy-add-full-time"
          v-model="vacancy.fullTime"
          :value="true"
          :unchecked-value="false"
        >
          სრული განაკვეთი
        </b-form-checkbox>

        <b-form-checkbox
          id="vacancy-add-part-time"
          v-model="vacancy.partTime"
          :value="true"
          :unchecked-value="false"
        >
          ნახევარი განაკვეთი
        </b-form-checkbox>

        <b-form-checkbox
          id="vacancy-add-shift-based"
          v-model="vacancy.shiftBased"
          :value="true"
          :unchecked-value="false"
        >
          სმენები
        </b-form-checkbox>
    </b-card>

    <b-form-group label="განათლების რეკომენდირებული მინიმალური დონე">
      <b-form-select id="vacancy-add-formal-education-level-name" v-model="vacancy.formalEducationLevelName">
        <option v-for="(level, index) in formalEducationLevelsOptions" :key="index">{{level}}</option>
      </b-form-select>
    </b-form-group>

    <b-card>
      <b-form-checkbox
        id="vacancy-add-should-have-driving-licence"
        v-model="shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        საჭიროა მართვის მოწმობის ქონა
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-A"
        v-model="vacancy.drivingLicenceA"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "A"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-B"
        v-model="vacancy.drivingLicenceB"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "B"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-C"
        v-model="vacancy.drivingLicenceC"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "C"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-D"
        v-model="vacancy.drivingLicenceD"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "D"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-E"
        v-model="vacancy.drivingLicenceE"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "E"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-T1"
        v-model="vacancy.drivingLicenceT1"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "T1"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-driving-licence-T2"
        v-model="vacancy.drivingLicenceT2"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        კატეგორია "T2"
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-air-licence"
        v-model="vacancy.airLicence"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        ფრენის ლიცენზია
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-sea-licence"
        v-model="vacancy.seaLicence"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        საზღვაო ტრანსპორტის ლიცენზია
      </b-form-checkbox>

      <b-form-checkbox
        id="vacancy-add-railway-licence"
        v-model="vacancy.railwayLicence"
        :disabled="!shouldHaveDrivingLicence"
        :value="true"
        :unchecked-value="false"
      >
        სარკინიგზო ტრანსპორტის ლიცენზია
      </b-form-checkbox>
    </b-card>

    <languages :languages="vacancy.languages" :onChange="languagesOnChange"/>

    <vacancy-skills :skills="vacancy.skills" :onChange="skillsOnChange"/>

    <b-button variant="secondary" @click="saveAsDraft">მონახაზად შენახვა</b-button>

    <b-button variant="primary" @click="onSubmit">დამატება</b-button>
  </div>
</template>

<script>
import reverse from 'lodash/reverse'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import georgiaLocations from '../../common/georgia-locations'
import { MAX_DAYS_IN_MONTH, MONTH_NAMES, VACANCY_END_MAX_YEAR_COUNT } from '../../../constants'
import utils from '../../../utils'
import { bus } from '../../common/bus'
import libs from '../../../libs'
import autocomplete from '../../common/autocomplete'
import dataShower from '../../common/data-shower'
import languages from './languages'
import vacancySkills from './vacancy-skills'

const baseUrl = '/api/vacancies'

export default {
  name: 'vacancy-add',
  props: ['id'],
  data: () => ({
    vacancy: {
      positionName: null,
      organization: null,
      organizationTaxCode: null,
      authorFullName: null,
      authorPersonalId: null,
      locationName: null,
      locationUnitName: null,
      addressLine: null,
      interviewSupposedStartDay: null,
      interviewSupposedStartMonth: null,
      interviewSupposedStartYear: new Date().getFullYear(),
      endDateDay: null,
      endDateMonth: null,
      endDateYear: null,
      useMediationService: false,
      vacantPlacesQuantity: null,
      functionsDescription: null,
      additionalDescription: null,
      minimalSalary: null,
      maximalSalary: null,
      fullTime: null,
      partTime: null,
      shiftBased: null,
      formalEducationLevelName: '- აირჩიე -',
      drivingLicenceA: false,
      drivingLicenceB: false,
      drivingLicenceC: false,
      drivingLicenceD: false,
      drivingLicenceE: false,
      drivingLicenceT1: false,
      drivingLicenceT2: false,
      airLicence: false,
      seaLicence: false,
      railwayLicence: false,
      languages: [],
      skills: [],
    },
    formalEducationLevels: [],
    isOrganization: true,
    shouldHaveDrivingLicence: false,
  }),
  async created() {
    try {
      this.formalEducationLevels = await libs.fetchFormalEducationLevels()
    } catch (error) {
      bus.$emit('error', error)
    }

    this.loadVacancy()
  },
  methods: {
    async loadVacancy() {
      if (this.id) {
        try {
          let vacancyResult = await this.$http.get(baseUrl + '/' + this.id, {headers: utils.getHeaders()})

          vacancyResult = vacancyResult.data

          if (vacancyResult.positionName) {
            this.vacancy.positionName = vacancyResult.positionName
          }

          if (vacancyResult.organization) {
            this.vacancy.organization = vacancyResult.organization
            this.vacancy.organizationTaxCode = vacancyResult.organizationTaxCode
          } else {
            this.isOrganization = false

            this.vacancy.authorFullName = vacancyResult.authorFullName

            if (vacancyResult.authorPersonalId) {
              this.vacancy.authorPersonalId = vacancyResult.authorPersonalId
            }
          }

          // todo es ormagi binding ar ari da miuxedavad imisa ro cvlads vanijer mainc ar icvleba dropdown
          if (vacancyResult.locationName) {
            this.vacancy.locationName = vacancyResult.locationName
          }

          if (vacancyResult.locationUnitName) {
            this.vacancy.locationUnitName = vacancyResult.locationUnitName
          }

          if (vacancyResult.addressLine) {
            this.vacancy.addressLine = vacancyResult.addressLine
          }

          if (vacancyResult.interviewSupposedStartDate) {
            const interviewSupposedStartDateConstructed = new Date(vacancyResult.interviewSupposedStartDate)

            this.vacancy.interviewSupposedStartDay = interviewSupposedStartDateConstructed.getDate()
            this.vacancy.interviewSupposedStartMonth = interviewSupposedStartDateConstructed.getMonth()
            this.vacancy.interviewSupposedStartYear = interviewSupposedStartDateConstructed.getFullYear()
          }

          if (vacancyResult.endDate) {
            const endDateConstructed = new Date(vacancyResult.endDate)

            this.vacancy.endDateDay = endDateConstructed.getDate()
            this.vacancy.endDateMonth = endDateConstructed.getMonth()
            this.vacancy.endDateYear = endDateConstructed.getFullYear()
          }

          if (!isNil(vacancyResult.useMediationService)) {
            this.vacancy.useMediationService = vacancyResult.useMediationService
          }

          if (vacancyResult.vacantPlacesQuantity || vacancyResult.vacantPlacesQuantity === 0) {
            this.vacancy.vacantPlacesQuantity = vacancyResult.vacantPlacesQuantity
          }

          if (vacancyResult.functionsDescription) {
            this.vacancy.functionsDescription = vacancyResult.functionsDescription
          }

          if (vacancyResult.additionalDescription) {
            this.vacancy.additionalDescription = vacancyResult.additionalDescription
          }

          if (!isNil(vacancyResult.minimalSalary)) {
            this.vacancy.minimalSalary = vacancyResult.minimalSalary
          }

          if (!isNil(vacancyResult.maximalSalary)) {
            this.vacancy.maximalSalary = vacancyResult.maximalSalary
          }

          if (!isNil(vacancyResult.fullTime)) {
            this.vacancy.fullTime = vacancyResult.fullTime
          }

          if (!isNil(vacancyResult.partTime)) {
            this.vacancy.partTime = vacancyResult.partTime
          }

          if (!isNil(vacancyResult.shiftBased)) {
            this.vacancy.shiftBased = vacancyResult.shiftBased
          }

          if (vacancyResult.formalEducationLevelName) {
            this.vacancy.formalEducationLevelName = vacancyResult.formalEducationLevelName
          }

          if (vacancyResult.drivingLicenceA ||
              vacancyResult.drivingLicenceB ||
              vacancyResult.drivingLicenceC ||
              vacancyResult.drivingLicenceD ||
              vacancyResult.drivingLicenceE ||
              vacancyResult.drivingLicenceT1 ||
              vacancyResult.drivingLicenceT2 ||
              vacancyResult.airLicence ||
              vacancyResult.seaLicence ||
              vacancyResult.railwayLicence
          ) {
            this.shouldHaveDrivingLicence = true

            if (!isNil(vacancyResult.drivingLicenceA)) {
              this.vacancy.drivingLicenceA = vacancyResult.drivingLicenceA
            }

            if (!isNil(vacancyResult.drivingLicenceB)) {
              this.vacancy.drivingLicenceB = vacancyResult.drivingLicenceB
            }

            if (!isNil(vacancyResult.drivingLicenceC)) {
              this.vacancy.drivingLicenceC = vacancyResult.drivingLicenceC
            }

            if (!isNil(vacancyResult.drivingLicenceD)) {
              this.vacancy.drivingLicenceD = vacancyResult.drivingLicenceD
            }

            if (!isNil(vacancyResult.drivingLicenceE)) {
              this.vacancy.drivingLicenceE = vacancyResult.drivingLicenceE
            }

            if (!isNil(vacancyResult.drivingLicenceT1)) {
              this.vacancy.drivingLicenceT1 = vacancyResult.drivingLicenceT1
            }

            if (!isNil(vacancyResult.drivingLicenceT2)) {
              this.vacancy.drivingLicenceT2 = vacancyResult.drivingLicenceT2
            }

            if (!isNil(vacancyResult.airLicence)) {
              this.vacancy.airLicence = vacancyResult.airLicence
            }

            if (!isNil(vacancyResult.seaLicence)) {
              this.vacancy.seaLicence = vacancyResult.seaLicence
            }

            if (!isNil(vacancyResult.railwayLicence)) {
              this.vacancy.railwayLicence = vacancyResult.railwayLicence
            }
          }

          if (!isNil(vacancyResult.languages)) {
            this.vacancy.languages = vacancyResult.languages
          }

          if (!isNil(vacancyResult.skills)) {
            this.vacancy.skills = vacancyResult.skills
          }
        } catch (error) {
          bus.$emit('error', error)
        }
      }
    },
    onLocationChanged(location) {
      this.vacancy.locationName = location.locationName
      this.vacancy.locationUnitName = location.locationUnitName
    },
    validation() {
      if (!this.vacancy.positionName) {
        alert('VALIDATION: no positionName')
        return false
      }

      if (this.isOrganization && (!this.vacancy.organization || !this.vacancy.organizationTaxCode)) {
        alert('VALIDATION: no organization, organizationTaxCode')
        return false
      }

      if (!this.isOrganization && (!this.vacancy.authorFullName)) {
        alert('VALIDATION: no authorFullName')
        return false
      }

      return true
    },
    getVacancyAddDataToSend(published) {
      const retVal = {
        positionName: this.vacancy.positionName,
        useMediationService: this.vacancy.useMediationService,
        fullTime: this.vacancy.fullTime,
        partTime: this.vacancy.partTime,
        shiftBased: this.vacancy.shiftBased,
        languages: this.vacancy.languages,
        skills: this.vacancy.skills,
        published,
      }

      if (isNumber(this.vacancy.interviewSupposedStartYear) &&
          isNumber(this.vacancy.interviewSupposedStartMonth) &&
          isNumber(this.vacancy.interviewSupposedStartDay)
      ) {
        retVal.interviewSupposedStartDate = new Date(
          this.vacancy.interviewSupposedStartYear,
          this.vacancy.interviewSupposedStartMonth,
          this.vacancy.interviewSupposedStartDay,
        )
      }

      if (isNumber(this.vacancy.endDateYear) &&
          isNumber(this.vacancy.endDateMonth) &&
          isNumber(this.vacancy.endDateDay)
      ) {
        retVal.endDate = new Date(
          this.vacancy.endDateYear,
          this.vacancy.endDateMonth,
          this.vacancy.endDateDay,
        )
      }

      if (this.isOrganization) {
        retVal.organization = this.vacancy.organization
        retVal.organizationTaxCode = this.vacancy.organizationTaxCode
      } else {
        retVal.authorFullName = this.vacancy.authorFullName

        if (this.vacancy.authorPersonalId) {
          retVal.authorPersonalId = this.vacancy.authorPersonalId
        }
      }

      if (this.vacancy.locationUnitName) {
        retVal.locationUnitName = this.vacancy.locationUnitName
      }

      if (this.vacancy.locationName) {
        retVal.locationName = this.vacancy.locationName
      }

      if (this.vacancy.addressLine) {
        retVal.addressLine = this.vacancy.addressLine
      }

      if (this.vacancy.vacantPlacesQuantity || this.vacancy.vacantPlacesQuantity === 0) {
        retVal.vacantPlacesQuantity = this.vacancy.vacantPlacesQuantity
      }

      if (this.vacancy.functionsDescription) {
        retVal.functionsDescription = this.vacancy.functionsDescription
      }

      if (!isNil(this.vacancy.minimalSalary)) {
        retVal.minimalSalary = this.vacancy.minimalSalary
      }

      if (!isNil(this.vacancy.maximalSalary)) {
        retVal.maximalSalary = this.vacancy.maximalSalary
      }

      if (this.vacancy.formalEducationLevelName && this.vacancy.formalEducationLevelName !== '- აირჩიე -') {
        retVal.formalEducationLevelName = this.vacancy.formalEducationLevelName
      }

      if (this.shouldHaveDrivingLicence) {
        retVal.drivingLicenceA = this.vacancy.drivingLicenceA
        retVal.drivingLicenceB = this.vacancy.drivingLicenceB
        retVal.drivingLicenceC = this.vacancy.drivingLicenceC
        retVal.drivingLicenceD = this.vacancy.drivingLicenceD
        retVal.drivingLicenceE = this.vacancy.drivingLicenceE
        retVal.drivingLicenceT1 = this.vacancy.drivingLicenceT1
        retVal.drivingLicenceT2 = this.vacancy.drivingLicenceT2
        retVal.airLicence = this.vacancy.airLicence
        retVal.seaLicence = this.vacancy.seaLicence
        retVal.railwayLicence = this.vacancy.railwayLicence
      }

      return retVal
    },
    async saveAsDraft() {
      try {
        if (!this.id) {
          await this.$http.post(baseUrl, this.getVacancyAddDataToSend(false), {headers: utils.getHeaders()})
        } else {
          await this.$http.put(baseUrl + `/${this.id}`, this.getVacancyAddDataToSend(false), {headers: utils.getHeaders()})
        }

        alert('saved as draft!')
      } catch (error) {
      }
    },
    async onSubmit(evt) {
      evt.preventDefault()

      // if (!this.validation()) {
      //   return
      // }

      try {
        if (!this.id) {
          await this.$http.post(baseUrl, this.getVacancyAddDataToSend(true), {headers: utils.getHeaders()})
        } else {
          await this.$http.put(baseUrl + `/${this.id}`, this.getVacancyAddDataToSend(true), {headers: utils.getHeaders()})
        }

        this.$router.push('/vacancies/own/all')

        alert('submitted')
      } catch (error) {
      }
    },
    languagesOnChange(langs) {
      this.vacancy.languages = langs
    },
    skillsOnChange(changedSkills) {
      this.vacancy.skills = changedSkills
    },
  },
  computed: {
    daysOptions() {
      const retVal = utils.getRangeNumberArray(1, MAX_DAYS_IN_MONTH)
              .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- დღე -' })

      return retVal
    },
    monthOptions() {
      const retVal = MONTH_NAMES
              .map((next, index) => ({ value: index, text: next }))

      retVal.splice(0, 0, { value: null, text: '- თვე -' })

      return retVal
    },
    endDateYearOptions() {
      const retVal = reverse(utils.getRangeNumberArray(new Date().getFullYear(), new Date().getFullYear() + VACANCY_END_MAX_YEAR_COUNT))
              .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- წელი -' })

      return retVal
    },
    formalEducationLevelsOptions() {
      const retVal = this.formalEducationLevels

      retVal.splice(0, 0, '- აირჩიე -')

      return retVal
    },
  },
  components: {
    'georgia-locations': georgiaLocations,
    autocomplete,
    languages,
    'vacancy-skills': vacancySkills,
    'data-shower': dataShower,
  },
}
</script>
<style scoped>
.vacancy-add {
  margin: auto;
  width: 90%;
}
.hint-element {
  margin-top: 20px;
  margin-bottom: 20px;
}
.interview-supposed-start-day {
  padding-left: 0px;
  padding-right: 2px;
}
.interview-supposed-start-month {
  padding-left: 2px;
  padding-right: 2px;
}
.end-date-day {
  padding-left: 0px;
  padding-right: 2px;
}
.end-date-month {
  padding-left: 2px;
  padding-right: 2px;
}
.end-date-year {
  padding-left: 2px;
  padding-right: 0px;
}

.salary-from {
  padding-right: 4px;
}
.salary-to {
  padding-left: 4px;
}
</style>
