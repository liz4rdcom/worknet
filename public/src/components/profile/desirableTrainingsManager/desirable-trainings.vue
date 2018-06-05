<template>
<div class="desirable-trainings" id="desirable-trainings">
  <subset-selector
    idPrefix="desirable-trainings"
    ref="desirableTrainingInput"
    placeholder="მაგ. კულინარია, მზარეული"
    :editable="true"
    :list="desirableTrainingNameList"
    :getAutocompleteData="searchDesirableTrainings"
    @onAddNewElement="onAddNewDesirableTraining"
    @onRemoveElement="onRemoveDesirableTraining"
  />
</div>
</template>

<script>
import subsetSelector from '../../common/subset-selector'
import { bus } from '../../common/bus'
import utils from '../../../utils'

const baseUrl = '/api/users/profile/desirableTrainings'
const searchUrl = '/api/desirableTrainings/search'

export default {
  name: 'profile-desirable-trainings',
  props: ['desirableTrainingList'],
  methods: {
    async searchDesirableTrainings(desirableTraining) {
      return await this.$http.get(searchUrl, {params: {query: desirableTraining}, headers: utils.getHeaders()})
    },

    async onAddNewDesirableTraining(desirableTraining) {
      let indexOfDesirableTraining = this.desirableTrainingList.findIndex(t => t.name.toLowerCase() === desirableTraining.toLowerCase())
      if (indexOfDesirableTraining !== -1) {
        console.error('this desirable training already exists')
        return
      }

      let desirableTrainingObject = {
        name: desirableTraining,
      }

      try {
        await this.$http.post(baseUrl, desirableTrainingObject, {
          headers: utils.getHeaders(),
        })

        this.desirableTrainingList.push(desirableTrainingObject)
        this.$refs.desirableTrainingInput.clear()
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onRemoveDesirableTraining(desirableTraining) {
      let indexOfDesirableTraining = this.desirableTrainingList.findIndex(t => t.name === desirableTraining)
      if (indexOfDesirableTraining === -1) {
        console.error('can\'t find index of desirable training')
        return
      }

      try {
        const url = baseUrl + `/${desirableTraining}`

        await this.$http.delete(url, {
          headers: utils.getHeaders(),
        })

        this.desirableTrainingList.splice(indexOfDesirableTraining, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  computed: {
    desirableTrainingNameList() {
      return this.desirableTrainingList.map(item => item.name)
    },
  },
  components: {
    'subset-selector': subsetSelector,
  },
}
</script>

<style scoped>
</style>
