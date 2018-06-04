<template>
  <div>
    <h1 class="welcome-element">შედით თქვენს პროფილში</h1>
    <b-card class="login" @keyup.enter="login">
      <b-form-group label="პირადი ნომერი / მომხმარებლის სახელი / იმეილი">
        <b-form-input id="login-username" autofocus v-model="userNameOrEmail" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="პაროლი">
        <b-form-input id="login-password" v-model="password" type="password"></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="login" class="login-button-class">
        შესვლა
      </b-button>
    </b-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { bus } from '../common/bus'
import utils from '../../utils'

export default {
  name: 'login',
  data: () => ({
    userNameOrEmail: '',
    password: '',
  }),
  methods: {
    async login() {
      let loginObj = { password: this.password }

      if (!utils.isValidEmail(this.userNameOrEmail)) {
        loginObj.userName = this.userNameOrEmail
      } else {
        loginObj.email = this.userNameOrEmail
      }

      try {
        let response = await this.$http.post('/um/login', loginObj, {needsToken: false})

        Cookies.set('token', response.data)

        bus.$emit('login')

        this.$router.push('/profile')
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/color-palette.scss';

.login {
  max-width: 30%;
  margin: auto;
  margin-top: 30px;
}
.welcome-element {
  margin-top: 20px;
}
.login-button-class {
  background-color: $palette-color-1;
  border-color: $palette-color-1;
}
.login-button-class:hover {
  background-color: darken($palette-color-1, 10%);
  border-color: darken($palette-color-1, 10%);
}
</style>
