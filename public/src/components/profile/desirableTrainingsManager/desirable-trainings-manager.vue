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
      <desirable-trainings/>
      <desirable-training-locations/>
    </div>
  </b-card>
</div>
</template>

<script>
import desirableTrainings from './desirable-trainings'
import desirableTrainingLocations from './desirable-training-locations'

export default {
  name: 'desirable-trainings-manager',
  data: () => ({
    sectionOpen: false // todo this should be false is not a single training or training location is selected
  }),
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
</style>
