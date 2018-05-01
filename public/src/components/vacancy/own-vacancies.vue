<template>
  <div>
    <b-tabs pills card vertical nav-wrapper-class="vacancy-nav">
      <b-tab title="all vacancies" active>
        <pre>{{
          JSON.stringify(vacancies, null, 2)
        }}</pre>
      </b-tab>
      <b-tab title="published">
        Tab Contents 2
      </b-tab>
      <b-tab title="draft">
        Tab Contents 3
      </b-tab>
      <b-tab title="expired">
        Tab Contents 4
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import utils from '../../utils'

const vacanciesUrl = '/api/vacancies'

export default {
  name: 'language',
  props: ['language'],
  data: () => ({
    vacancies: [],
  }),
  async created() {
    try {
      const response = await this.$http.get(vacanciesUrl, {headers: utils.getHeaders()})

      this.vacancies = response.data
    } catch (e) {
      // TODO Notify
      this.vacancies = []
      console.error(e)
    }
  },
  methods: {
  },
}
</script>

<style scoped>
</style>
