<template>
  <div>
    <div>
      <b-container>
        <b-row align-v="center">
          <b-col>
            <h1 class="vacancy-search-hint-element">პროფილის შესაბამისი ვაკანსიები</h1>
          </b-col>

          <b-col cols="auto">
            <b-btn
              v-b-popover.hover="vacancySearchHintText"
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
                  v-model="vacancySearchSwitches.factLocation"
                  :button-variant="vacancySearchSwitches.factLocation ? 'outline-success' : 'outline-secondary'"
                  :options="locationSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.salary"
                  :button-variant="vacancySearchSwitches.salary ? 'outline-success' : 'outline-secondary'"
                  :options="salarySwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.workSchedule"
                  :button-variant="vacancySearchSwitches.workSchedule ? 'outline-success' : 'outline-secondary'"
                  :options="workScheduleSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.formalEducationLevel"
                  :button-variant="vacancySearchSwitches.formalEducationLevel ? 'outline-success' : 'outline-secondary'"
                  :options="formalEducationLevelSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.drivingLicenses"
                  :button-variant="vacancySearchSwitches.drivingLicenses ? 'outline-success' : 'outline-secondary'"
                  :options="drivingLicenceSwitchOptions"
                  buttons
                />
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group>
            <b-row>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.languages"
                  :button-variant="vacancySearchSwitches.languages ? 'outline-success' : 'outline-secondary'"
                  :options="languagesSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.skills"
                  :button-variant="vacancySearchSwitches.skills ? 'outline-success' : 'outline-secondary'"
                  :options="skillsSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.jobExperiences"
                  :button-variant="vacancySearchSwitches.jobExperiences ? 'outline-success' : 'outline-secondary'"
                  :options="jobExperiencesSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.desirableJobs"
                  :button-variant="vacancySearchSwitches.desirableJobs ? 'outline-success' : 'outline-secondary'"
                  :options="desirableJobsSwitchOptions"
                  buttons
                />
              </b-col>
              <b-col>
                <b-form-radio-group
                  v-model="vacancySearchSwitches.desirableJobLocations"
                  :button-variant="vacancySearchSwitches.desirableJobLocations ? 'outline-success' : 'outline-secondary'"
                  :options="desirableJobLocationsSwitchOptions"
                  buttons
                />
              </b-col>
            </b-row>
          </b-form-group>

          <b-row>
            <b-col>
              <div
                style="padding-top: 18px"
                v-if="searchedVacancies !== null"
                class="vacancy-search-quantity-hint"
              >
                {{'ნაპოვნია ' + searchedVacanciesTotal + ' ვაკანსია'}}
              </div>
            </b-col>

            <b-col>
              <b-button style="width: 60%; float: right;" variant="primary" @click="search">ძებნა</b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-form-group>

    </div>

    <vacancies-search-list style="padding-top: 20px;" :vacancies="searchedVacancies" />
  </div>
</template>

<script>
import vacanciesSearchList from './vacancies-search-list'

export default {
  name: 'vacancies-user-matching',
  data: () => ({
    locationSwitchOptions: [{text: 'ფაქტიური მისამართი', value: true}, {text: 'X', value: false}],
    salarySwitchOptions: [{text: 'ხელფასი', value: true}, {text: 'X', value: false}],
    workScheduleSwitchOptions: [{text: 'სამუშაო გრაფიკი', value: true}, {text: 'X', value: false}],
    formalEducationLevelSwitchOptions: [{text: 'განათლების დონე', value: true}, {text: 'X', value: false}],
    drivingLicenceSwitchOptions: [{text: 'მართვის მოწმობა', value: true}, {text: 'X', value: false}],
    languagesSwitchOptions: [{text: 'ენები', value: true}, {text: 'X', value: false}],
    skillsSwitchOptions: [{text: 'უნარები', value: true}, {text: 'X', value: false}],
    jobExperiencesSwitchOptions: [{text: 'გამოცდილება', value: true}, {text: 'X', value: false}],
    desirableJobsSwitchOptions: [{text: 'სასურველი სამსახური', value: true}, {text: 'X', value: false}],
    desirableJobLocationsSwitchOptions: [{text: 'სასურველი სამსახურის ადგილი', value: true}, {text: 'X', value: false}],
    vacancySearchSwitches: {
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
    vacancySearchHintText: 'პროფილის შევსების შემდეგ შეგიძლიათ მოძებნოთ ვაკანსიების სია, რომლებიც მიესადაგებიან თქვენ მიერ შევსებულ მონაცემებს',
    searchedVacancies: null,
    searchedVacanciesTotal: 0,
  }),
  async created() {
    await this.search()
  },
  methods: {
    async search() {
      let result = await this.$http.post('/api/vacancies/profile/matchings', {projectionConfigFields: this.vacancySearchSwitches})

      this.searchedVacanciesTotal = result.data.total
      this.searchedVacancies = result.data.list
    },
  },
  components: {
    'vacancies-search-list': vacanciesSearchList,
  },
}
</script>

<style scoped>
</style>
