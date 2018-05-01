<template>
<div>
  <b-card title="დამატებითი ინფორმაცია">
    <div>
      <b-form-checkbox id="drivingLicence"
        v-model="hasDrivingLicence"
        @change="addHasDrivingLicence">
        მართვის მოწმობა
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceA"
        :checked="drivingLicence.drivingLicenceA"
        @change="addDrivingLicence('drivingLicenceA', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "A"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceB"
        :checked="drivingLicence.drivingLicenceB"
        @change="addDrivingLicence('drivingLicenceB', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "B"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceC"
        :checked="drivingLicence.drivingLicenceC"
        @change="addDrivingLicence('drivingLicenceC', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "C"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceD"
        :checked="drivingLicence.drivingLicenceD"
        @change="addDrivingLicence('drivingLicenceD', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "D"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceE"
        :checked="drivingLicence.drivingLicenceE"
        @change="addDrivingLicence('drivingLicenceE', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "E"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceT1"
        :checked="drivingLicence.drivingLicenceT1"
        @change="addDrivingLicence('drivingLicenceT1', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "T1"
      </b-form-checkbox>
      <b-form-checkbox id="drivingLicenceT2"
        :checked="drivingLicence.drivingLicenceT2"
        @change="addDrivingLicence('drivingLicenceT2', $event)"
        :disabled="!hasDrivingLicence">
        კატეგორია "T2"
      </b-form-checkbox>
      <b-form-checkbox id="airLicence"
        :checked="drivingLicence.airLicence"
        @change="addDrivingLicence('airLicence', $event)"
        :disabled="!hasDrivingLicence">
        ფრენის ლისცენზია
      </b-form-checkbox>
      <b-form-checkbox id="seaLicence"
        :checked="drivingLicence.seaLicence"
        @change="addDrivingLicence('seaLicence', $event)"
        :disabled="!hasDrivingLicence">
        საზღვაო ტრანსპორტის ლიცენზია
      </b-form-checkbox>
      <b-form-checkbox id="railwayLicence"
        :checked="drivingLicence.railwayLicence"
        @change="addDrivingLicence('railwayLicence', $event)"
        :disabled="!hasDrivingLicence">
        სარკინიგზო ტრანსპორტის ლიცენზია
      </b-form-checkbox>
    </div>
    <div>
      <b-form-checkbox id="militaryObligation"
        @change="addMilitaryObligation"
        v-model="militaryObligation">
        სამხედრო ვალდებულება
      </b-form-checkbox>
    </div>
    <div>
      <b-input-group v-if="desirableSalaryFilled === false">
        <b-form-input id="desirable-salary" type="text"
          placeholder="სასურველი ხელფასი"
          v-model="desirableSalary">
        </b-form-input>
        <b-input-group-button slot="right">
          <b-btn @click="AddDesirableSalary">დამატება</b-btn>
        </b-input-group-button>
      </b-input-group>
      <p v-if="desirableSalaryFilled === true">{{desirableSalary}} <b-btn @click="desirableSalaryChange">X</b-btn></p>
    </div>
    <div>
      <b-form-checkbox id="fullTime"
        @change="addJobDescription('fullTime', $event)"
        :checked="jobDescription.fullTime">
        სრული განაკვეთი
      </b-form-checkbox>
      <b-form-checkbox id="partTime"
        @change="addJobDescription('partTime', $event)"
        :checked="jobDescription.partTime">
        არასრული განაკვეთი
      </b-form-checkbox>
      <b-form-checkbox id="shiftBased"
        @change="addJobDescription('shiftBased', $event)"
        :checked="jobDescription.shiftBased">
        ცვლაში
      </b-form-checkbox>
      <b-form-checkbox id="interestedInInternship"
        @change="addJobDescription('interestedInInternship', $event)"
        :checked="jobDescription.interestedInInternship">
        სტაჟირება
      </b-form-checkbox>
      <b-form-checkbox id="interestedToBeVolunteer"
        @change="addJobDescription('interestedToBeVolunteer', $event)"
        :checked="jobDescription.interestedToBeVolunteer">
        მოხალისე
      </b-form-checkbox>
      <b-form-checkbox id="interestedInTemporaryJob"
        @change="addJobDescription('interestedInTemporaryJob', $event)"
        :checked="jobDescription.interestedInTemporaryJob">
        დროებითი
      </b-form-checkbox>
      <b-form-checkbox id="interestedInDangerousJob"
        @change="addJobDescription('interestedInDangerousJob', $event)"
        :checked="jobDescription.interestedInDangerousJob">
        სახიფათო
      </b-form-checkbox>
      <b-form-checkbox id="unemployed"
        @change="addJobDescription('unemployed', $event)"
        :checked="jobDescription.unemployed">
        უმუშევარი
      </b-form-checkbox>
      <div>
        <b-form-checkbox id="useMediationService"
          @change="addUseMediationService"
          v-model="useMediationService">
          გსურთ საშუამავლო სერვისი?
        </b-form-checkbox>
      </div>
    </div>
  </b-card>
</div>
</template>

<script>
import utils from '../../utils'
import { bus } from '../common/bus'

const baseUrl = '/api/users/profile/'

export default {
  name: 'moreInformation',
  data: () => ({
    hasDrivingLicence: null,
    drivingLicence: {
      drivingLicenceA: false,
      drivingLicenceB: false,
      drivingLicenceC: false,
      drivingLicenceD: false,
      drivingLicenceE: false,
      drivingLicenceT1: false,
      drivingLicenceT2: false,
      airLicence: false,
      seaLicence: false,
      railwayLicence: false
    },
    desirableSalary: null,
    jobDescription: {
      fullTime: false,
      partTime: false,
      shiftBased: false,
      interestedInInternship: false,
      interestedToBeVolunteer: false,
      interestedInTemporaryJob: false,
      interestedInDangerousJob: false,
      unemployed: false
    },
    militaryObligation: false,
    useMediationService: false,
    desirableSalaryFilled: false
  }),
  created: async function () {
    try {
      let [
        licenceResponse,
        hasLicenceResponse,
        obligationResponse,
        salaryResponse,
        jobResponse,
        useMediationServiceResponse
      ] = await Promise.all([
        this.$http.get(baseUrl + 'drivinglicence', { headers: utils.getHeaders() }),
        this.$http.get(baseUrl + 'hasdrivinglicence', { headers: utils.getHeaders() }),
        this.$http.get(baseUrl + 'militaryObligation', { headers: utils.getHeaders() }),
        this.$http.get(baseUrl + 'desirableSalary', { headers: utils.getHeaders() }),
        this.$http.get(baseUrl + 'jobDescription', { headers: utils.getHeaders() }),
        this.$http.get(baseUrl + 'usemediationservice', { headers: utils.getHeaders() })
      ])

      this.drivingLicence = licenceResponse.data
      this.hasDrivingLicence = hasLicenceResponse.data
      this.militaryObligation = obligationResponse.data
      this.desirableSalary = salaryResponse.data.salary

      if (salaryResponse.data.salary !== null) {
        this.desirableSalaryFilled = true
      }

      this.jobDescription = jobResponse.data
      this.useMediationService = useMediationServiceResponse.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    addHasDrivingLicence: async function (value) {
      try {
        await this.$http.post(baseUrl + 'hasdrivingLicence', {hasDrivingLicence: value}, {headers: utils.getHeaders()})
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    addDrivingLicence: async function (key, value) {
      try {
        this.drivingLicence[key] = value
        await this.$http.post(baseUrl + 'drivinglicence', this.drivingLicence, {headers: utils.getHeaders()})
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    addMilitaryObligation: async function (value) {
      try {
        await this.$http.post(baseUrl + 'militaryObligation', {militaryObligation: value}, {headers: utils.getHeaders()})
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    AddDesirableSalary: async function () {
      try {
        await this.$http.post(baseUrl + 'desirableSalary', {desirableSalary: this.desirableSalary}, {headers: utils.getHeaders()})
        this.desirableSalaryFilled = true
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    desirableSalaryChange: async function () {
      try {
        await this.$http.post(baseUrl + 'desirableSalary', {desirableSalary: null}, {headers: utils.getHeaders()})
        this.desirableSalary = null
        this.desirableSalaryFilled = false
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    addJobDescription: async function (key, value) {
      try {
        this.jobDescription[key] = value
        await this.$http.post(baseUrl + 'jobDescription', this.jobDescription, {headers: utils.getHeaders()})
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    addUseMediationService: async function (value) {
      try {
        await this.$http.post(baseUrl + 'usemediationservice', {useMediationService: value}, {headers: utils.getHeaders()})
      } catch (error) {
        bus.$emit('error', error)
      }
    }
  }
}
</script>
