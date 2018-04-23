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
    <desirable-trainings-section v-if="sectionOpen" />
  </b-card>
</div>
</template>

<script>
import desirableTrainingsSection from './desirable-trainings-section'

export default {
  name: 'desirable-trainings-manager',
  data: () => ({
    sectionOpen: false
  }),
  methods: {
    openSection() {
      this.sectionOpen = true
    }
  },
  components: {
    'desirable-trainings-section': desirableTrainingsSection
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
