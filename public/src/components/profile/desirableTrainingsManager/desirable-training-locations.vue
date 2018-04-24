<template>
<div class="desirable-training-locations">
  <georgia-locations />
</div>
</template>

<script>
import georgiaLocations from '../../common/georgia-locations'

export default {
  name: 'desirable-training-locations',
  data: () => ({
  }),
  methods: {
  },
  components: {
    'georgia-locations': georgiaLocations
  }
}
</script>

<style scoped>
</style>
