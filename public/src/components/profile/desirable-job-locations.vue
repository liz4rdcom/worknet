<template>
  <div>
    <b-card title="სასურველი სამსახურის ადგილმდებარეობა">
      <b-button  variant="primary">
        დამატება
      </b-button>

      <locations :locations="locationsList" ></locations>
    </b-card>
  </div>
</template>

<script>
import locations from '../common/locations'
import libs from '../../libs'
import utils from '../../utils'

const baseUrl = '/api/users/profile/desirableJobLocations'

export default {
  name: 'desirable-job-locations',
  data: () => ({
    locationsList: [],
    desirableJobLocations: []
  }),
  async created() {
    [
      this.locationsList,
      this.desirableJobLocations
    ] = await Promise.all([
      libs.fetchLocationsOfGeorgia(),
      this.$http.get(baseUrl, {headers: utils.getHeaders()})
    ])
  },
  components: {
    locations
  }
}
</script>

<style scoped>
</style>
