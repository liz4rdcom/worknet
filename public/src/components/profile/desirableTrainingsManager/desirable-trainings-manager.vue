<template>
<div class="desirable-trainings-manager">
  <b-card :title="cardTitle">
    <b-button
      v-if="!sectionOpen"
      size="lg"
      variant="success"
      @click="openSection"
    >
        დაამატე სასურველი ტრეინინგები
    </b-button>
    <div v-if="sectionOpen">
      <b-card class="desirable-training-container">
        <desirable-trainings :desirableTrainingList="desirableTrainingList"/>
      </b-card>
      <b-card>
        <desirable-training-locations :desirableTrainingLocationList="desirableTrainingLocationList"/>
      </b-card>
    </div>
  </b-card>
</div>
</template>

<script>
import { bus } from '../../common/bus'
import utils from '../../../utils'
import desirableTrainings from './desirable-trainings'
import desirableTrainingLocations from './desirable-training-locations'

const desirableTrainingsUrl = '/api/users/profile/desirableTrainings'
const desirableTrainingLocationsUrl = '/api/users/profile/desirableTrainingLocations'

export default {
  name: 'desirable-trainings-manager',
  data: () => ({
    desirableTrainingList: [],
    desirableTrainingLocationList: [],
    sectionOpen: false
  }),
  async created() {
    try {
      let desirableTrainings = await this.$http.get(desirableTrainingsUrl, {headers: utils.getHeaders()})
      let desirableTrainingLocations = await this.$http.get(desirableTrainingLocationsUrl, {headers: utils.getHeaders()})

      this.desirableTrainingList = desirableTrainings.data
      this.desirableTrainingLocationList = desirableTrainingLocations.data

      this.sectionOpen = this.desirableTrainingList.length !== 0 || this.desirableTrainingLocationList.length !== 0
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    openSection() {
      this.sectionOpen = true
    }
  },
  components: {
    'desirable-trainings': desirableTrainings,
    'desirable-training-locations': desirableTrainingLocations
  },
  computed: {
    cardTitle () {
      return this.sectionOpen ? 'სასურველი ტრეინინგები' : null
    },
    suggestions () {
      if (!this.synchronous) return this.list

      return this.list.filter(item => item.includes(this.inputValue))
    }
  }
}
</script>

<style scoped>
.desirable-training-container {
  margin-bottom: 10px;
}
</style>
