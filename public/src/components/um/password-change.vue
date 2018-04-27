<template>
  <b-modal v-model="modalShow1" title="პაროლის შეცვლა">
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
</template>
<script>
import Cookies from 'js-cookie'
import { bus } from '../common/bus'
import utils from '../../utils'

export default {
  name: 'passwordchange',
  data: () => ({
    modalShow1: false,
    passwordChange: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: ''
    },
    errotText: ''
  }),
  methods: {
    readRef: function () {
      this.modalShow1 = true
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
