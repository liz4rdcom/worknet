<template>
  <div class="vacancy-add">
    <b-form>
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

        <div v-if="!isOrganization">
          tu organizacia ar aqvs anu vakansiis damdebi fizikuri piri tua, aq ra unda vuchveno ?
          ra shevavsebino? anu ra unda shevekitxo Organizaciis saxlis da TaxCode-is magivrad ?
        </div>
      </b-card>

      <b-form-group label="'locationName': 'თბილისი', //"> <!-- optional, optional, 'locationName': 'თბილისი', // locationUnitName': 'ისანი', // -->
        <georgia-locations :onLocationChanged="onLocationChanged" />
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

      <!-- optional soon draftshi gadava tu gavida vada, da mere draftshi imit mixvdebi ro gadmosulia
        da ara saerotd gamouqveynebeli ro end date naklebi iqneba now-ze tu draftshi iyo da gavida vada,
        mainc daiwyeba axlandelidan dropdown, mara dzveli daewera tavze, tu ra iyo dzveli. -->
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

      <b-form-group label="'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //"> <!-- optional, minimaluri ganatlebis done -->
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

      <b-form-group label="'languages': [ //"> <!-- optional -->
        <languages />
      </b-form-group>

      <b-form-group label="'skills': [ //"> <!-- optional -->
        <vacancy-skills/>
      </b-form-group>

      <b-button type="submit" variant="secondary">მონახაზად შენახვა</b-button>

      <b-button type="reset" variant="primary">დამატება</b-button>

      <!-- optional -->
      <!-- <b-form-group label="'published': true">
        NOT NEEDED ON FRONT
      </b-form-group> -->
    </b-form>
  </div>
</template>

<script>
import reverse from 'lodash/reverse'
import georgiaLocations from '../../common/georgia-locations'
import { MAX_DAYS_IN_MONTH, MONTH_NAMES, VACANCY_END_MAX_YEAR_COUNT } from '../../../constants'
import utils from '../../../utils'
import { bus } from '../../common/bus'
import libs from '../../../libs'
import autocomplete from '../../common/autocomplete'
import dataShower from '../../common/data-shower'
import languages from './languages'
import vacancySkills from './vacancy-skills'

export default {
  name: 'vacancy-add',
  props: ['id'],
  data: () => ({
    vacancy: {
      positionName: null,
      organization: null,
      organizationTaxCode: null,
      locationName: null,
      locationUnitName: null,
      addressLine: null,
      interviewSupposedStartDay: null,
      interviewSupposedStartMonth: null,
      interviewSupposedStartYear: new Date().getFullYear(),
      endDateDay: null,
      endDateMonth: null,
      endDateYear: null,
      useMediationService: true,
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
  },
  methods: {
    onLocationChanged(location) {
      this.vacancy.locationName = location.locationName
      this.vacancy.locationUnitName = location.locationUnitName
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
    onSubmit (evt) {
      evt.preventDefault()

      alert(JSON.stringify(this.form))
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
