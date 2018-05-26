<template>
<div>
  <button @click="onAaa">aaa</button>
  <vacancy-public-view :vacancy="vacancy" style="width: 70%; margin: auto;"/>
</div>
</template>

<script>
import vacancyPublicView from './vacancy-public-view'

export default {
  name: 'vacancy-view-dummy-user',
  data () {
    return {
      /*
        'positionName': 'JavaScript Developer',

        'organization': 'შპს FX1',
        'organizationTaxCode': '123456789',

        'authorFullName': 'იაგო მაისურაძე',
        'authorPersonalId': '01234567890',

        'locationName': 'თბილისი',
        'locationUnitName': 'ისანი',

        'publishDate': '2017-12-03T00:00:00',
        'interviewSupposedStartDate': '2018-01-01T00:00:00',
        'endDate': '2018-01-07T00:00:00',

        'vacantPlacesQuantity': 2,

        'additionalDescription': 'damatebiti informacia TEST TEST',

        'minimalSalary': 150,
        'maximalSalary': 300,

        'fullTime': true,
        'partTime': true,
        'shiftBased': true,

        'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',

        'drivingLicenceA': true,
        'drivingLicenceB': true,
        'drivingLicenceC': true,
        'drivingLicenceD': true,
        'drivingLicenceE': true,
        'drivingLicenceT1': true,
        'drivingLicenceT2': true,
        'airLicence': true,
        'seaLicence': true,
        'railwayLicence': true,

        'languages': [{ 'languageName': 'აფხაზური' }],
        'skills': [{ 'skillName': 'Javascript' }],

        'published': false,
      */

      vacancy: {
        'authorUserName': 'root',
        'positionName': 'JavaScript Developer',
        'organization': 'შპს FX1',
        'organizationTaxCode': '123456789',
        'locationName': 'თბილისი',
        'locationUnitName': 'ისანი',
        'publishDate': '2017-12-03T00:00:00',
        'interviewSupposedStartDate': '2018-01-01T00:00:00',
        'endDate': '2018-01-07T00:00:00',
        'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
        'useMediationService': true,
        'vacantPlacesQuantity': 2,
        'additionalDescription': 'სუპერ-გროვა სადაც მზის სისტემა და დედამიწა მდებარეობს. შ.პ.ს "ლანიაკეა" - ეს არის კომპანია რომელიც მიზნად ისახავს რამდენიმე მსხვილი ტექნოლოგიური პროექტის განვითარებას საქართველოში. ჩვენ ვეძებთ Full-Stack Developer-ს რომელიც უხელმძღვანელებს ონლაინ პლატფორმის დეველოპმენტის პროცესს.',
        'minimalSalary': 150,
        'maximalSalary': 300,
        'fullTime': true,
        'partTime': true,
        'shiftBased': true,
        'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
        'drivingLicenceA': true,
        'drivingLicenceB': true,
        'drivingLicenceC': true,
        'drivingLicenceD': true,
        'drivingLicenceE': true,
        'drivingLicenceT1': true,
        'drivingLicenceT2': true,
        'airLicence': true,
        'seaLicence': true,
        'railwayLicence': true,
        'militaryObligation': true,
        'languages': [
          {
            'languageName': 'აფხაზური',
          },
          {
            'languageName': 'ქართული',
          },
        ],
        'skills': [
          {
            'skillName': 'Javascript',
          },
          {
            'skillName': 'CSS',
          },
          {
            'skillName': 'Javascript1',
          },
          {
            'skillName': 'Javascript2',
          },
          {
            'skillName': 'Javascript3',
          },
          {
            'skillName': 'Javascript4',
          },
          {
            'skillName': 'Javascript5',
          },
          {
            'skillName': 'Javascript6',
          },
          {
            'skillName': 'Javascript7',
          },
          {
            'skillName': 'Javascript8',
          },
          {
            'skillName': 'Javascript9',
          },
          {
            'skillName': 'Javascript0',
          },
          {
            'skillName': 'Javascript11',
          },
          {
            'skillName': 'Javascript12',
          },
        ],
        'published': false,
      },
    }
  },
  async created() {},
  methods: {
    onAaa () {
      console.log(12333)
      this.vacancy = 123
    },
  },
  components: {
    'vacancy-public-view': vacancyPublicView,
  },
}
</script>

<style scoped>
</style>
