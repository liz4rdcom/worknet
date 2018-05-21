<template>
  <div>
    <maininfo></maininfo>

    <profile-skills></profile-skills>

    <educations></educations>

    <experiences></experiences>

    <desirable-jobs/>

    <desirable-trainings-manager/>

    <languages></languages>

    <desirable-job-locations></desirable-job-locations>

    <more-information></more-information>
  </div>
</template>

<script>
  import maininfo from './maininfo'
  import profileSkills from './profile-skills'
  import experiences from './experiences'
  import educations from './educations'
  import desirableJobs from './desirable-jobs'
  import desirableTrainingsManager from './desirableTrainingsManager/desirable-trainings-manager'
  import languages from './languages'
  import desirableJobLocations from './desirable-job-locations'
  import moreInformation from './moreInformation'

  export default {
    name: 'profile',
    components: {
      'maininfo': maininfo,
      'profile-skills': profileSkills,
      'experiences': experiences,
      'educations': educations,
      'desirable-jobs': desirableJobs,
      'desirable-trainings-manager': desirableTrainingsManager,
      'languages': languages,
      'desirable-job-locations': desirableJobLocations,
      'more-information': moreInformation,
    },
  }
</script>


<style>
  p {
    text-align: left;
  }

  .right-float {
    float: right
  }

  .right-clear {
    clear: right;
  }

  .list-group-item {
    border-bottom: solid darkseagreen;
  }

  .profile-picture {
    width: 200px;
    height: 200px;
  }

  .education-list {
    clear: right;
  }
</style>
