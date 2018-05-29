<template>
  <div>
    <!-- <b-card class="mb-2 vacancy" v-for="vacancy in vacancies" :key="vacancy.id">
      <div @click="viewVacancy(vacancy.id)">
        <h3 class="card-title">{{vacancy.positionName}}</h3>
        <h4 v-if="vacancy._percent" class="percent-view">პარამეტრების დამთხვევა: {{vacancy._percent}}</h4>
        <h5 class="card-text">{{vacancy.organization}}</h5>
        <h5 class="card-text" v-for="skill in getSkills(vacancy)" :key="skill.skillName" @click="skillFilter(skill.skillName, $event)">{{skill.skillName}}</h5>
        <h5 class="card-text">{{vacancy.publishDate}}</h5>
        <h5 class="card-text">სრულად ნახვა...</h5>
      </div>
    </b-card>
    <side-modal ref="modalRef">
      <vacancy-view :id="vacancyId" v-if="vacancyId"></vacancy-view>
    </side-modal> -->
  </div>
</template>

<script>
// import sideModal from '../common/side-modal'
// import vacancyView from './vacancy-view'

// export default {
//   name: 'vacancies-search-list',
//   props: {
//     vacancies: {
//       type: Array,
//       default: function () {
//         return []
//       },
//     },
//   },
//   data: () => ({
//     vacancyId: null,
//   }),
//   methods: {
//     getSkills(vacancy) {
//       if (!vacancy.skills) {
//         return ''
//       }
//       let arr = []
//       let vacancyLeght = vacancy.skills.length
//       if (vacancyLeght > 10) {
//         vacancyLeght = 10
//       }
//       for (let i = 0; i < vacancyLeght; i++) {
//         arr.push(vacancy.skills[i])
//       }
//       return arr
//     },
//     viewVacancy(vacancyId) {
//       this.vacancyId = vacancyId
//       this.$refs.modalRef.sideModalOpen()
//     },
//     skillFilter(skill, event) {
//       event.stopPropagation()

//       this.$emit('skillClick', skill)
//     },
//   },
//   components: {
//     'side-modal': sideModal,
//     'vacancy-view': vacancyView,
//   },
// }
</script>

<style scoped>
.vacancy:hover {
  box-shadow: 0 0 6px rgba(161, 161, 161, 0.89);
}

.percent-view {
  /* background-color: #9ec4c4; */
  border-radius: 9%;
  padding: 2px;
  /* color: white; */
  font-size: 1.25rem;
  text-align: left;
}
</style>
