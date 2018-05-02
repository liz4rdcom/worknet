<template>
  <div class="footer" v-if="dismissCountDown">
    <h2></h2>
    <b-alert :show="dismissCountDown" dismissible :variant="notificationType" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
      <p>{{notification}} - {{dismissCountDown}}</p>
    </b-alert>

  </div>
</template>
<script>
  import { bus } from '../common/bus'
  export default {
    name: 'notify',
    data() {
      return {
        notification: 'test notification',
        dismissSecs: 10,
        dismissCountDown: 0,
        notificationType: 'success'
      }
    },
    created() {
      bus.$on('success', (text) => {
        this.notification = text || 'ოპერაცია წარმატებით დასრულდა'
        this.notificationType = 'success'
        this.showAlert()
      })
      bus.$on('error', (error) => {
        this.notification = error.response.data.message
        this.notificationType = (error.response.status === 500) ? 'danger' : 'warning'
        this.showAlert()
      })
      bus.$on('warning', (text) => {
        this.notification = text
        this.notificationType = 'warning'
        this.showAlert()
      })
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>
<style scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    overflow: hidden;
  }
</style>
