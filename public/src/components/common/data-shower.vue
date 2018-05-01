<template>
  <div class="data-visually">
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
  name: 'vacancy-add',
  props: ['data'],
  data: () => ({ showDataVisually: false }),
}
</script>

<style scoped>
.data-visually {
  border: 1px solid black;
  position: absolute;
  z-index: 999;
  background-color: lightcoral;
  opacity: 0.2;
  max-height: 70%;
  overflow-y: auto;
}
.data-visually:hover {
  opacity: 1;
}
</style>
