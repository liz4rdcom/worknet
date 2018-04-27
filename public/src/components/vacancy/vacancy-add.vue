<template>
<div class="vacancy-add">
  <div class="data-visually">
    <b-form-checkbox
      id="showDataVisually"
      v-model="showDataVisually"
      :value="true"
      :unchecked-value="false"
    >
      Show Data
    </b-form-checkbox>

    <pre v-if="showDataVisually">{{
      JSON.stringify(this.$data, null, 2)
    }}</pre>
  </div>

  <h1 class="hint-element">დაამატეთ ვაკანსია</h1>

  <b-form-group label="'positionName': 'JavaScript Developer',">
    <b-form-input autofocus type="text" v-model="vacancy.positionName"
    ></b-form-input>
  </b-form-group>

  <b-card>
    <b-form-checkbox
      id="isOrganization"
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
      id="addressLine"
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
            id="interview-supposed-start-year"
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

  <b-form-group label="'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',">
    NOT NEEDED IN VACANCY ADD
  </b-form-group>
  <b-form-group label="'useMediationService': true,">
    soon checkbox
  </b-form-group>
  <b-form-group label="'vacantPlacesQuantity': 2,"> <!-- optional -->
    soon optional
  </b-form-group>
  <b-form-group label="'functionsDescription': 'blablablabla',"> <!-- optional -->
    soon optional
  </b-form-group>
  <b-form-group label="'additionalDescription': 'damatebiti informacia TEST TEST',"> <!-- optional -->
    soon optional nevismieri rame
  </b-form-group>
  <b-form-group label="'salaryInfoName': '150-300', //"> <!-- optional -->
    soon text area with placeholders
  </b-form-group>
  <b-form-group label="'fullTime': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'partTime': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'shiftBased': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //"> <!-- optional -->
    soon checkboxes
  </b-form-group>
  <b-form-group label="'formalEducationLevelId': '3', //"> <!-- optional -->
    soon minimaluri ganatlebis done
  </b-form-group>
  <b-form-group label="'drivingLicenceA': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceB': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceC': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceD': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceE': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceT1': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceT2': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'airLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'seaLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'railwayLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'languages': [ //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'skills': [ //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'published': true"> <!-- optional -->
    NOT NEEDED ON FRONT
  </b-form-group>
</div>
</template>

<script>
import reverse from 'lodash/reverse'
import georgiaLocations from '../common/georgia-locations'
import { MAX_DAYS_IN_MONTH, MONTH_NAMES, VACANCY_END_MAX_YEAR_COUNT } from '../../constants'
import utils from '../../utils'

export default {
  name: 'vacancy-add',
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
      endDateYear: null
    },
    isOrganization: true,
    showDataVisually: true
  }),
  methods: {
    onLocationChanged(location) {
      this.vacancy.locationName = location.locationName
      this.vacancy.locationUnitName = location.locationUnitName
    }
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
    }
  },
  components: {
    'georgia-locations': georgiaLocations
  }
}
</script>
<style scoped>
.data-visually {
  border: 1px solid black;
  position: absolute;
  z-index: 999;
  background-color: lightcoral;
  opacity: 0.2;
}
.data-visually:hover {
  opacity: 1;
}
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
