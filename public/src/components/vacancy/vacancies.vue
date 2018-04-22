<template>
<div id="vacancies">
  <b-button  variant="primary" @click="redirectToVacancyAdd">
      ახალი ვაკანსია4
  </b-button>
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
    </div>
  </b-card>
</div>
</template>

<script>
const baseUrl = '/api/vacancies'

export default {
  name: 'vacancies',
  data: () => ({
    vacancies: [],
    query: ''
  }),
  created() {
    this.$http.get(baseUrl)
      .then(response => {
        this.vacancies = response.data
      })
  },
  methods: {
    viewVacancy(vacancyId) {
      this.$router.push(`/vacancies/${vacancyId}/view`)
    },
    search() {
      this.$http.get(baseUrl, {params: {query: this.query}})
        .then(response => {
          this.vacancies = response.data
        })
    },
    redirectToVacancyAdd() {
      this.$router.push('/vacancies/new')
    }
  }
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
