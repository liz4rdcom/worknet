<template>
  <div>
    <b-card title="ენების ცოდნა">
      <div class="mb-4">
        <div style="position:relative">
          <autocomplete synchronous :value="newLanguage" :list="languagesSelect" @input="onAutocompleteInput" @enter="addLanguage(newLanguage)">
            <div slot="input" slot-scope="{onInput, inputValue}">
              <b-input-group>
                <b-form-input type="text"
                  id="vacancy-languages-autocomplete"
                  autocomplete="off"
                  :value="inputValue"
                  @input="onInput">
                </b-form-input>
                <b-input-group-button slot="right">
                  <b-btn @click="addLanguage(newLanguage)">დამატება</b-btn>
                </b-input-group-button>
              </b-input-group>
            </div>
          </autocomplete>
        </div>
      </div>

      <div class="chip" v-for="language in languages">
        {{language.languageName}}
      <span class="closebtn" @click="removeLanguage(language.languageName)">&times;</span>
        </div>
    </b-card>
  </div>
</template>

<script>
import autocomplete from '../../common/autocomplete'
import libs from '../../../libs'

export default {
  name: 'languages',
  props: ['languages', 'onChange'],
  data: () => ({
    languagesSelect: [],
    newLanguage: '',
  }),
  async created() {
    this.languagesSelect = await libs.fetchLanguages()
  },
  methods: {
    async addLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index > -1) return

      let language = {
        languageName: languageName,
      }

      this.languages.push(language)

      this.newLanguage = ''

      this.onChange(this.languages)
    },
    async removeLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index === -1) {
        console.error('can\'t find index of language')
        return
      }

      this.languages.splice(index, 1)

      this.onChange(this.languages)
    },
    onAutocompleteInput(value) {
      this.newLanguage = value
    },
  },
  components: {
    autocomplete,
  },

}
</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: gold;
  margin: 5px;
}

.closebtn {
  padding-left: 10px;
  color: #888;
  font-weight: bold;
  float: right;
  font-size: 20px;
  cursor: pointer;
}

.closebtn:hover {
  color: #000;
}

p {
  text-align: left;
}

.right-float {
  float: right
}

.right-clear {
  clear: right;
}

.card {
  background: whitesmoke;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}

.list-group-item {
  border-bottom: solid darkseagreen;
}

.period-present-text {
  padding-top: 1.375rem;
  margin-top: 3rem;
}
</style>
