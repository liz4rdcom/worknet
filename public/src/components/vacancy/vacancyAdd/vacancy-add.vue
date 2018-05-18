<template>
  <b-row class="vacancy-add-container">
    <b-col class="vacancy-add">
      <div class="vacancy-add-inner-container">
        <!-- <data-shower :data="this.$data" /> -->

        <h1 class="vacancy-add-hint-element">დაამატეთ ვაკანსია</h1>

        <b-form-group class="font-weight-bold" label="თანამდებობა">
          <b-form-input id="vacancy-add-position" class="position-input" autofocus type="text" v-model="vacancy.positionName" />
        </b-form-group>

        <b-form-group>
          <b-card>
            <b-row>
              <b-col />

              <b-col cols="auto">
                <b-form-checkbox
                  v-model="isOrganization"
                  :value="false"
                  :unchecked-value="true"
                  id="vacancy-add-is-organization-checkbox"
                >
                  არ ვაქვეყნებ ორგანიზაციის სახელით
                </b-form-checkbox>
              </b-col>
            </b-row>

            <b-form-group v-if="isOrganization" class="font-weight-bold" label="ორგანიზაცია">
              <b-form-input id="vacancy-add-organization-name" type="text" v-model="vacancy.organization"
              ></b-form-input>
            </b-form-group>

            <b-form-group v-if="isOrganization" class="font-weight-bold" label="საგადასახადო კოდი">
              <b-form-input id="vacancy-add-organization-taxcode" type="text" v-model="vacancy.organizationTaxCode"
              ></b-form-input>
            </b-form-group>

            <b-form-group v-if="!isOrganization" class="font-weight-bold" label="გამომქვეყნებლის სრული სახელი">
              <b-form-input id="vacancy-add-author-full-name" type="text" v-model="vacancy.authorFullName"
              ></b-form-input>
            </b-form-group>

            <b-form-group v-if="!isOrganization" class="font-weight-bold" label="გამომქვეყნებლის პირადი ნომერი">
              <b-form-input id="vacancy-add-author-personal-id" type="text" v-model="vacancy.authorPersonalId"
              ></b-form-input>
            </b-form-group>
          </b-card>
        </b-form-group>

        <b-form-group label="ადგილდებარეობა" class="font-weight-bold">
          <georgia-locations
            idPrefix="vacancy-add"
            :onLocationChanged="onLocationChanged"
            :currentLocationName="vacancy.locationName"
            :currentLocationUnitName="vacancy.locationUnitName"
          />
        </b-form-group>

        <b-form-group label="დამატებითი მისამართი" class="font-weight-bold">
          <b-form-textarea
            id="vacancy-add-adress-line"
            v-model="vacancy.addressLine"
            :rows="3"
            :max-rows="6"
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="გასაუბრებების დაწყების სავარაუდო თარიღი" class="font-weight-bold">
          <b-row>
            <b-col class="interview-supposed-start-day">
                <b-form-select id="vacancy-add-interview-supposed-start-day" v-model="vacancy.interviewSupposedStartDay" :options="daysOptions"/>
            </b-col>

            <b-col class="interview-supposed-start-month">
                <b-form-select id="vacancy-add-interview-supposed-start-month" v-model="vacancy.interviewSupposedStartMonth" :options="monthOptions"/>
            </b-col>

            <b-col class="interview-supposed-start-year" cols="auto">
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
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group label="ვაკანსიის დახურვის თარიღი" class="font-weight-bold">
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
        </b-form-group>

        <b-form-group class="font-weight-bold">
          <b-form-checkbox
            id="vacancy-add-use-mediation-service"
            v-model="vacancy.useMediationService"
            :value="true"
            :unchecked-value="false"
          >
            გამოიყენეთ მედიაციის სერვისი
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label="ვაკანტური ადგილების რაოდენობა" class="font-weight-bold">
          <b-form-input id="vacancy-add-vacant-places" type="number" v-model="vacancy.vacantPlacesQuantity" />
        </b-form-group>

        <b-form-group label="თანამდებობრივი მოვალეობის აღწერილობა" class="font-weight-bold">
          <b-form-textarea
            id="vacancy-add-functions-description"
            v-model="vacancy.functionsDescription"
            :rows="3"
            :max-rows="6"
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group label="დამატებითი აღწერილობა" class="font-weight-bold">
          <b-form-textarea
            id="vacancy-add-additional-description"
            v-model="vacancy.additionalDescription"
            :rows="3"
            :max-rows="6"
          >
          </b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-container>
            <b-row>
              <b-col><legend class="col-form-legend">ხელფასი დან</legend></b-col>
              <b-col cols="0"></b-col>
              <b-col><legend class="col-form-legend">ხელფასი მდე</legend></b-col>
            </b-row>
            <b-row>
              <b-col class="salary-from">
                <b-form-input id="vacancy-add-salary-from" v-model.number="vacancy.minimalSalary" type="number"/>
              </b-col>
              <b-col cols="0">-</b-col>
              <b-col class="salary-to">
                <b-form-input id="vacancy-add-salary-to" v-model.number="vacancy.maximalSalary" type="number"/>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>

        <b-form-group>
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
                ცვლები
              </b-form-checkbox>
          </b-card>
        </b-form-group>

        <b-form-group label="განათლების რეკომენდირებული მინიმალური დონე" class="font-weight-bold">
          <b-form-select id="vacancy-add-formal-education-level-name" v-model="vacancy.formalEducationLevelName">
            <option v-for="(level, index) in formalEducationLevelsOptions" :key="index">{{level}}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group>
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
        </b-form-group>

        <b-form-group>
          <languages :languages="vacancy.languages" :onChange="languagesOnChange"/>
        </b-form-group>

        <b-form-group>
          <vacancy-skills :skills="vacancy.skills" :onChange="skillsOnChange"/>
        </b-form-group>

        <b-form-group>
          <b-row>
            <b-col>
              <b-button style="width: 100%;" variant="secondary" @click="saveAsDraft">მონახაზად შენახვა</b-button>
            </b-col>

            <b-col>
              <b-button style="width: 100%;" variant="primary" @click="onSubmit">დამატება</b-button>
            </b-col>
          </b-row>
        </b-form-group>
      </div>
    </b-col>

    <button class="hide-jobseeker-search-panel" @click="toggleJobseekerSearch">
      <b v-if="!jobseekerSearchHidden">
        &gt;
        <br/>

        &gt;
        <br/>

        &gt;
        <br/>
      </b>

      <b v-if="jobseekerSearchHidden">
        &lt;
        <br/>

        &lt;
        <br/>

        &lt;
        <br/>
      </b>
    </button>
    <span class="cyrcle-span"></span>

    <b-col v-if="!jobseekerSearchHidden" class="jobseeker-search">
      <div class="jobseeker-search-inner-container">
        <b-container>
          <b-row align-v="center">
            <b-col>
              <h1 class="jobseeker-search-hint-element">ვაკანსიის შესაბამისი სამსახურის მაძიებლები</h1>
            </b-col>

            <b-col cols="auto">
              <b-btn
                v-b-popover.hover="jobseekerSearchHintText"
                title=""
                variant="outline-primary"
              >
                <b>მითითება</b>
              </b-btn>
            </b-col>
          </b-row>
        </b-container>

        <b-form-group>
          <b-card>
            <b-form-group label="გაიფილტროს შემდეგი მონაცემებით:" class="font-weight-bold"/>

            <b-form-group>
              <b-row>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.position"
                    :button-variant="jobseekerSearchSwitches.position ? 'outline-success' : 'outline-secondary'"
                    :options="positionSwitchOptions"
                    buttons
                  />
                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.location"
                    :button-variant="jobseekerSearchSwitches.location ? 'outline-success' : 'outline-secondary'"
                    :options="locationSwitchOptions"
                    buttons
                  />
                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.salary"
                    :button-variant="jobseekerSearchSwitches.salary ? 'outline-success' : 'outline-secondary'"
                    :options="salarySwitchOptions"
                    buttons
                  />
                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.workSchedule"
                    :button-variant="jobseekerSearchSwitches.workSchedule ? 'outline-success' : 'outline-secondary'"
                    :options="workScheduleSwitchOptions"
                    buttons
                  />
                </b-col>
              </b-row>
            </b-form-group>

            <b-form-group>
              <b-row>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.formalEducationLevel"
                    :button-variant="jobseekerSearchSwitches.formalEducationLevel ? 'outline-success' : 'outline-secondary'"
                    :options="formalEducationLevelSwitchOptions"
                    buttons
                  />
                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.drivingLicence"
                    :button-variant="jobseekerSearchSwitches.drivingLicence ? 'outline-success' : 'outline-secondary'"
                    :options="drivingLicenceSwitchOptions"
                    buttons
                  />

                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.languages"
                    :button-variant="jobseekerSearchSwitches.languages ? 'outline-success' : 'outline-secondary'"
                    :options="languagesSwitchOptions"
                    buttons
                  />
                </b-col>
                <b-col>
                  <b-form-radio-group
                    v-model="jobseekerSearchSwitches.skills"
                    :button-variant="jobseekerSearchSwitches.skills ? 'outline-success' : 'outline-secondary'"
                    :options="skillsSwitchOptions"
                    buttons
                  />
                </b-col>
              </b-row>
            </b-form-group>

            <b-row>
                <b-col>
                  <div
                    style="padding-top: 18px"
                    v-if="searchedJobseekers !== null"
                    class="jobseeker-search-quantity-hint"
                  >
                    {{'ნაპოვნია ' + searchedJobseekers.length + ' პროფილი'}}
                  </div>
                </b-col>

                <b-col>
                  <b-button style="width: 60%; float: right;" variant="primary" @click="searchJobseekersIfNecessary">ძებნა</b-button>
                </b-col>
              </b-row>
          </b-card>
        </b-form-group>

        <users-list style="padding-top: 20px;" :users="searchedJobseekers"/>
      </div>
    </b-col>
  </b-row>
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
import usersList from '../../common/users-list'
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
    isSalaryRange: false,
    jobseekerSearchHidden: false,
    positionSwitchOptions: [{text: 'თანამდებობა', value: true}, {text: 'X', value: false}],
    locationSwitchOptions: [{text: 'ადგილი', value: true}, {text: 'X', value: false}],
    salarySwitchOptions: [{text: 'ხელფასი', value: true}, {text: 'X', value: false}],
    workScheduleSwitchOptions: [{text: 'სამუშაო გრაფიკი', value: true}, {text: 'X', value: false}],
    formalEducationLevelSwitchOptions: [{text: 'განათლების დონე', value: true}, {text: 'X', value: false}],
    drivingLicenceSwitchOptions: [{text: 'მართვის მოწმობა', value: true}, {text: 'X', value: false}],
    languagesSwitchOptions: [{text: 'ენები', value: true}, {text: 'X', value: false}],
    skillsSwitchOptions: [{text: 'უნარები', value: true}, {text: 'X', value: false}],
    jobseekerSearchSwitches: {
      position: true,
      location: true,
      salary: true,
      workSchedule: true,
      formalEducationLevel: true,
      drivingLicence: true,
      languages: true,
      skills: true,
    },
    jobseekerSearchHintText: 'ვაკანსიის შევსების პარალელურად შეგიძლიათ მოძებნოთ სამსახურის მაძიებელთა სია, რომლებიც შეესადაგებიან შევსებულ ვაკანსიას. \n\n თუ დროებით არ გსურთ სიის ხილვა მაუსი დააჭირეთ შუაში არსებულ, მოშავო, გამყოფ ღერძს, რის შედეგადაც მოხდება სიის დამალვა.',
    searchedJobseekers: null,
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

      if (!this.validation()) {
        return
      }

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
    toggleJobseekerSearch() {
      this.jobseekerSearchHidden = !this.jobseekerSearchHidden

      this.searchJobseekersIfNecessary()
    },
    async searchJobseekersIfNecessary () {
      if (!this.jobseekerSearchHidden) {
        const { position, location, salary, workSchedule, formalEducationLevel, drivingLicence, languages, skills } = this.jobseekerSearchSwitches

        /*
          'position',

          'locationName',
          'locationUnitName',

          'minimalSalary',
          'maximalSalary',
          'fixedSalary',

          'fullTime',
          'partTime',
          'shiftBased',

          'formalEducationLevelName',

          'shouldHaveDrivingLicence',
          'drivingLicenceA',
          'drivingLicenceB',
          'drivingLicenceC',
          'drivingLicenceD',
          'drivingLicenceE',
          'drivingLicenceT1',
          'drivingLicenceT2',
          'airLicence',
          'seaLicence',
          'railwayLicence',

          'languages',
          'skills',
        */

        const configFields = {}

        if (position) {
          if (this.vacancy.positionName) {
            configFields.positionName = this.vacancy.positionName
          }
        }

        if (location) {
          if (this.vacancy.locationName && this.vacancy.locationUnitName) {
            configFields.locationName = this.vacancy.locationName
            configFields.locationUnitName = this.vacancy.locationUnitName
          }
        }

        if (salary) {
          if (this.vacancy.minimalSalary || this.vacancy.minimalSalary === 0) {
            configFields.minimalSalary = this.vacancy.minimalSalary
          }
          if (this.vacancy.maximalSalary || this.vacancy.minimalSalary === 0) {
            configFields.maximalSalary = this.vacancy.maximalSalary
          }
        }

        if (workSchedule) {
          if (this.vacancy.fullTime) {
            configFields.fullTime = this.vacancy.fullTime
          }
          if (this.vacancy.partTime) {
            configFields.partTime = this.vacancy.partTime
          }
          if (this.vacancy.shiftBased) {
            configFields.shiftBased = this.vacancy.shiftBased
          }
        }

        if (formalEducationLevel) {
          if (this.vacancy.formalEducationLevelName && this.vacancy.formalEducationLevelName !== '- აირჩიე -') {
            configFields.formalEducationLevelName = this.vacancy.formalEducationLevelName
          }
        }

        if (drivingLicence) {
          if (this.shouldHaveDrivingLicence) {
            if (this.vacancy.drivingLicenceA) {
              configFields.drivingLicenceA = this.vacancy.drivingLicenceA
            }
            if (this.vacancy.drivingLicenceB) {
              configFields.drivingLicenceB = this.vacancy.drivingLicenceB
            }
            if (this.vacancy.drivingLicenceC) {
              configFields.drivingLicenceC = this.vacancy.drivingLicenceC
            }
            if (this.vacancy.drivingLicenceD) {
              configFields.drivingLicenceD = this.vacancy.drivingLicenceD
            }
            if (this.vacancy.drivingLicenceE) {
              configFields.drivingLicenceE = this.vacancy.drivingLicenceE
            }
            if (this.vacancy.drivingLicenceT1) {
              configFields.drivingLicenceT1 = this.vacancy.drivingLicenceT1
            }
            if (this.vacancy.drivingLicenceT2) {
              configFields.drivingLicenceT2 = this.vacancy.drivingLicenceT2
            }
            if (this.vacancy.airLicence) {
              configFields.airLicence = this.vacancy.airLicence
            }
            if (this.vacancy.seaLicence) {
              configFields.seaLicence = this.vacancy.seaLicence
            }
            if (this.vacancy.railwayLicence) {
              configFields.railwayLicence = this.vacancy.railwayLicence
            }
          }
        }

        if (languages) {
          configFields.languages = this.vacancy.languages
        }

        if (skills) {
          configFields.skills = this.vacancy.skills
        }

        const result = await this.$http.post('/api/users/vacancy/matchings', { configFields })

        console.log(5555555555, result, configFields)

        this.searchedJobseekers = result.data
      }
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
    'users-list': usersList,
  },
}
</script>
<style scoped>
.vacancy-add-container {
  height: calc(100% - 56px);
  margin: 0px;
  overflow-x: hidden;
  text-align: left;
}
.vacancy-add {
  margin: auto;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f0efdb;
}
.vacancy-add-inner-container {
  max-width: 70%;
  margin: auto;
}
.vacancy-add-hint-element {
  margin-top: 20px;
  margin-bottom: 20px;
}
.jobseeker-search {
  background: lavender;
  overflow-y: auto;
}
.jobseeker-search-inner-container {
  max-width: 90%;
  margin: auto;
}
.jobseeker-search-hint-element {
  margin-top: 20px;
  margin-bottom: 20px;
}
.interview-supposed-start-day {
  padding-right: 4px;
}
.interview-supposed-start-month {
  padding-left: 4px;
  padding-right: 4px;
}
.interview-supposed-start-year {
  padding-left: 4px;
}
.end-date-day {
  padding-right: 4px;
}
.end-date-month {
  padding-left: 4px;
  padding-right: 4px;
}
.end-date-year {
  padding-left: 4px;
}

.salary-from {
  padding-right: 4px;
}
.salary-to {
  padding-left: 4px;
}
.hide-jobseeker-search-panel {
  background-color: #343a40;
  opacity: 0.8;
  color: white;
  padding: 0px 0px 0px 3px;
  border: 0px;
  outline: none;
}
.hide-jobseeker-search-panel:hover {
  opacity: 0.9;
  text-shadow: 1px 1px 2px white, 0 0 25px white, 0 0 5px white;

  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

.position-input {
  width: 100%;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}

.card {
  background: whitesmoke;
}

.jobseeker-search-quantity-hint {
  animation: blinker 3s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
