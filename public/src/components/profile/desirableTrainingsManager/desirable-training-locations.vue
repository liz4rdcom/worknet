<template>
<div class="desirable-training-locations">
  <georgia-locations idPrefix="desirable-trainings" :onLocationChanged="onLocationChanged" />
  <div class="add-button-container">
    <b-btn @click="addLocation">დამატება</b-btn>
  </div>
  <div class="chip" v-for="item in desirableTrainingLocationList">
    {{`${item.name} - ${item.unitName}`}}
    <span class="closebtn" @click="onRemoveLocation(item)">&times;</span>
  </div>
</div>
</template>

<script>
import { bus } from '../../common/bus'
import utils from '../../../utils'
import georgiaLocations from '../../common/georgia-locations'

const baseUrl = '/api/users/profile/desirableTrainingLocations'

export default {
  name: 'desirable-training-locations',
  props: ['desirableTrainingLocationList'],
  data: () => ({
    chosenLocation: {
      name: null,
      unitName: null,
    },
  }),
  methods: {
    onLocationChanged(location) {
      this.chosenLocation = {
        name: location.locationName,
        unitName: location.locationUnitName,
      }
    },
    async addLocation() {
      if (this.chosenLocation.name === null || this.chosenLocation.unitName === null) {
        console.error('location is not chosen')
        return
      }

      let indexOfLocation = this.desirableTrainingLocationList.findIndex(
        t => t.name.toLowerCase() === this.chosenLocation.name.toLowerCase() &&
              t.unitName.toLowerCase() === this.chosenLocation.unitName.toLowerCase()
      )
      if (indexOfLocation !== -1) {
        console.error('this location already exists')
        return
      }

      let locationObject = {
        name: this.chosenLocation.name,
        unitName: this.chosenLocation.unitName,
      }

      try {
        await this.$http.post(baseUrl, locationObject, {
          headers: utils.getHeaders(),
        })

        this.desirableTrainingLocationList.push(locationObject)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onRemoveLocation(location) {
      let indexOfLocation = this.desirableTrainingLocationList.findIndex(
        t => t.name.toLowerCase() === location.name.toLowerCase() &&
              t.unitName.toLowerCase() === location.unitName.toLowerCase()
      )
      if (indexOfLocation === -1) {
        console.error('can\'t find index of location')
        return
      }

      try {
        const url = baseUrl + `/${location.name}` + `/${location.unitName}`

        await this.$http.delete(url, {
          headers: utils.getHeaders(),
        })

        this.desirableTrainingLocationList.splice(indexOfLocation, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  components: {
    'georgia-locations': georgiaLocations,
  },
}
</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
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
.add-button-container {
  width: 100%;
}
</style>
