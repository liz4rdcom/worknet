<template>
  <div id="maininfo">
    <b-card :title="profileTitle">
      <div>
        <img src="https://placekitten.com/500/350" alt="seeker" class="rounded-circle profile-picture">
      </div>
      <div>
        <p>
          {{profileData.approvedByMediationService}}
          <i v-if="profileData.approvedByMediationService" class="fa fa-check" style="color: green;">&nbsp;გადამოწმებულია</i>

          <i v-if="!profileData.approvedByMediationService" class="fa fa-times" style="color: red;">&nbsp;გადაუმოწმებელია</i>
        <p>

        <p>
          <b>სახელი და გვარი:</b> {{profileData.firstName + " " + profileData.lastName}}</p>
        <p>
        <p>
          <b>დაბადების თარიღი:</b> {{profileData.birthDate}}</p>
        <p>
          <b>რეგისტრაციის მისამართი:</b> {{registrationAddress}}</p>
        <p>
          <b>ფაქტიური მისამართი:</b> {{factAddress}}</p>
        <p>
          <b>ტელეფონი:</b> {{profileData.mobileNumber}}</p>
        <p>
          <b>ელ-ფოსტა:</b> {{profileData.email}}</p>
        <p>
          <b>დამატებითი საკონტაქტო:</b> {{profileData.contactDescription}}</p>
        <b-btn v-b-modal.mainInfoModal>პირადი ინფორმაციის რედაქტირება</b-btn>
      </div>
      <b-modal id="mainInfoModal" title="პირადი ინფორმაცია" ok-title="შენახვა" cancel-title="დახურვა" @ok="tryToSaveMainInfo">
        <label>
          <b>სახელი & გვარი</b>
        </label>
        <b-row>
          <b-col style="padding-right: 5px">
            <b-form-input id="maininfo-first-name" v-model="profileData.firstName" type="text" placeholder="სახელი" />
          </b-col>

          <b-col style="padding-left: 5px">
            <b-form-input id="maininfo-last-name" v-model="profileData.lastName" type="text" placeholder="გვარი" />
          </b-col>
        </b-row>


        <label>
          <b>რეგიონი & რაიონი</b>
        </label>
        <locations
          idPrefix="maininfo"
          ref="modalLocation"
          v-if="locationList.length>0" :locations="locationList"
          :currentLocationName="profileData.factLocationName"
          :currentLocationUnitName="profileData.factLocationUnitName"
          @onLocationChanged="onFactLocationChanged">
        </locations>
        <label>
          <b>მისამართი</b>
        </label>
        <b-form-input id="maininfo-address" v-model="profileData.factAddressDescription" type="text" placeholder="მისამართი"></b-form-input>

        <label>
          <b>ელ-ფოსტა</b>
        </label>
        <b-form-input id="maininfo-email" v-model="profileData.email" type="email" placeholder="ელ-ფოსტა"></b-form-input>

        <label>
          <b>ტელეფონი</b>
        </label>
        <b-form-input id="maininfo-phone" v-model="profileData.mobileNumber" type="text" placeholder="ტელეფონი"></b-form-input>

        <label>
          <b>დამატებითი საკონტაქტო</b>
        </label>
        <b-form-input id="maininfo-contact-description" v-model="profileData.contactDescription" type="text" placeholder="დამატებითი საკონტაქტო"></b-form-input>

      </b-modal>
    </b-card>
  </div>
</template>
<script>
  import locations from '../common/locations'
  import omit from 'lodash/omit'
  import libs from '../../libs'
  import { bus } from '../common/bus'
  import utils from '../../utils'

  export default {
    name: 'maininfo',
    data() {
      return {
        baseUrl: 'api/users/profile/maininfo',
        locationList: [], // რეგიონები რაიონები
        profileData: {},
      }
    },
    async created() {
      try {
        const response = await this.$http.get(this.baseUrl, {headers: utils.getHeaders()})
        this.profileData = response.data
        this.locationList = await libs.fetchLocationsOfGeorgia()
      } catch (error) {
        this.locationList = []
        console.log(error)
      }
    },
    computed: {
      profileTitle() {
        return `${this.profileData.firstName} ${this.profileData.lastName} - ${this.profileData.personalId}`
      },
      registrationAddress() {
        return `${this.profileData.registrationLocationName} ${this.profileData.registrationLocationUnitName} - ${this.profileData.registrationAddressDescription}`
      },
      factAddress() {
        return `${this.profileData.factLocationName} ${this.profileData.factLocationUnitName} - ${this.profileData.factAddressDescription}`
      },
    },
    methods: {
      onFactLocationChanged(location) {
        this.profileData.factLocationName = location.locationName
        this.profileData.factLocationUnitName = location.locationUnitName
      },
      async tryToSaveMainInfo() {
        try {
          let mainInfo = omit(this.profileData, ['id', 'personalId'])

          console.log(222, mainInfo)

          await this.$http.put(this.baseUrl, mainInfo)

          bus.$emit('success', 'პროფილი წარმატებით შეინახა')
        } catch (error) {
        }
      },
    },
    components: { 'locations': locations },
  }
</script>
<style scoped>
  label {
    text-align: left;
    width: 100%;
  }
</style>
