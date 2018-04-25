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
      'nav-bar': navBar
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: whitesmoke;
    height: 100%;
  }

  .flex {
    flex: 1;
  }

</style>
