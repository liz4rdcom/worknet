<template>
  <b-row>
    <b-col class="first-col">
      <b-form-select
        :id="idWithPrefix(idPrefix, 'location-region')"
        :value="selectedLocationName"
        :options="locations"
        value-field="locationName"
        text-field="locationName"
        @change="locationChanged"
        :disabled="disabled"
      >
        <template slot="first">
          <option :value="null">- აირჩიე რეგიონი -</option>
        </template>
      </b-form-select>
    </b-col>

    <b-col class="second-col">
      <b-form-select
        :id="idWithPrefix(idPrefix, 'location-district')"
        :value="selectedLocationUnitName"
        :options="selectedLocation.units"
        value-field="locationUnitName"
        text-field="locationUnitName"
        @change="locationUnitChanged"
        :disabled="disabled"
      >
        <template slot="first">
          <option :value="null">- აირჩიე რაიონი -</option>
        </template>
      </b-form-select>
    </b-col>
  </b-row>
</template>

<script>
  import utils from '../../utils'

  /**
   * კომპონენტი მისამართისთვის (რეგიონი & რაიონი) location , unit
   * გადაწოდებულ მისამართების მასივს (locations) უნდა ქონდეს შემდეგი სტრუქტურა
   * locationsList: [
          {
            locationName: 'თბილისი',
            units: [
              { locationUnitName: 'ვაკე' },
              { locationUnitName: 'ისანი' }
            ]
          }
        ]
  */

  export default {
    name: 'locations',
    props: ['locations', 'currentLocationName', 'currentLocationUnitName', 'idPrefix', 'disabled'],
    data() {
      return {
        locationDefaultObject: Object.freeze({
          locationName: '',
          units: [],
        }),
        selectedLocationName: '',
        selectedLocationUnitName: '',
        selectedLocation: this.locationDefaultObject,
        idWithPrefix: utils.idWithPrefix,
      }
    },
    created() {
      this.selectedLocationName = this.currentLocationName || this.currentLocationName === null ? this.currentLocationName : ''
      this.selectedLocationUnitName = this.currentLocationUnitName || this.currentLocationUnitName === null ? this.currentLocationUnitName : ''

      this.selectedLocation = this.locationDefaultObject

      this.loadOptions()
    },
    watch: {
      currentLocationName(value) {
        this.selectedLocationName = value

        this.loadOptions()
      },
      currentLocationUnitName(value) {
        this.selectedLocationUnitName = value
      },
    },
    methods: {
      locationChanged(locationName) {
        this.selectedLocationName = locationName

        let location = this.locations.find(t => t.locationName === locationName)

        this.selectedLocation = location || this.locationDefaultObject

        if (!this.selectedLocationName) {
          this.locationUnitChanged(null)
        }
      },
      locationUnitChanged(unitName) {
        this.selectedLocationUnitName = unitName

        this.$emit('onLocationChanged', {
          locationName: this.selectedLocationName,
          locationUnitName: this.selectedLocationUnitName,
        })
      },
      loadOptions() {
        if (this.selectedLocation.locationName !== this.selectedLocationName) {
          let location = this.locations.find(item => item.locationName === this.selectedLocationName)

          this.selectedLocation = location || this.locationDefaultObject
        }
      },
    },
  }
</script>

<style scoped>
.first-col {
  padding-right: 5px;
}
.second-col {
  padding-left: 5px;
}
</style>
