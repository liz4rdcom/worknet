<template>
<b-card class="vacancy-public-view-container">
  <div class="vacancy-public-view-general">
    <b-form-group>
      <h1>{{vacancy.positionName}}</h1>
    </b-form-group>

    <div style="padding-left: 10px;">
      <label><b>{{vacancy.minimalSalary + ' - ' + vacancy.maximalSalary}}</b><i> ₾ - ხელფასი</i></label><br/>
      <label><b>{{vacancy.locationName}},&nbsp;{{vacancy.locationUnitName}}</b><i> - სამსახურის ადგილმდებარეობა</i></label><br/>
      <label><b>{{vacancy.organization || vacancy.authorFullName}}</b><i> - დამსაქმებელი</i></label><br/>
      <label><b>{{vacancy.interviewSupposedStartDate | stringDateToDateMonthYearForm}}</b><i> - გასაუბრების დაწყების თარიღი</i></label><br/>
      <label><b>{{vacancy.endDate | stringDateToDateMonthYearForm}}</b><i> - ბოლო ვადა</i></label><br/>
      <label>
        <b v-if="vacancy.fullTime">სრული განაკვეთი,</b>
        <b v-if="vacancy.partTime">ნახევარი განაკვეთი,</b>
        <b v-if="vacancy.shiftBased">ცვლებში</b>
        <i> - სამუშაო გრაფიკი</i>
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
        <i> - მართვის მოწმობა</i>
      </label><br/>
      <!-- <label><b>{{vacancy.militaryObligation}}</b><i> - სამხედრო ვალდებულება</i></label><br/> -->
      <label><b>{{vacancy.vacantPlacesQuantity}}</b><i> - ვაკანტური ადგილი</i></label><br/>
    </div>
    <b-form-group />
  </div>

  <b-form-group />

  <div style="padding-left: 10px; padding-right: 10px;">
    <b-form-group>
      {{vacancy.additionalDescription}}
    </b-form-group>

    <label><b>{{vacancy.publishDate | stringDateToDateMonthYearForm}}</b><i> - ვაკანსიის დადების თარიღი</i></label><br/>
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
