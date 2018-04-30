<template>
  <div>
    dummy own vacancies:
    <pre>{{
        JSON.stringify(vacancies, null, 2)
      }}</pre>
  </div>
</template>

  <script>
import utils from '../../../utils'

const vacanciesUrl = '/api/vacancies'

export default {
  name: 'language',
  props: ['language'],
  data: () => ({
    vacancies: [],
  }),
  async created() {
    try {
      const response = await this.$http.get(vacanciesUrl, {headers: utils.getHeaders()})

      this.vacancies = response.data

      console.log('999', response, response.data)
    } catch (e) {
      // TODO Notify
      this.vacancies = []
      console.error(e)
    }
  },
  methods: {
  },
}
  </script>

  <style scoped>
  </style>
