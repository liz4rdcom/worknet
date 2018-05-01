<template>
  <div>
    <!-- <pre>{{
      JSON.stringify(vacancies, null, 2)
    }}</pre> -->

    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="2">
                <b-nav vertical class="w-25">
                    <b-nav-item href="#/vacancies/own/all">ყველა</b-nav-item>
                    <b-nav-item href="#/vacancies/own/published">გამოქვეყნებულები</b-nav-item>
                    <b-nav-item href="#/vacancies/own/draft">მონახაზები</b-nav-item>
                    <b-nav-item href="#/vacancies/own/expired">ვადაგასულები</b-nav-item>
                  </b-nav>
            </b-col>

            <b-col v-if="vacancies !== null" cols="10">
                <router-view :vacancies="vacancies"></router-view>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import utils from '../../utils'

const vacanciesUrl = '/api/vacancies'

export default {
  name: 'own-vacancies',
  props: ['language'],
  data: () => ({
    vacancies: null,
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
  },
}
</script>

<style scoped>
</style>
