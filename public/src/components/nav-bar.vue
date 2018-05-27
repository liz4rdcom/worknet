<template>
<div v-if="this.$route.path !== '/vacancies'">
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :active="true" href="#/vacancies">WORKNET</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item class="nav-item-class" href="#/vacancies">ვაკანსიები</b-nav-item>
        <b-nav-item-dropdown id="nav-bar-vacancy-management-dropdown" v-if="loggedIn" text="ვაკანსიების მენეჯმენტი" right>
          <b-dropdown-item href="#/vacancies/add">ახლის დამატება</b-dropdown-item>
          <b-dropdown-item href="#/vacancies/own">ჩემი ვაკანსიები</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="loggedIn" href="#/profile">პროფილი</b-nav-item>
        <b-nav-item v-if="loggedIn" href="#/vacancies-matching">შესაბამისი ვაკანსიები</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item v-if="!loggedIn" href="#/login">შესვლა</b-nav-item>
          <b-nav-item v-if="!loggedIn" href="#/register">რეგისტრაცია</b-nav-item>
        </b-navbar-nav>
        <b-nav-item-dropdown id="nav-bar-user-operations-dropdown" v-if="loggedIn" text="" right>
          <b-dropdown-item id="show-modal" @click="modalTrue">პაროლის შეცვლა</b-dropdown-item>
          <b-dropdown-item @click="logout">გასვლა</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
 <password-change ref="modalRef"></password-change>
</div>
</template>

<script>
import { bus } from './common/bus'
import passwordChange from './um/password-change'
export default {
  name: 'navbar',
  props: ['loggedIn'],
  components: {
    'password-change': passwordChange,
  },
  methods: {
    modalTrue: function () {
      this.$refs.modalRef.openModal()
    },
    logout() {
      bus.$emit('logout')

      this.$router.push('/vacancies')
    },
  },
}
</script>

<style scoped>
</style>
