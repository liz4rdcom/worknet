<template>
  <b-card class="vacancy-public-view-container">
    <b-form-group v-if="vacancy.approvedByMediationService">
      <i class="fa fa-check" style="color: green;">&nbsp;გადამოწმებულია</i>
    </b-form-group>

    <b-form-group v-if="!vacancy.approvedByMediationService">
      <i class="fa fa-times" style="color: red;">&nbsp;გადაუმოწმებელია</i>
    </b-form-group>

    <b-form-group v-if="vacancy.positionName">
      <h1>{{vacancy.positionName}}</h1>
    </b-form-group>


    <b-container class="vacancy-public-view-partition" fluid>
      <b-form-group v-if="vacancy.minimalSalary && vacancy.maximalSalary">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.minimalSalary}} {{'-'}} {{vacancy.maximalSalary}}</b> ₾
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px; float: right;">
            <i>ხელფასი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.locationName && vacancy.locationUnitName">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.locationName}}, {{vacancy.locationUnitName}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>სამუშაო ადგილი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.organization || vacancy.authorFullName">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.organization || vacancy.authorFullName}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>დამსაქმებელი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.endDate">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.endDate | stringDateToDateMonthYearForm}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>ბოლო ვადა</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group />
    </b-container>

    <b-form-group />
    <b-form-group />

    <b-container class="vacancy-public-view-partition" fluid>
      <b-form-group v-if="vacancy.interviewSupposedStartDate">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.interviewSupposedStartDate | stringDateToDateMonthYearForm}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>გასაუბრების დაწყების თარიღი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.publishDate">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.publishDate | stringDateToDateMonthYearForm}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>ვაკანსიის გამოქვეყნების თარიღი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.vacantPlacesQuantity === 0 || vacancy.vacantPlacesQuantity">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.vacantPlacesQuantity}}</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>ვაკანტური ადგილი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.fullTime || vacancy.partTime || vacancy.shiftBased ">
        <b-row>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b v-if="vacancy.fullTime">სრული&nbsp;განაკვეთი,&nbsp;</b>
          </b-col>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b v-if="vacancy.partTime">ნახევარი&nbsp;განაკვეთი,&nbsp;</b>
          </b-col>
          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b v-if="vacancy.shiftBased">ცვლებში</b>
          </b-col>

          &nbsp;
          <b-col style="padding-left: 0px; padding-right: 0px;">
            <div style="opacity: 0.4; height: 60%; border-bottom: 2px dotted;"/>
          </b-col>
          &nbsp;

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <i>სამუშაო გრაფიკი</i>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group />
    </b-container>

    <b-form-group />
    <b-form-group />

    <b-container class="vacancy-public-view-partition" fluid>
      <b-form-group v-if="vacancy.formalEducationLevelName">
        <b-row>
          <i>განათლების რეკომენდირებული მინიმალური დონე:&nbsp;&nbsp;</i>

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>{{vacancy.formalEducationLevelName}}</b>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.skills && vacancy.skills.length !== 0">
        <b-row>
          <i>საჭირო უნარები:&nbsp;&nbsp;</i>

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;" v-for="skill in vacancy.skills" :key="skill.skillName">
            <b>{{skill.skillName}},&nbsp;</b>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.languages && vacancy.languages.length !== 0">
        <b-row>
          <i>უცხო ენები:&nbsp;&nbsp;</i>

          <b-col cols="auto" style="padding-left: 0px; padding-right: 0px;" v-for="language in vacancy.languages" :key="language.languageName">
            <b>{{language.languageName}},&nbsp;</b>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group
        v-if="
          vacancy.drivingLicenceA ||
          vacancy.drivingLicenceB ||
          vacancy.drivingLicenceC ||
          vacancy.drivingLicenceD ||
          vacancy.drivingLicenceE ||
          vacancy.drivingLicenceT1 ||
          vacancy.drivingLicenceT2
        "
      >
        <b-row>
          <i>მართვის მოწმობა (კატეგორია):&nbsp;&nbsp;</i>

          <b-col v-if="vacancy.drivingLicenceA" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>A,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceB" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>B,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceC" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>C,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceD" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>D,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceE" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>E,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceT1" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>T,&nbsp;</b>
          </b-col>
          <b-col v-if="vacancy.drivingLicenceT2" cols="auto" style="padding-left: 0px; padding-right: 0px;">
            <b>T2&nbsp;</b>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.airLicence">
        <b-row>
          <b>ფრენის ლიცენზია</b>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.seaLicence">
        <b-row>
          <b>საზღვაო ტრანსპორტის ლიცენზია</b>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.railwayLicence">
        <b-row>
          <b>სარკინიგზო ტრანსპორტის ლიცენზია</b>
        </b-row>
      </b-form-group>

      <b-form-group v-if="vacancy.militaryObligation">
        <b-row>
          <b>სამხედრო ვალდებულება</b>
        </b-row>
      </b-form-group>

      <b-form-group />
    </b-container>

    <b-form-group />
    <b-form-group />

    <b-form-group v-if="vacancy.additionalDescription">
      {{vacancy.additionalDescription}}
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  name: 'vacancy-public-view',
  props: {
    vacancy: {
      type: Object,
      default: function () {
        return {}
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
@import '@/color-palette.scss';

.vacancy-public-view-container {
  text-align: left;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  border-radius: 0%;
}
.vacancy-public-view-partition {
  border-bottom: 2px solid $palette-color-1;
}
.ribbon-element-h {
  position: relative;
	width: 350px;
	font-size: 1.5em;
	font-weight: bold;
	padding: 6px 20px 6px 70px;
	margin: 30px 10px 10px -1.25rem;
	color: #555;
	background-color: #999;
	text-shadow: 0px 1px 2px #bbb;
	-webkit-box-shadow: 0px 2px 4px #888;
	-moz-box-shadow: 0px 2px 4px #888;
	box-shadow: 0px 2px 4px #888;
}
</style>
