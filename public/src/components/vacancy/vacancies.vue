<template>
<div id="vacancies">
  <div class="searchArea">
    <div class="form-group flex" @keyup.enter="search">
      <input type="text" class="form-control" v-model="query">
    </div>
    &nbsp;
    <b-button class="searchButton" variant="primary" size="" @click="search">
      <i class="fa fa-search fa-2x" aria-hidden="true"></i>
    </b-button>
  </div>
  <b-card class="mb-2 vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
    <div @click="viewVacancy(vacancy.id)">
      <h3 class="card-title">{{vacancy.positionName}}</h3>
      <h5 class="card-text">{{vacancy.organization}}</h5>
      <h5 class="card-text" v-if="vacancies.averageSalaryName !== ''">{{vacancy.averageSalaryName}}</h5>
      <h5 class="card-text">{{getFunctionDescription(vacancy)}}</h5>
      <h5 class="card-text" v-for="skill in getSkills(vacancy)" :key="skill.skillName">{{skill.skillName}}</h5>
      <h5 class="card-text">{{vacancy.publishDate}}</h5>
      <h5 class="card-text">სრულად ნახვა...</h5>
    </div>
  </b-card>
</div>
</template>

<script>
import utils from '../../utils'
import { bus } from '../common/bus'

const baseUrl = '/api/vacancies'

export default {
  name: 'vacancies',
  data: () => ({
    vacancies: [],
    query: '',
  }),
  async created() {
    try {
      let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})
      this.vacancies = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    getFunctionDescription(vacancy) {
      let arr = vacancy.functionsDescription.split(' ', 10)
      let string = ''
      for (let i = 0; i < arr.length; i++) {
        string += arr[i] + ' '
      }
      return string
    },
    getSkills(vacancy) {
      let arr = []
      let vacancyLeght = vacancy.skills.length
      if (vacancyLeght > 10) {
        vacancyLeght = 10
      }
      for (let i = 0; i < vacancyLeght; i++) {
        arr.push(vacancy.skills[i])
      }
      return arr
    },
    viewVacancy(vacancyId) {
      this.$router.push(`/vacancies/${vacancyId}/view`)
    },
    async search() {
      try {
        let response = await this.$http.get(baseUrl, {params: {query: this.query}}, {headers: utils.getHeaders()})
        this.vacancies = response.data
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
}
</script>

<style scoped>
.vacancy:hover {
  box-shadow: 0 0 6px rgba(161, 161, 161, 0.89);
}

.searchArea {
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: auto;
  padding: 20px;
  vertical-align: center;
}

.form-group {
  margin-top: 16px;
}

.searchButton {
  border-radius: 50%;
  margin: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
}
</style>
