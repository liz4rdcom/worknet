<template>
  <div class="autocomplete"
    @keydown.enter='enter'
    @keydown.down='down'
    @keydown.up='up'>
    <slot name="input" :onInput="onInput" :inputValue="inputValue">
      <b-form-input type="text" autocomplete="off"
        :id="idWithPrefix(idPrefix, 'autocomplete-input')"
        :value="inputValue"
        @input="onInput">
      </b-form-input>
    </slot>
    <b-list-group v-if="openSuggestion" class="autocomplete-list">
      <b-list-group-item v-for="(item, index) in suggestions" :active="isActive(index)" @click="suggestionClick(index)" :key="item">
        <slot name="list-item" :item="item">
          {{ item }}
        </slot>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import utils from '../../utils'

export default {
  name: 'autocomplete',
  props: {
    list: {required: true},
    value: {},
    minimumChars: {
      type: Number,
      default: 2,
    },
    synchronous: {
      type: Boolean,
      default: false,
    },
    idPrefix: {
      type: String,
    },
  },
  data: () => ({
    open: false,
    current: 0,
    inputValue: '',
    idWithPrefix: utils.idWithPrefix,
  }),
  methods: {
    onInput(value) {
      if (value === this.inputValue) return

      this.inputValue = value

      this.$emit('input', this.inputValue)

      if (this.open === false) {
        this.open = true
        this.current = 0

        return
      }

      if (this.current > this.suggestions.length - 1) {
        this.current = 0
      }
    },
    up() {
      if (this.current > 0) {
        this.current--
      }
    },
    down() {
      if (this.current < this.suggestions.length - 1) {
        this.current++
      }
    },
    isActive(index) {
      return index === this.current
    },
    suggestionClick(index) {
      this.open = false

      this.inputValue = this.suggestions[index]

      this.$emit('input', this.inputValue)
    },
    enter() {
      if (!this.openSuggestion) {
        this.$emit('enter', this.inputValue)

        return
      }

      this.open = false

      this.inputValue = this.suggestions[this.current]

      this.$emit('input', this.inputValue)
    },
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
  },
  computed: {
    openSuggestion () {
      return this.inputValue.length >= this.minimumChars &&
        this.list.length !== 0 &&
        this.open === true
    },
    suggestions () {
      if (!this.synchronous) return this.list

      return this.list.filter(item => item.includes(this.inputValue))
    },
  },
}
</script>

<style scoped>
.autocomplete-list {
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  z-index: 10;
}
</style>
