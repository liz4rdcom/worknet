<template>
  <div class="vacancy-add">
    <b-form @submit="onSubmit">
      <data-shower :data="this.$data" />

      <h1 class="hint-element">დაამატეთ ვაკანსია</h1>

      <b-form-group label="'positionName': 'JavaScript Developer',">
        <b-form-input autofocus type="text" v-model="vacancy.positionName"
        ></b-form-input>
      </b-form-group>

      <b-card>
        <b-form-checkbox
          v-model="isOrganization"
          :value="false"
          :unchecked-value="true"
        >
          ar maqvs organizacia
        </b-form-checkbox>

        <b-form-group v-if="isOrganization" label="'organization': 'შპს FX1',"> <!-- optional fwichka -->
          <b-form-input type="text" v-model="vacancy.organization"
          ></b-form-input>
        </b-form-group>

        <b-form-group v-if="isOrganization" label="'organizationTaxCode': '123456789',"> <!-- optional fwichka -->
          <b-form-input type="text" v-model="vacancy.organizationTaxCode"
          ></b-form-input>
        </b-form-group>

        <b-form-group v-if="!isOrganization" label="authorFullName">
          <b-form-input type="text" v-model="vacancy.authorFullName"
          ></b-form-input>
        </b-form-group>

        <b-form-group v-if="!isOrganization" label="authorPersonalId">
          <b-form-input type="text" v-model="vacancy.authorPersonalId"
          ></b-form-input>
        </b-form-group>
      </b-card>

      <b-form-group label="'locationName': 'თბილისი', //"> <!-- optional, optional, 'locationName': 'თბილისი', // locationUnitName': 'ისანი', // -->
        <georgia-locations
          :onLocationChanged="onLocationChanged"
          :currentLocationName="'თბილისი'"
          :currentLocationUnitName="'ისანი'"
        />
      </b-form-group>

      <b-form-group label="'addressLine': 'დამატებითი მისამართი',"> <!-- optional -->
        <b-form-textarea
          v-model="vacancy.addressLine"
          :rows="3"
          :max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>

      <!-- <b-form-group label="'publishDate': '2017-12-03T00:00:00',">
        NOT NEEDED IN VACANCY ADD
      </b-form-group> -->

      <b-form-group label="'interviewSupposedStartDate': '2018-01-01T00:00:00',"> <!-- optional -->
        <b-container>
            <b-row>
              <b-col class="interview-supposed-start-day">
                  <b-form-select v-model="vacancy.interviewSupposedStartDay" :options="daysOptions"/>
              </b-col>

              <b-col class="interview-supposed-start-month">
                  <b-form-select v-model="vacancy.interviewSupposedStartMonth" :options="monthOptions"/>
              </b-col>

              <b-form-radio-group
                v-model="vacancy.interviewSupposedStartYear"
                name="radioSubComponent"
                button-variant="outline-primary"
                buttons
                stacked
              >
                <b-form-radio :value="new Date().getFullYear()">{{new Date().getFullYear() + " წელი"}}</b-form-radio>
                <b-form-radio :value="new Date().getFullYear() + 1">{{new Date().getFullYear() + 1 + " წელი"}}</b-form-radio>
              </b-form-radio-group>
            </b-row>
        </b-container>
      </b-form-group>

      <!-- optional -->
      <b-form-group label="'endDate': '2018-01-07T00:00:00',">
          <b-container>
              <b-row>
                <b-col class="end-date-day">
                    <b-form-select v-model="vacancy.endDateDay" :options="daysOptions"/>
                </b-col>

                <b-col class="end-date-month">
                    <b-form-select v-model="vacancy.endDateMonth" :options="monthOptions"/>
                </b-col>

                <b-col class="end-date-year">
                    <b-form-select v-model="vacancy.endDateYear" :options="endDateYearOptions"/>
                </b-col>
              </b-row>
          </b-container>
      </b-form-group>

      <!-- <b-form-group label="'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',">
        NOT NEEDED IN VACANCY ADD
      </b-form-group> -->

      <b-form-group label="'useMediationService': true,">
        <b-form-checkbox
          v-model="vacancy.useMediationService"
          :value="true"
          :unchecked-value="false"
        >
          gamoiyene mediaciis servisi
        </b-form-checkbox>
      </b-form-group>

      <b-form-group label="'vacantPlacesQuantity': 2,"> <!-- optional -->
        <b-form-input type="number" v-model="vacancy.vacantPlacesQuantity" />
      </b-form-group>

      <b-form-group label="'functionsDescription': 'blablablabla',"> <!-- optional -->
        <b-form-textarea
          v-model="vacancy.functionsDescription"
          :rows="3"
          :max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="'additionalDescription': 'damatebiti informacia TEST TEST',"> <!-- optional -->
        <b-form-textarea
          v-model="vacancy.additionalDescription"
          :rows="3"
          :max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="'salaryInfoName': '150-300', //"> <!-- optional -->
        <b-form-textarea
          v-model="vacancy.salaryInfoName"
          :rows="3"
          :max-rows="6"
        >
        </b-form-textarea>
      </b-form-group>

      <b-card>
          <b-form-group label="'fullTime': true, //"> <!-- optional -->
            <b-form-checkbox
              v-model="vacancy.fullTime"
              :value="true"
              :unchecked-value="false"
            >
              fullTime
            </b-form-checkbox>
          </b-form-group>

          <b-form-group label="'partTime': true, //"> <!-- optional -->
            <b-form-checkbox
              v-model="vacancy.partTime"
              :value="true"
              :unchecked-value="false"
            >
              partTime
            </b-form-checkbox>
          </b-form-group>

          <b-form-group label="'shiftBased': true, //"> <!-- optional -->
            <b-form-checkbox
              v-model="vacancy.shiftBased"
              :value="true"
              :unchecked-value="false"
            >
              shiftBased
            </b-form-checkbox>
          </b-form-group>
      </b-card>

      <b-form-group label="'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //"> <!-- optional -->
        <b-form-select v-model="vacancy.formalEducationLevelName">
          <option v-for="(level, index) in formalEducationLevelsOptions" :key="index">{{level}}</option>
        </b-form-select>
      </b-form-group>

      <b-card>
        <b-form-group label="should have driving licence"> <!-- optional sawyisi value eqneba da ar aaq mnishvneloba optional ari tu ara-->
          <b-form-checkbox
              v-model="shouldHaveDrivingLicence"
              :value="true"
              :unchecked-value="false"
            >
              shouldHaveDrivingLicence
            </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceA': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceA"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceA
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceB': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceB"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceB
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceC': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceC"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceC
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceD': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceD"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceD
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceE': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceE"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceE
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceT1': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceT1"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceT1
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'drivingLicenceT2': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.drivingLicenceT2"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            drivingLicenceT2
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'airLicence': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.airLicence"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            airLicence
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'seaLicence': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.seaLicence"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            seaLicence
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="'railwayLicence': true, //"> <!-- optional -->
          <b-form-checkbox
            v-model="vacancy.railwayLicence"
            :disabled="!shouldHaveDrivingLicence"
            :value="true"
            :unchecked-value="false"
          >
            railwayLicence
          </b-form-checkbox>
        </b-form-group>
      </b-card>

      <!-- optional -->
      <b-form-group label="'languages': [ //">
        <languages />
      </b-form-group>

      <!-- optional -->
      <b-form-group label="'skills': [ //">
        <vacancy-skills/>
      </b-form-group>

      <b-button variant="secondary" @click="saveAsDraft">მონახაზად შენახვა</b-button>

      <b-button type="submit" variant="primary">დამატება</b-button>

      <!-- optional -->
      <!-- <b-form-group label="'status': 0,">
        NOT NEEDED ON FRONT
      </b-form-group> -->
    </b-form>
  </div>
</template>

<script>
import reverse from 'lodash/reverse'
import isNil from 'lodash/isNil'
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
      salaryInfoName: null,
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

          if (vacancyResult.salaryInfoName) {
            this.vacancy.salaryInfoName = vacancyResult.salaryInfoName
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
    getVacancyAddDataToSend(status) {
      const retVal = {
        positionName: this.vacancy.positionName,
        interviewSupposedStartDate: new Date(
          this.vacancy.interviewSupposedStartYear,
          this.vacancy.interviewSupposedStartMonth,
          this.vacancy.interviewSupposedStartDay,
        ),
        endDate: new Date(
          this.vacancy.endDateYear,
          this.vacancy.endDateMonth,
          this.vacancy.endDateDay,
        ),
        useMediationService: this.vacancy.useMediationService,
        fullTime: this.vacancy.fullTime,
        partTime: this.vacancy.fullTime,
        shiftBased: this.vacancy.fullTime,
        status,
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

      if (this.vacancy.additionalDescription) {
        retVal.additionalDescription = this.vacancy.additionalDescription
      }

      if (this.vacancy.salaryInfoName) {
        retVal.salaryInfoName = this.vacancy.salaryInfoName
      }

      if (this.vacancy.formalEducationLevelName) {
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
          await this.$http.post(baseUrl, this.getVacancyAddDataToSend(0), {headers: utils.getHeaders()})
        } else {
          console.log(222)
          await this.$http.put(baseUrl + `/${this.id}`, this.getVacancyAddDataToSend(0), {headers: utils.getHeaders()})
        }
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onSubmit(evt) {
      evt.preventDefault()

      if (!this.validation()) {
        return
      }

      try {
        if (!this.id) {
          await this.$http.post(baseUrl, this.getVacancyAddDataToSend(1), {headers: utils.getHeaders()})
        } else {
          await this.$http.put(baseUrl + `/${this.id}`, this.getVacancyAddDataToSend(1), {headers: utils.getHeaders()})
        }
      } catch (error) {
        bus.$emit('error', error)
      }

      alert('submitted')
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
</style>
