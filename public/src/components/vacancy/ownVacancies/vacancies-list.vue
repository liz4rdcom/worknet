<template>
  <div>
    <!-- <pre>{{
      JSON.stringify(currentVacancies, null, 2)
    }}</pre> -->

    <b-list-group v-if="!$route.params.id" v-for="nextCurVac in currentVacancies" :key="nextCurVac.id" flush>
      <b-list-group-item :href="getVacancyViewUrl(nextCurVac.id)">{{nextCurVac.positionName}}</b-list-group-item>
    </b-list-group>

    <b-card v-if="currentVacancyIsDraft">
        <b-button variant="primary" :href="`#/vacancies/add/${$route.params.id}`">მონახაზის გაგრძელება</b-button>
    </b-card>

    <router-view></router-view>
  </div>
</template>

<script>
import find from 'lodash/find'
import utils from '../../../utils'

export default {
  name: 'vacancies-list',
  props: ['vacancies', 'vacanciesStatus'],
  data: () => ({}),
  methods: {
    getVacancyViewUrl(id) {
      return `#/vacancies/own/${this.currentStatusUrlName}/${id}`
    },
  },
  computed: {
    draftVacancies() {
      return this.vacancies.filter(({ published }) => !published)
    },
    publishedVacancies() {
      return this.vacancies.filter(({ published, endDate }) => published && utils.compareDatesByMilliseconds(new Date(), new Date(endDate)) <= 0)
    },
    expiredVacancies() {
      return this.vacancies.filter(({ published, endDate }) => published && utils.compareDatesByMilliseconds(new Date(), new Date(endDate)) >= 0)
    },
    currentStatusUrlName() {
      switch (this.vacanciesStatus) {
        case 0:
          return 'draft'
        case 1:
          return 'published'
        case 2:
          return 'expired'
        case 3:
          return 'all'
        default:
          return 'all'
      }
    },
    currentVacancies() {
      switch (this.vacanciesStatus) {
        case 0:
          return this.draftVacancies
        case 1:
          return this.publishedVacancies
        case 2:
          return this.expiredVacancies
        case 3:
          return this.vacancies
        default:
          return this.vacancies
      }
    },
    currentVacancyIsDraft() {
      return this.$route.params.id ? !find(this.vacancies, vacan => vacan.id === this.$route.params.id).published : false
    },
  },
}
</script>

<style scoped>
</style>
