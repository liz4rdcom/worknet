<template>
  <div>
    <!-- <pre>{{
      JSON.stringify(currentVacancies, null, 2)
    }}</pre> -->

    <b-list-group v-if="!$route.params.id" v-for="nextCurVac in currentVacancies" :key="nextCurVac.id" flush>
      <b-list-group-item :href="getVacancyViewUrl(nextCurVac.id)">{{nextCurVac.positionName}}</b-list-group-item>
    </b-list-group>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'vacancies-list',
  props: ['vacancies', 'vacanciesStatus', 'id'],
  data: () => ({}),
  methods: {
    getVacancyViewUrl(id) {
      return `#/vacancies/own/${this.currentStatusUrlName}/${id}`
    },
  },
  computed: {
    draftVacancies() {
      return this.vacancies.filter(({ status }) => status === 0)
    },
    publishedVacancies() {
      return this.vacancies.filter(({ status }) => status === 1)
    },
    expiredVacancies() {
      return this.vacancies.filter(({ status }) => status === 2)
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
  },
}
</script>

<style scoped>
</style>
