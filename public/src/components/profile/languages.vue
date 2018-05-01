<template>
  <div>
    <b-card title="ენების ცოდნა">
      <div class="mb-4">
        <div style="position:relative">
          <autocomplete synchronous :value="newLanguage" :list="languagesSelect" @input="onAutocompleteInput" @enter="addLanguage(newLanguage)">
            <div slot="input" slot-scope="{onInput, inputValue}">
              <b-input-group>
                <b-form-input type="text"
                  autocomplete="off"
                  id="languages-autocomplete-input"
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

      <language
        :language="language"
        @levelChange="onLevelChange(language, $event)"
        @delete="removeLanguage(language.languageName)"
        v-for="language in languages"
        :key="language.languageName"
        :idPrefix="'profile-language-' + language.languageName">
      </language>
    </b-card>
  </div>
</template>

<script>
import autocomplete from '../common/autocomplete'
import utils from '../../utils'
import { bus } from '../common/bus'
import language from './language'
import libs from '../../libs'

const baseUrl = '/api/users/profile/languages'

export default {
  name: 'languages',
  data: () => ({
    languages: [],
    languagesSelect: [],
    newLanguage: '',
  }),
  async created() {
    let languagesRes = await this.$http.get(baseUrl, {headers: utils.getHeaders()})

    this.languages = languagesRes.data

    this.languagesSelect = await libs.fetchLanguages()
  },
  methods: {
    async addLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index > -1) return

      let language = {
        languageName: languageName,
        languageLevel: '',
      }

      try {
        await this.$http.post(baseUrl, language, {headers: utils.getHeaders()})

        this.languages.push(language)

        this.newLanguage = ''
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async removeLanguage(languageName) {
      let index = this.languages.findIndex(item => item.languageName === languageName)

      if (index === -1) {
        console.error('can\'t find index of language')
        return
      }

      let url = baseUrl + '/' + languageName

      try {
        await this.$http.delete(url, {headers: utils.getHeaders()})

        this.languages.splice(index, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    onAutocompleteInput(value) {
      this.newLanguage = value
    },
    onLevelChange(language, level) {
      language.languageLevel = level
    },
  },
  components: {
    autocomplete,
    language,
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
