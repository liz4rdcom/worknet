<template>
  <div>
    <b-card title="სასურველი სამსახურის ადგილმდებარეობა">
      <div>
        <locations :locations="locationsList" @onLocationChanged="onLocationChanged"></locations>
        <b-button  variant="primary" @click="addLocation">
          დამატება
        </b-button>
      </div>
      <div class="chip" v-for="item in desirableJobLocations" :key="item.locationName">
        {{item.locationName}} <br/> {{item.locationUnitName}}
        <span class="closebtn" @click="removeElement(item)">&times;</span>
      </div>
    </b-card>
  </div>
</template>

<script>
import locations from '../common/locations'
import libs from '../../libs'
import utils from '../../utils'
import { bus } from '../common/bus'

const baseUrl = '/api/users/profile/desirableJobLocations'

export default {
  name: 'desirable-job-locations',
  data: () => ({
    locationsList: [],
    desirableJobLocations: [],
    location: {}
  }),
  async created() {
    let response

    [
      this.locationsList,
      response
    ] = await Promise.all([
      libs.fetchLocationsOfGeorgia(),
      this.$http.get(baseUrl, {headers: utils.getHeaders()})
    ])

    this.desirableJobLocations = response.data
  },
  methods: {
    removeElement: async function (item) {
      try {
        await this.$http.delete(baseUrl, {params: item, headers: utils.getHeaders()})
        let index = this.desirableJobLocations.findIndex((d) => d.locationName === item.locationName && d.locationUnitName === item.locationUnitName)
        this.desirableJobLocations.splice(index, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    onLocationChanged(location) {
      this.location = location
    },
    addLocation: async function () {
      try {
        await this.$http.post(baseUrl, this.location, {headers: utils.getHeaders()})
        this.desirableJobLocations.push(this.location)
      } catch (error) {
        bus.$emit('error', error)
      }
    }
  },
  components: {
    locations
  }
}
</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 100px;
  font-size: 16px;
  line-height: 45px;
  border-radius: 25px;
  background-color: gold;
  margin: 5px;
}

.closebtn {
  padding-left: 10px;
  color: #888;
  font-weight: bold;
  float: right;
  font-size: 20px;
  cursor: pointer;
}

.closebtn:hover {
  color: #000;
}
</style>
