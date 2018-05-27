<template>
  <div>
    <b-card v-if="!vacancy.published">
      <b-container>
          <b-button variant="primary" :href="`#/vacancies/add/${$route.params.id}`">მონახაზის გაგრძელება</b-button>
      </b-container>
    </b-card>

    <b-card>
      <b-container>
        <b-form-group>
          <b-row>
            <h5>ვაკანსიის მხოლოდ თქვენთვის ხილვადი ნაწილი:&nbsp;&nbsp;</h5>
          </b-row>
        </b-form-group>

        <b-form-group v-if="vacancy.organizationTaxCode">
          <b-row>
            <i>საგადასახადო კოდი:&nbsp;&nbsp;</i>
            <b>{{vacancy.organizationTaxCode}}</b>
          </b-row>
        </b-form-group>

        <b-form-group v-if="vacancy.authorPersonalId">
          <b-row>
            <i>გამომქვეყნებლის პირადი ნომერი:&nbsp;&nbsp;</i>
            <b>{{vacancy.authorPersonalId}}</b>
          </b-row>
        </b-form-group>

        <b-form-group v-if="vacancy.dateLastChanged">
          <b-row>
            <i>ვაკანსიის ბოლოს ცვლილების თარიღი:&nbsp;&nbsp;</i>
            <b>{{vacancy.dateLastChanged | stringDateToDateMonthYearForm}}</b>
          </b-row>
        </b-form-group>

        <b-form-group v-if="vacancy.useMediationService">
          <b-row>
            <i>გამოიყენეთ მედიაციის სერვისი:&nbsp;&nbsp;</i>
            <b>{{vacancy.useMediationService | boolToText}}</b>
          </b-row>
        </b-form-group>
      </b-container>
    </b-card>

    <b-card>
      <b-container>
        <b-row>
          <h5>ვაკანსია გამოქვეყნებულ ფორმატში:&nbsp;&nbsp;</h5>
        </b-row>
      </b-container>
    </b-card>

    <vacancy-public-view :vacancy="vacancy" />
  </div>
</template>

<script>
import vacancyPublicView from '../../common/vacancy-public-view'

export default {
  name: 'vacancies',
  props: ['vacancy'],
  data () {
    return {}
  },
  created() {
  },
  methods: {
  },
  computed: {
  },
  components: {
    'vacancy-public-view': vacancyPublicView,
  },
}
</script>

<style scoped>

</style>
