<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <notify></notify>
  </div>
</template>

<script>
  import notify from './components/common/notify'
  import navBar from './components/nav-bar'

  export default {
    name: 'app',
    components: {
      notify,
      'nav-bar': navBar,
    },
  }
</script>

<style lang="scss">
@import '@/main.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: $clean;
  height: 100%;
  overflow-y: auto;

  h4 {
    color: $vermillion;
  }

  .card {
    background: whitesmoke;
  }

  .card-title {
    background-color: darkslategray;
    color: whitesmoke;
    border: solid darkslategray 10px;
    border-radius: 15px;
  }
}

.flex {
  flex: 1;
}
</style>
