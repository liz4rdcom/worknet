<template>
  <div class="educations" id="educations">
    <b-card title="განათლება">
      <p>
        <b>ფორმალური განათლების დონე: </b>
        <b-form-select id="formal-level-select" :value="formalEducationLevelName" @change="onFormalEducationLevelChange">
          <option v-for="level in formalEducationLevels">{{level}}</option>
        </b-form-select>
      </p>
      <b-btn class="right-float" @click="show(currentEducation)">დამატება</b-btn>
      <b-list-group class="right-clear">
        <b-list-group-item v-for="edu in educations" :key="edu.id">
          <div>
            <p v-if="showFormalEducationFields(edu)">
              <b>
                {{edu.educationType}}
                <span v-if="showEducationLevel(edu)">
                  ({{edu.educationLevel}})
                </span>:
              </b>
              {{edu.institution}}
              <span v-if="edu.locationName">
                [{{edu.locationName}}, {{edu.locationUnitName}}]
              </span>
            </p>
            <p v-else> <!-- informal eduction -->
              <b>
                {{edu.educationType}}
              </b>
            </p>
            <p>
              <b>მიმართულება: </b>{{edu.directionName}}
            </p>
            <p v-if="showFormalEducationFields(edu)">
              <b>პერიოდი: </b>
              {{edu.startMonth}}/{{edu.startYear}} -
              <span v-if="edu.endYear && edu.endMonth">{{edu.endMonth}}/{{edu.endYear}}</span>
              <span v-else>დღემდე</span>
            </p>
          </div>
          <div class="right-float">
            <b-btn @click="show(edu)">რედაქტირება</b-btn>
            <b-btn @click="deleteEducation(edu.id)">წაშლა</b-btn>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-modal ref="educationModal" ok-title="შენახვა" cancel-title="დახურვა" @ok="submit" @hide="onHide">
      <b-form-group label="განათლების ტიპი">
        <b-form-select id="education-type-select" v-model="currentEducation.educationType" class="mb-3">
          <option v-for="type in educationTypes">{{type}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="ხარისხი" v-if="showEducationLevel(currentEducation)">
        <b-form-select id="education-level-select" v-model="currentEducation.educationLevel" class="mb-3">
          <option v-for="level in educationLevels">{{level}}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="სასწავლებელი" v-if="showFormalEducationFields(currentEducation)">
         <b-form-input id="education-institution" v-model="currentEducation.institution" type="text">
         </b-form-input>
      </b-form-group>
      <b-form-group label="მიმართულება">
         <b-form-input id="education-direction-name" v-model="currentEducation.directionName" type="text">
         </b-form-input>
      </b-form-group>
      <b-form-checkbox id="education-location-georgia-checkbox" v-model="currentEducation.locationIsInGeorgia" v-if="showFormalEducationFields(currentEducation)">
        სასწავლებელი საქართველოშია
      </b-form-checkbox>
      <div v-if="currentEducation.locationIsInGeorgia && showFormalEducationFields(currentEducation)">
        <label>
          <b>რეგიონი & რაიონი</b>
        </label>
        <locations v-if="locationList.length>0"
            idPrefix="education"
            :locations="locationList"
            :currentLocationName="currentEducation.locationName"
            :currentLocationUnitName="currentEducation.locationUnitName"
            @onLocationChanged="onLocationChanged">
        </locations>
      </div>
      <b-form-group label="მისამართი" v-if="showFormalEducationFields(currentEducation)">
        <b-form-input id="education-address-info" v-model="currentEducation.additionalAddressInfo" type="text"></b-form-input>
      </b-form-group>
      <div v-if="showFormalEducationFields(currentEducation)">
        <b-container class="periods">
          <b-row no-gutters>
            <b-col>
              <div class="monthPeriod">
                  <label>დასაწყისი</label>
                  <month-period
                    idPrefix="education-start"
                    :month="currentEducation.startMonth"
                    :year="currentEducation.startYear"
                    @month="onStartMonthChange"
                    @year="onStartYearChange">
                  </month-period>
              </div>
            </b-col>
            <b-col>
              <div class="monthPeriod" v-if="!stillLearning">
                <label>დასასრული</label>
                <month-period
                  idPrefix="education-end"
                  :month="currentEducation.endMonth"
                  :year="currentEducation.endYear"
                  @month="onEndMonthChange"
                  @year="onEndYearChange">
                </month-period>
              </div>
              <div class="period-present-text" v-else>
                დღემდე
              </div>
            </b-col>
          </b-row>
        </b-container>

        <b-form-checkbox id="education-still-learning" v-model="stillLearning">
          ახლაც აქ ვსწავლობ
        </b-form-checkbox>
      </div>

    </b-modal>
  </div>
</template>

<script>
import monthPeriod from '../common/month-period'
import locations from '../common/locations'
import { bus } from '../common/bus'
import libs from '../../libs'
import utils from '../../utils'

const baseUrl = 'api/users/profile/educations'
const academicEducationType = 'უმაღლესი განათლება'
const informalEducationType = 'არაფორმალური განათლება'

export default {
  name: 'educations',
  data: () => ({
    formalEducationLevelName: '',
    educations: [],
    currentEducation: {},
    stillLearning: false,
    educationTypes: [],
    educationLevels: [],
    formalEducationLevels: [],
    locationList: [],
    educationToSubmit: {},
  }),
  async created() {
    try {
      let [
        response,
        locations,
        types,
        levels,
        formalEducationLevels,
        formalEduLevelResponse,
      ] = await Promise.all([
        this.$http.get(baseUrl, {headers: utils.getHeaders()}),
        libs.fetchLocationsOfGeorgia(),
        libs.fetchEducationTypes(),
        libs.fetchEducationLevels(),
        libs.fetchFormalEducationLevels(),
        this.$http.get(baseUrl + '/formalEducationLevel', {headers: utils.getHeaders()}),
      ])

      this.educations = response.data
      this.locationList = locations
      this.educationTypes = types
      this.educationLevels = levels
      this.formalEducationLevels = formalEducationLevels

      this.formalEducationLevelName = formalEduLevelResponse.data
    } catch (error) {
      bus.$emit('error', error)
    }

    this.currentEducation = this.educationStartState()
  },
  methods: {
    educationStartState() {
      return {
        startMonth: null,
        startYear: null,
        endMonth: null,
        endYear: null,
        locationIsInGeorgia: true,
        locationName: null,
        locationUnitName: null,
      }
    },
    show(education) {
      this.currentEducation = Object.assign({}, education)

      if (utils.isNullOrUndefined(this.currentEducation.endMonth) &&
        utils.isNullOrUndefined(this.currentEducation.endYear)) this.stillLearning = true
      else {
        this.stillLearning = false
      }

      this.$refs.educationModal.show()
    },
    submit() {
      this.educationToSubmit = this.currentEducation

      this.removeHiddenFields(this.educationToSubmit)

      if (this.educationToSubmit.id) {
        return this.editEducation()
      }

      this.addEducation()
    },
    onHide() {
      this.currentEducation = this.educationStartState()
    },
    async addEducation() {
      try {
        let response = await this.$http.post(
          baseUrl,
          this.educationToSubmit,
          {headers: utils.getHeaders()}
        )

        this.educationToSubmit.id = response.data

        this.educations.push(this.educationToSubmit)

        this.educationToSubmit = {}

        bus.$emit('success', 'განათლება წარმატებით დაემატა')
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async editEducation() {
      try {
        let url = baseUrl + '/' + this.educationToSubmit.id

        await this.$http.put(url, this.educationToSubmit, {headers: utils.getHeaders()})

        let education = this.educations.find(
          item => item.id === this.educationToSubmit.id
        )

        Object.assign(education, this.educationToSubmit)

        this.educationToSubmit = {}

        bus.$emit('success', 'განათლება წარმატებით შეიცვალა')
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async deleteEducation(id) {
      let url = baseUrl + '/' + id

      await this.$http.delete(url, {headers: utils.getHeaders()})

      let index = this.educations.findIndex(item => item.id === id)

      this.educations.splice(index, 1)

      bus.$emit('success', 'განათლება წარმატებით წაიშალა')
    },
    onStartMonthChange(value) {
      this.currentEducation.startMonth = value
    },
    onStartYearChange(value) {
      this.currentEducation.startYear = value
    },
    onEndMonthChange(value) {
      this.currentEducation.endMonth = value
    },
    onEndYearChange(value) {
      this.currentEducation.endYear = value
    },
    onLocationChanged(location) {
      this.currentEducation.locationName = location.locationName
      this.currentEducation.locationUnitName = location.locationUnitName
    },
    removeHiddenFields(education) {
      if (!education.locationIsInGeorgia) {
        education.locationName = null
        education.locationUnitName = null
      }

      if (education.educationType === academicEducationType) return

      education.educationLevel = null

      if (education.educationType !== informalEducationType) return

      education.institution = null
      education.locationIsInGeorgia = null
      education.locationName = null
      education.locationUnitName = null
      education.additionalAddressInfo = null
      education.startMonth = null
      education.startYear = null
      education.endMonth = null
      education.endYear = null
    },
    showEducationLevel(education) {
      return education.educationType === academicEducationType
    },
    showFormalEducationFields(education) {
      return education.educationType !== informalEducationType
    },
    async onFormalEducationLevelChange(value) {
      if (value === this.formalEducationLevelName || !value) return

      let url = baseUrl + '/formalEducationLevel'

      try {
        await this.$http.post(url, {level: value}, {headers: utils.getHeaders()})

        this.formalEducationLevelName = value
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  components: {
    'month-period': monthPeriod,
    'locations': locations,
  },
}
</script>

<style scoped>
p {
  text-align: left;
}

.right-float {
  float: right
}

.right-clear {
  clear: right;
}

.card {
  background: whitesmoke;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}

.list-group-item {
  border-bottom: solid darkseagreen;
}

.period-present-text {
  padding-top: 1.375rem;
  margin-top: 3rem;
}

#formal-level-select {
  display: inline-block;
  width: inherit;
}
</style>
