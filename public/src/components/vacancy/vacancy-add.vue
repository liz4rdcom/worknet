<template>
<div class="vacancy-add">
  <h1 class="hint-element">დაამატეთ ვაკანსია</h1>
  <b-form-group label="'positionName': 'JavaScript Developer',">
    <b-form-input autofocus type="text"
    ></b-form-input>
  </b-form-group>

  <b-form-group label="'organization': 'შპს FX1',"> <!-- optional fwichka -->
    <b-form-input type="text"
    ></b-form-input>
  </b-form-group>
  <b-form-group label="'organizationTaxCode': '123456789',"> <!-- optional fwichka -->
    <b-form-input type="text"
    ></b-form-input>
  </b-form-group>
  <b-form-group label="'locationName': 'თბილისი', //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'locationUnitName': 'ისანი', //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'addressLine': 'დამატებითი მისამართი',"> <!-- optional -->
    <b-form-input type="text"
    ></b-form-input>
  </b-form-group>
  <b-form-group label="'publishDate': '2017-12-03T00:00:00',">
    NOT NEEDED ON FRONT
  </b-form-group>
  <b-form-group label="'interviewSupposedStartDate': '2018-01-01T00:00:00',"> <!-- optional -->
    soon weli archevani marto 2
  </b-form-group>
  <b-form-group label="'endDate': '2018-01-07T00:00:00',"> <!-- optional -->
    soon draftshi gadava tu gavida vada, da mere draftshi imit mixvdebi ro gadmosulia da ara saerotd gamouqveynebeli ro end date naklebi iqneba now-ze
    tu draftshi iyo da gavida vada, mainc daiwyeba axlandelidan dropdown, mara dzveli daewera tavze, tu ra iyo dzveli.
  </b-form-group>
  <b-form-group label="'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',">
    NOT NEEDED ON FRONT
  </b-form-group>
  <b-form-group label="'useMediationService': true,">
    soon checkbox
  </b-form-group>
  <b-form-group label="'vacantPlacesQuantity': 2,"> <!-- optional -->
    soon optional
  </b-form-group>
  <b-form-group label="'functionsDescription': 'blablablabla',"> <!-- optional -->
    soon optional
  </b-form-group>
  <b-form-group label="'additionalDescription': 'damatebiti informacia TEST TEST',"> <!-- optional -->
    soon optional nevismieri rame
  </b-form-group>
  <b-form-group label="'salaryInfoName': '150-300', //"> <!-- optional -->
    soon text area with placeholders
  </b-form-group>
  <b-form-group label="'fullTime': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'partTime': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'shiftBased': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //"> <!-- optional -->
    soon checkboxes
  </b-form-group>
  <b-form-group label="'formalEducationLevelId': '3', //"> <!-- optional -->
    soon minimaluri ganatlebis done
  </b-form-group>
  <b-form-group label="'drivingLicenceA': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceB': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceC': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceD': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceE': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceT1': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'drivingLicenceT2': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'airLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'seaLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'railwayLicence': true, //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'languages': [ //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'skills': [ //"> <!-- optional -->
    soon
  </b-form-group>
  <b-form-group label="'published': true"> <!-- optional -->
    NOT NEEDED ON FRONT
  </b-form-group>
</div>
</template>
<script>

export default {
  name: 'vacancy-add',
  data: () => ({
    vacancy: {} // v-model="vacancy.shiftBased"
  })
}
</script>
<style scoped>
.vacancy-add {
  margin: auto;
  width: 90%;
}
.hint-element {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
