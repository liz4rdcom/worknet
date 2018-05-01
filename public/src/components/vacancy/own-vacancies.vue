<template>
  <div>
    <!-- <pre>{{
      JSON.stringify(vacancies, null, 2)
    }}</pre> -->

    <b-container class="bv-example-row">
        <b-row>
            <b-col cols="2">
                <b-nav vertical class="w-25">
                    <b-nav-item href="#/vacancies/own/all">all</b-nav-item>
                    <b-nav-item href="#/vacancies/own/published">published</b-nav-item>
                    <b-nav-item href="#/vacancies/own/draft">draft</b-nav-item>
                    <b-nav-item href="#/vacancies/own/expired">expired</b-nav-item>
                  </b-nav>
            </b-col>

            <b-col  cols="10">
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
  },
}
</script>

<style scoped>
</style>
