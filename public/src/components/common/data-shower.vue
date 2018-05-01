<template>
  <div class="data-shower">
    <b-form-checkbox
      v-model="showDataVisually"
      :value="true"
      :unchecked-value="false"
    >
      Show Data
    </b-form-checkbox>

    <pre v-if="showDataVisually">{{
      JSON.stringify(data, null, 2)
    }}</pre>
  </div>
  </template>

<script>
export default {
  name: 'vacancy-shower',
  props: ['data'],
  data: () => ({ showDataVisually: false }),
}
</script>

<style scoped>
.data-shower {
  border: 1px solid black;
  position: absolute;
  z-index: 999;
  background-color: lightcoral;
  opacity: 0.2;
  max-height: 70%;
  overflow-y: auto;
}
.data-shower:hover {
  opacity: 1;
}
</style>
