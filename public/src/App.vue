<template>
  <div id="app">
    <nav-bar :loggedIn="loggedIn"></nav-bar>
    <router-view :loggedIn="loggedIn"/>
    <notify></notify>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { bus } from './components/common/bus'
import notify from './components/common/notify'
import navBar from './components/nav-bar'

export default {
  name: 'app',
  data () {
    return {
      loggedIn: false,
    }
  },
  created() {
    this.loggedIn = !!Cookies.get('token')

    bus.$on('login', () => {
      this.loggedIn = true
    })

    bus.$on('logout', () => {
      this.loggedIn = false
      Cookies.remove('token')
    })
  },
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
