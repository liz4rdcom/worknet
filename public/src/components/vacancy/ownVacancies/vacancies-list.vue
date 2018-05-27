<template>
  <div>
    <b-list-group v-if="!$route.params.id" flush>
      <b-list-group-item :href="getVacancyViewUrl(nextCurVac.id)" v-for="nextCurVac in currentVacancies" :key="nextCurVac.id">
        <h5 v-if="nextCurVac.positionName">{{nextCurVac.positionName}}</h5>
        <i v-if="!nextCurVac.positionName">თანამდებობა</i>
        <h6 v-if="nextCurVac.endDate">{{nextCurVac.endDate | stringDateToDateMonthYearForm}}<i style="opacity: 0.6;">{{' - ბოლო ვადა'}}</i></h6>
        <h6 v-if="nextCurVac.locationName && nextCurVac.locationUnitName">{{nextCurVac.locationName}}{{', '}}{{nextCurVac.locationUnitName}}</h6>
      </b-list-group-item>
    </b-list-group>

    <router-view v-if="$route.params.id" :vacancy="currentVacancy"></router-view>
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
    currentVacancy() {
      return this.$route.params.id ? find(this.vacancies, vacan => vacan.id === this.$route.params.id) : null
    },
  },
}
</script>

<style scoped>
</style>
