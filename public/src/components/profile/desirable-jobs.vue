<template>
<div class="desirable-jobs">
  <b-card title="სასურველი სამსახური">
    <subset-selector
      ref="desirableJobInput"
      placeholder="მაგ. პროგრამისტი"
      :editable="true"
      :list="desirableJobList"
      :getAutocompleteData="searchDesirableJobs"
      @onAddNewElement="onAddNewDesirableJob"
      @onRemoveElement="onRemoveDesirableJob"
    />
  </b-card>
</div>
</template>

<script>
import subsetSelector from '../common/subset-selector'
import { bus } from '../common/bus'
import utils from '../../utils'

const baseUrl = '/api/users/profile/desirableJobs'
const searchUrl = '/api/desirableJobs/search'

export default {
  name: 'profile-desirable-jobs',
  data: () => ({
    desirableJobs: [],
  }),
  async created() {
    try {
      let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})

      this.desirableJobs = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    async searchDesirableJobs(desirableJob) {
      return await this.$http.get(searchUrl, {params: {query: desirableJob}, headers: utils.getHeaders()})
    },

    async onAddNewDesirableJob(desirableJob) {
      let indexOfDesirableJob = this.desirableJobs.findIndex(t => t.name.toLowerCase() === desirableJob.toLowerCase())
      if (indexOfDesirableJob !== -1) {
        // TODO alert or notify
        console.error('this desirable job already exists')
        return
      }

      let desirableJobObject = {
        name: desirableJob,
      }

      try {
        await this.$http.post(baseUrl, desirableJobObject, {
          headers: utils.getHeaders(),
        })

        this.desirableJobs.push(desirableJobObject)
        this.$refs.desirableJobInput.clear()
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onRemoveDesirableJob(desirableJob) {
      let indexOfDesirableJob = this.desirableJobs.findIndex(t => t.name === desirableJob)
      if (indexOfDesirableJob === -1) {
        // TODO alert or notify
        console.error('can\'t find index of desirable job')
        return
      }

      try {
        const url = baseUrl + `/${desirableJob}`

        await this.$http.delete(url, {
          headers: utils.getHeaders(),
        })

        this.desirableJobs.splice(indexOfDesirableJob, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  computed: {
    desirableJobList() {
      return this.desirableJobs.map(item => item.name)
    },
  },
  components: {
    'subset-selector': subsetSelector,
  },
}
</script>

<style scoped>
</style>
