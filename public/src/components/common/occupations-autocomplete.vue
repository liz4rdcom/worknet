<template>
  <autocomplete
    :value="value"
    :idPrefix="idPrefix"
    :autofocus="autofocus"
    @input="onAutocompleteInput"
    :list="occupations">
  </autocomplete>
</template>

<script>
import autocomplete from './autocomplete'
import libs from '../../libs'
import { AUTOCOMPLETE_MINIMAL_CHARS } from '../../constants'

export default {
  name: 'occupations-autocomplete',
  props: {
    value: {
      type: String,
      default: '',
    },
    idPrefix: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      occupations: [],
    }
  },
  async created() {
    this.occupations = await libs.searchOcupations()
  },
  methods: {
    async onAutocompleteInput(value) {
      if (this.value === value) return

      this.$emit('input', value)

      if (value.length < AUTOCOMPLETE_MINIMAL_CHARS) return

      this.occupations = await libs.searchOcupations(value)
    },
  },
  components: {
    autocomplete,
  },
}
</script>

<style scoped>
</style>
