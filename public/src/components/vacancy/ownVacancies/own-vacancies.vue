<template>
  <div>
    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="3">
                <b-nav vertical>
                    <b-nav-item href="#/vacancies/own/all">ყველა ({{allCount}})</b-nav-item>
                    <b-nav-item href="#/vacancies/own/published">გამოქვეყნებულები ({{publishedCount}})</b-nav-item>
                    <b-nav-item href="#/vacancies/own/draft">მონახაზები ({{draftCount}})</b-nav-item>
                    <b-nav-item href="#/vacancies/own/expired">ვადაგასულები ({{expiredCount}})</b-nav-item>
                  </b-nav>
            </b-col>

            <b-col v-if="vacancies !== null" cols="9">
                <router-view :vacancies="vacancies"></router-view>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import utils from '../../../utils'

const vacanciesOwnUrl = '/api/vacancies/own'

export default {
  name: 'own-vacancies',
  props: ['language'],
  data: () => ({
    vacancies: null,
  }),
  async created() {
    try {
      const response = await this.$http.get(vacanciesOwnUrl, {headers: utils.getHeaders()})

      this.vacancies = response.data
    } catch (e) {
      this.vacancies = []
      console.error(e)
    }
  },
  methods: {
  },
  computed: {
    allCount() {
      return this.vacancies ? this.vacancies.length : 0
    },
    draftCount() {
      return this.vacancies ? this.vacancies.filter(({ published }) => !published).length : 0
    },
    publishedCount() {
      return this.vacancies
        ? this.vacancies.filter(({ published, endDate }) => (
            published && utils.compareDatesByMilliseconds(new Date(), new Date(endDate)) <= 0
          )).length
        : 0
    },
    expiredCount() {
      return this.vacancies
        ? this.vacancies.filter(({ published, endDate }) => (
            published && utils.compareDatesByMilliseconds(new Date(), new Date(endDate)) >= 0
          )).length
        : 0
    },
  },
}
</script>

<style scoped>
</style>
