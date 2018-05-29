<template>
  <locations
    v-if="locationList.length > 0"
    :idPrefix="idPrefix"
    :locations="locationList"
    :currentLocationName="currentLocationName"
    :currentLocationUnitName="currentLocationUnitName"
    @onLocationChanged="onLocationChanged"
    :disabled="disabled"
  />
</template>

<script>
  import locations from '../common/locations'
  import libs from '../../libs'

  export default {
    name: 'georgia-locations',
    props: ['currentLocationName', 'currentLocationUnitName', 'idPrefix', 'disabled'],
    data() {
      return {
        locationList: [],
      }
    },
    async created() {
      try {
        this.locationList = await libs.fetchLocationsOfGeorgia()
      } catch (e) {
        this.locationList = []
        console.error(e)
      }
    },
    methods: {
      onLocationChanged (...args) {
        this.$emit('onLocationChanged', ...args)
      },
    },
    components: { 'locations': locations },
  }
</script>

<style scoped>
</style>
