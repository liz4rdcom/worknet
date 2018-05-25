<template>
<b-card class="vacancy-public-view-container">
  <div class="vacancy-public-view-general">
    <b-form-group>
      <h1>{{vacancy.positionName}}</h1>
    </b-form-group>

    <div style="padding-left: 10px;">
      <label><b>{{vacancy.minimalSalary}}&nbsp;{{'-'}}&nbsp;{{vacancy.maximalSalary}}</b><i>&nbsp;₾&nbsp;- ხელფასი</i></label><br/>
      <label><b>{{vacancy.locationName}},&nbsp;{{vacancy.locationUnitName}}</b><i>&nbsp;- სამსახურის&nbsp;ადგილმდებარეობა</i></label><br/>
      <label><b>{{vacancy.organization || vacancy.authorFullName}}</b><i>&nbsp;- დამსაქმებელი</i></label><br/>
      <label><b>{{vacancy.interviewSupposedStartDate | stringDateToDateMonthYearForm}}</b><i>&nbsp;- გასაუბრების&nbsp;დაწყების&nbsp;თარიღი</i></label><br/>
      <label><b>{{vacancy.endDate | stringDateToDateMonthYearForm}}</b><i>&nbsp;- ბოლო&nbsp;ვადა</i></label><br/>
      <label>
        <b v-if="vacancy.fullTime">სრული&nbsp;განაკვეთი,</b>
        <b v-if="vacancy.partTime">ნახევარი&nbsp;განაკვეთი,</b>
        <b v-if="vacancy.shiftBased">ცვლებში</b>
        <i>&nbsp;- სამუშაო&nbsp;გრაფიკი</i>
      </label><br/>
      <label>
        <b v-if="vacancy.drivingLicenceA">კატეგორია "A",</b>
        <b v-if="vacancy.drivingLicenceB">კატეგორია "B",</b>
        <b v-if="vacancy.drivingLicenceC">კატეგორია "C",</b>
        <b v-if="vacancy.drivingLicenceD">კატეგორია "D",</b>
        <b v-if="vacancy.drivingLicenceE">კატეგორია "E",</b>
        <b v-if="vacancy.drivingLicenceT1">კატეგორია "T1",</b>
        <b v-if="vacancy.drivingLicenceT2">კატეგორია "T2",</b>
        <b v-if="vacancy.airLicence">ფრენის ლიცენზია,</b>
        <b v-if="vacancy.seaLicence">საზღვაო ტრანსპორტის ლიცენზია,</b>
        <b v-if="vacancy.railwayLicence">სარკინიგზო ტრანსპორტის ლიცენზია</b>
        <i>&nbsp;- მართვის&nbsp;მოწმობა</i>
      </label><br/>
      <!-- <label><b>{{vacancy.militaryObligation}}</b><i> - სამხედრო ვალდებულება</i></label><br/> -->
      <label><b>{{vacancy.vacantPlacesQuantity}}</b><i>&nbsp;- ვაკანტური&nbsp;ადგილი</i></label><br/>
    </div>
    <b-form-group />
  </div>

  <b-form-group />

  <div style="padding-left: 10px; padding-right: 10px;">
    <b-form-group>
      {{vacancy.additionalDescription}}
    </b-form-group>

    <label><b>{{vacancy.publishDate | stringDateToDateMonthYearForm}}</b><i>&nbsp;- ვაკანსიის&nbsp;დადების&nbsp;თარიღი</i></label><br/>
  </div>




  <pre>
    {{JSON.stringify(vacancy, null, 2)}}
  </pre>
</b-card>
</template>

<script>
export default {
  name: 'vacancy-public-view',
  props: {
    vacancy: {
      positionName: {
        type: String,
      },

      organization: {
        type: String,
      },
      authorFullName: {
        type: String,
      },

      locationName: {
        type: String,
      },
      locationUnitName: {
        type: String,
      },

      publishDate: {
        type: String,
      },
      interviewSupposedStartDate: {
        type: String,
      },
      endDate: {
        type: String,
      },

      vacantPlacesQuantity: {
        type: Number,
      },
      additionalDescription: {
        type: String,
      },

      minimalSalary: {
        type: Number,
      },
      maximalSalary: {
        type: Number,
      },

      fullTime: {
        type: Boolean,
      },
      partTime: {
        type: Boolean,
      },
      shiftBased: {
        type: Boolean,
      },

      formalEducationLevelName: {
        type: String,
      },

      drivingLicenceA: {
        type: Boolean,
      },
      drivingLicenceB: {
        type: Boolean,
      },
      drivingLicenceC: {
        type: Boolean,
      },
      drivingLicenceD: {
        type: Boolean,
      },
      drivingLicenceE: {
        type: Boolean,
      },
      drivingLicenceT1: {
        type: Boolean,
      },
      drivingLicenceT2: {
        type: Boolean,
      },
      airLicence: {
        type: Boolean,
      },
      seaLicence: {
        type: Boolean,
      },
      railwayLicence: {
        type: Boolean,
      },

      militaryObligation: {
        type: Boolean,
      },

      languages: {
        type: Array,
      },
      skills: {
        type: Array,
      },
    },
  },
  data () {
    return {}
  },
  async created() {},
  methods: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '@/main.scss';

.vacancy-public-view-container {
  text-align: left;
  border-top: 8px solid $fresh;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  border-radius: 0%;
}
.vacancy-public-view-general {
  border-bottom: 1px solid $fresh;
}
</style>
