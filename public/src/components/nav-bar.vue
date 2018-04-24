<template>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Worknet</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>


      <b-button v-if="loggedIn" variant="primary" @click="logout">
        გასვლა
      </b-button>
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
