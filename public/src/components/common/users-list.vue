<template>
  <div role="tablist">
    <b-card no-body class="mb-1 user-card" v-for="user in users" :key="user.id">
      <b-card-header class="p-1" role="tab">
        <b-btn block v-b-toggle="user.id" variant="outline-secondary">
          <h3>
            <b>{{user.firstName}} {{user.lastName}} ({{user.personalId}})</b>
          </h3>

          <h3>
            <i v-if="user.approvedByMediationService" class="fa fa-check" style="color: green;">&nbsp;გადამოწმებულია</i>

            <i v-if="!user.approvedByMediationService" class="fa fa-times" style="color: red;">&nbsp;გადაუმოწმებელია</i>
          </h3>
        </b-btn>
      </b-card-header>
      <b-collapse :id="user.id" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <h6><label>ფაქტ. რეგიონი: &nbsp; </label><b>{{user.factLocationName}}</b></h6>
          <h6><label>ფაქტ. რაიონი: &nbsp; </label><b>{{user.factLocationUnitName}}</b></h6>
          <h6><label>ფაქტ. მისამართი: &nbsp; </label><b>{{user.factAddressDescription}}</b></h6>
          <h6><label>მობილური: &nbsp; </label><b>{{user.mobileNumber}}</b></h6>
          <h6><label>ელ-ფოსტა: &nbsp; </label><b>{{user.email}}</b></h6>
          <h6><label>ფორმალური განათლების დონე: &nbsp; </label><b>{{user.formalEducationLevelName}}</b></h6>
          <h6><label>სასურველი ხელფასი: &nbsp; </label><b>{{user.desirableSalary}}</b></h6>
          <h6><label>სურს სააგენტოს დახმარება: &nbsp; </label><b>{{user.useMediationService | boolToText}}</b></h6>
          <h6><label>სურს პროფესიული მომზადება/გადამზადება: &nbsp; </label><b>{{user.interestedInInternship | boolToText}}</b></h6>
          <h6><label>სურს სრული განაკვეთი: &nbsp; </label><b>{{user.fullTime | boolToText}}</b></h6>
          <h6><label>სურს ნახევარი განაკვეთი: &nbsp; </label><b>{{user.partTime | boolToText}}</b></h6>
          <h6><label>სურს ცვლები: &nbsp; </label><b>{{user.shiftBased | boolToText}}</b></h6>
          <h6>
            <label>სასურველი საქმიანობები: &nbsp; </label>
            <b v-for="desirableJob in user.desirableJobs">{{desirableJob.name + ', '}}</b>
          </h6>
          <h6>
            <label>სამუშაო გამოცდილება: &nbsp; </label>
            <b v-for="jobExperience in user.jobExperiences">{{jobExperience.jobTitle + ', '}}</b>
          </h6>
          <h6>
            <label>სასურველი სამუშაო ადგილი: &nbsp; </label>
            <b v-for="desirableJobLocation in user.desirableJobLocations">
              {{desirableJobLocation.locationName + ' - ' + desirableJobLocation.locationUnitName + ', '}}
            </b>
          </h6>
          <h6>
            <label>ენები: &nbsp; </label>
            <b v-for="language in user.languages">
              {{language.languageName + ', '}}
            </b>
          </h6>
          <h6>
            <label>უნარები: &nbsp; </label>
            <b v-for="skill in user.skills">
              {{skill.skillName + ', '}}
            </b>
          </h6>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'users-list',
  props: {
    users: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
}
</script>

<style scoped>
.user-card {
  text-align: left;
}

.user-card h6 {
  line-height: 1.0;
}
</style>
