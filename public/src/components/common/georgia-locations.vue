<template>
    <locations
      :locations="locationList"
      :currentLocationName="currentLocationName"
      :currentLocationUnitName="currentLocationUnitName"
      @onLocationChanged="onLocationChanged"
    />
</template>

<script>
  import locations from '../common/locations'
  import libs from '../../libs'

  export default {
    name: 'georgia-locations',
    props: ['currentLocationName', 'currentLocationUnitName', 'onLocationChanged'],
    data() {
      return {
        locationList: [],
      }
    },
    async created() {
      try {
        this.locationList = await libs.fetchLocationsOfGeorgia()
      } catch (e) {
        // TODO Notify
        this.locationList = []
        console.error(e)
      }
    },
    components: { 'locations': locations },
  }
</script>

<style scoped>
</style>
