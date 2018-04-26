<template>
  <div>
    <h1 class="welcome-element">შედით თქვენს პროფილში</h1>
    <b-card class="login" @keyup.enter="login">
      <b-form-group label="მომხმარებლის სახელი">
          <b-form-input autofocus v-model="userName"
                      type="text"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="პაროლი">
          <b-form-input v-model="password"
                      type="password"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="login">
        შესვლა
      </b-button>
    </b-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { bus } from '../common/bus'

export default {
  name: 'login',
  data: () => ({
    userName: '',
    password: ''
  }),
  methods: {
    async login() {
      try {
        let response = await this.$http.post('/um/login', {
          userName: this.userName,
          password: this.password
        })

        Cookies.set('token', response.data)

        bus.$emit('login')

        this.$router.push('/profile')
      } catch (error) {
        bus.$emit('error', error)
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 25%;
  margin: auto;
  margin-top: 30px;
}
.welcome-element {
  margin-top: 20px;
}
</style>
