<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#/vacancies">WORKNET</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#/vacancies">ვაკანსიები</b-nav-item>
        <b-nav-item v-if="loggedIn" href="#/profile">პროფილი</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item v-if="!loggedIn" href="#/login">შესვლა</b-nav-item>
          <b-nav-item v-if="!loggedIn" href="#/register">რეგისტრაცია</b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown v-if="loggedIn" text="" right>
          <b-dropdown-item @click="logout">გასვლა</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Cookies from 'js-cookie'
import { bus } from './common/bus'

export default {
  name: 'navbar',
  data: () => ({
    loggedIn: false
  }),
  created() {
    this.loggedIn = !!Cookies.get('token')

    bus.$on('login', () => {
      this.loggedIn = true
    })

    bus.$on('logout', () => {
      this.loggedIn = false
    })
  },
  methods: {
    logout() {
      Cookies.remove('token')

      this.loggedIn = false

      this.$router.push('/vacancies')
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: blue;
}
</style>
