<template>
<div class="month-period">
  <b-container>
    <b-row no-gutters>
      <b-col cols="5">
        <label>თვე</label>
        <b-form-select :id="idWithPrefix(idPrefix, 'period-month')" :value="month" @change="onMonthInput" class="mb-3 month">
          <option v-for="monthOption in monthOptions">
            {{monthOption}}
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="7">
        <label>წელი</label>
        <b-form-select :id="idWithPrefix(idPrefix, 'period-year')" :value="year" @change="onYearInput" class="mb-3 year">
          <option v-for="yearOption in yearOptions">{{yearOption}}</option>
        </b-form-select>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import utils from '../../utils'

export default {
  name: 'month-period',
  props: {
    minYear: {
      type: Number,
      default: new Date().getFullYear() - 60
    },
    month: {
      type: Number
    },
    year: {
      type: Number
    },
    idPrefix: {
      type: String
    }
  },
  data: () => ({
    monthOptions: new Array(12).fill(0).map((item, index) => index + 1),
    yearOptions: [],
    idWithPrefix: utils.idWithPrefix
  }),
  created() {
    let currentYear = new Date().getFullYear()

    this.yearOptions = new Array(currentYear - this.minYear + 1).fill(0)
      .map((item, index) => currentYear - index)
  },
  methods: {
    onMonthInput(value) {
      this.$emit('month', Number(value))
    },
    onYearInput(value) {
      this.$emit('year', Number(value))
    }
  }
}
</script>

<style scoped>
.month {
  min-width: 3.75rem;
}

.year {
  min-width: 5rem;
}
</style>
