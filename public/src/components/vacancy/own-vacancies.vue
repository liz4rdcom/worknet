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
          {{!!id}}
          <pre v-if="!!id">{{
            JSON.stringify(vacancies, null, 2)
          }}</pre>
          <b-list-group v-else flush >
            <b-list-group-item href="#">Cras justo odio</b-list-group-item>
            <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          </b-list-group>
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
  props: ['language', 'id'],
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
  computed: {
    draftVacancies: () => this.vacancies.filter(({ status }) => status === 0),
    publishedVacancies: () => this.vacancies.filter(({ status }) => status === 1),
    expiredVacancies: () => this.vacancies.filter(({ status }) => status === 2),
  },
}
</script>

<style scoped>
</style>
