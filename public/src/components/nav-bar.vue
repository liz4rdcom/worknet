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
          <b-dropdown-item id="show-modal" @click=" modalShow1 = !modalShow1 ">პაროლის შეცვლა</b-dropdown-item>
          <b-dropdown-item @click="logout">გასვლა</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-modal ref="myModelRef" v-model="modalShow1" title="პაროლის შეცვლა">
          <b-form-input v-model="passwordChange.oldPassword"
            type="text"
            placeholder="ძველი პაროლი"></b-form-input>
          <b-form-input v-model="passwordChange.newPassword"
            type="text"
            placeholder="ახალი პაროლი"></b-form-input>
          <b-form-input v-model="passwordChange.reNewPassword"
            type="text"
            placeholder="გაიმეორეთ ახალი პაროლი"></b-form-input>
          <label v-text="errotText"></label>
          <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="primary" @click="modalShow1=false">
           Close
         </b-btn>
         <b-btn size="sm" class="float-right" variant="primary" @click="handleOk">
           OK
         </b-btn>
          </div>
        </b-modal>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Cookies from 'js-cookie'
import { bus } from './common/bus'
import utils from '../utils'

export default {
  name: 'navbar',
  data: () => ({
    loggedIn: false,
    modalShow1: false,
    passwordChange: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: ''
    },
    errotText: ''
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
    },
    handleOk: async function () {
      if (this.passwordChange.oldPassword === '' || this.passwordChange.newPassword === '' || this.passwordChange.reNewPassword === '') {
        this.errotText = 'შეავსეთ მონაცემები'
      } else {
        if (this.passwordChange.newPassword !== this.passwordChange.reNewPassword) {
          this.errotText = 'ახალი პაროლები არ ემთხვევა'
          this.passwordChange.newPassword = ''
          this.passwordChange.reNewPassword = ''
        } else {
          await this.$http.post('um/resetpass', {userName: this.parseToken(Cookies.get('token')).user, oldPassword: this.passwordChange.oldPassword, newPassword: this.passwordChange.newPassword}, {headers: utils.getHeaders()})
          this.modalShow1 = false
          bus.$emit('success', 'პაროლი წარმატებით შეიცვალა')
          this.passwordChange.oldPassword = ''
          this.passwordChange.newPassword = ''
          this.passwordChange.reNewPassword = ''
        }
      }
    },
    parseToken: function (jwt) {
      if (!jwt) return null
      const payloadString = jwt.split('.')[1]
      const jsonString = Buffer.from(payloadString, 'base64').toString()
      return JSON.parse(jsonString)
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: blue;
}
</style>
