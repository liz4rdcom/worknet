<template>
  <div>
    <h1 class="hint-element">დარეგისტრირდით მარტივად</h1>
    <b-card class="register">
      <b-form-group label="დარეგისტრირდით პირადი ნომერით ან მოიფიქრეთ მომხმარებლის სახელი">
          <b-form-input autofocus v-model="personalNumberOrUserName"
                      type="text"
          ></b-form-input>
      </b-form-group>
      <b-container>
          <b-row>
              <b-col>მოიფიქრეთ პაროლი</b-col>
              <b-col>აკრიფეთ პაროლი მეორედ</b-col>
          </b-row>
          <b-row>
              <b-col class="password-col">
                  <b-form-group> 
                      <b-form-input v-model="password"
                                  type="password"
                      ></b-form-input>
                  </b-form-group>
              </b-col>
              <b-col class="confirm-password-col">
                  <b-form-group>
                      <b-form-input v-model="confirmPassword"
                                  type="password"
                      ></b-form-input>
                  </b-form-group>
              </b-col>
          </b-row>
      </b-container>
      <b-form-group label="ელექტრონული ფოსტა (იმეილი)">
          <b-form-input v-model="email"
                      type="text"
          ></b-form-input>
      </b-form-group>
      <b-form-group label="საკონტაქტო ნომერი">
          <b-form-input v-model="contactNumber"
                      type="text"
          ></b-form-input>
      </b-form-group>
      <b-form-group label="დაბადების თარიღი">
        <b-container>
            <b-row>
              <b-col class="birth-day-col">
                  <b-form-select v-model="birthDay" :options="birthDayOptions"/>
              </b-col>
              <b-col class="birth-month-col">
                  <b-form-select v-model="birthMonth" :options="birthMonthOptions"/>
              </b-col>
              <b-col class="birth-year-col">
                  <b-form-select v-model="birthYear" :options="birthYearOptions"/>
              </b-col>
            </b-row>
        </b-container>  
      </b-form-group>
      <b-button variant="primary" @click="register">
        რეგისტრაციის დასრულება
      </b-button>
    </b-card>
  </div>
</template>

<script>
import reverse from 'lodash/reverse'
import { MAX_DAYS_IN_MONTH, MONTH_NAMES, EARLIEST_REALISTIC_BIRTH_YEAR } from '../../constants'
import dummyCRA from '../../dummyCRA'
import utils from '../../utils'
import { bus } from '../common/bus'

export default {
  name: 'register',
  data: () => ({
    personalNumberOrUserName: '',
    password: '',
    confirmPassword: '',
    email: '',
    contactNumber: '',
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  }),
  methods: {
    async performRegister() {
      try {
        const registerConfig = {
          userName: this.personalNumberOrUserName,
          password: this.password
        }

        if (this.email) {
          registerConfig.email = this.email
        }

        if (this.contactNumber) {
          registerConfig.phone = this.contactNumber
        }

        await this.$http.post('/um/signup', registerConfig)

        this.$router.push('/login')

        alert('რეგისტრაცია გაირეთ წარმატებით, შეგიძლიათ შეხვიდეთ თქვენს პროფილში.')
      } catch (regError) {
        bus.$emit('error', regError)
      }
    },

    async register() {
      console.log(
        'register: ',
        '\n personalNumberOrUserName: ', this.personalNumberOrUserName + ' @@END',
        '\n password: ', this.password + ' @@END',
        '\n confirmPassword: ', this.confirmPassword + ' @@END',
        '\n email: ', this.email + ' @@END',
        '\n contactNumber: ', this.contactNumber + ' @@END',
        '\n birthDay: ', this.birthDay + ' @@END',
        '\n birthMonth: ', this.birthMonth + ' @@END',
        '\n birthYear: ', this.birthYear + ' @@END'
      )

      /*
      >>> start of validation:
      this validation must be deleted once real one is written,
      it just checks things and terminates registration if something's not right,
      it's here for development/testing purposes, it's for developers, so that they
      don't register users badly
      */
      if (!this.personalNumberOrUserName ||
          !this.password ||
          !this.confirmPassword ||
          !this.birthDay ||
          !this.birthMonth ||
          !this.birthYear
      ) {
        alert('VALIDATION: რომელიღაცა არ შეგიყვანია: personalNumberOrUserName, password, confirmPassword, birthDay, birthMonth, birthYear.')

        return
      }

      if (this.password !== this.confirmPassword) {
        alert('VALIDATION: პაროლი არასწორად გაიმერე.')

        return
      }

      if (!this.email && !this.contactNumber) {
        alert('VALIDATION: იმაილი და საკონტაქტო ნომერიდან ერთერთი მაინც უნდა შეიყვანო.')

        return
      }
      // <<< end of validation here

      const birthDate = new Date(this.birthYear, this.birthMonth, this.birthDay)

      if (utils.couldBePersonalNumber(this.personalNumberOrUserName)) {
        try {
          const arePerNumAndBirthDateValid = await dummyCRA.arePersonalNumberAndBirthDateValid(this.personalNumberOrUserName, birthDate, true)

          if (arePerNumAndBirthDateValid) {
            this.performRegister()
          } else {
            alert('პირადი ნომერი ან დაბადების თარიღი არასწორია') // todo eventually validation should be not alert
          }
        } catch (craError) {
          bus.$emit('error', craError)
        }
      } else {
        this.performRegister()
      }
    }
  },
  computed: {
    birthDayOptions() {
      const retVal = utils.getRangeNumberArray(1, MAX_DAYS_IN_MONTH)
              .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- დღე -' })

      return retVal
    },
    birthMonthOptions() {
      const retVal = MONTH_NAMES
              .map((next, index) => ({ value: index, text: next }))

      retVal.splice(0, 0, { value: null, text: '- თვე -' })

      return retVal
    },
    birthYearOptions() {
      const retVal = reverse(utils.getRangeNumberArray(EARLIEST_REALISTIC_BIRTH_YEAR, new Date().getFullYear()))
              .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- წელი -' })

      return retVal
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 35%;
  margin: auto;
  margin-top: 30px;
}
.hint-element {
  margin-top: 20px;
}
.password-col {
  padding-left: 0px;
  padding-right: 7px;
}
.confirm-password-col {
  padding-left: 7px;
  padding-right: 0px;
}
.birth-day-col {
  padding-left: 0px;
  padding-right: 2px;
}
.birth-month-col {
  padding-left: 2px;
  padding-right: 2px;
}
.birth-year-col {
  padding-left: 2px;
  padding-right: 0px;
}
</style>
