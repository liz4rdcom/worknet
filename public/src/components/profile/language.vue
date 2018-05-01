<template>
  <b-card class="mb-2">
    <div class="language-body">
      <h4>{{language.languageName}}</h4>
      <span v-if="!isEditMode">
        <label><b>ცოდნის დონე</b> &nbsp;  {{language.languageLevel}}</label>
        <b-button @click="isEditMode = true">
          <i class="fa fa-edit"></i>
        </b-button>
      </span>
      <span v-if="isEditMode">
        <b-form-textarea
          :id="idWithPrefix(idPrefix, 'level')"
          v-model="level"
          placeholder="რა დონეზე ფლობთ?"
          class="mb-1"
          :rows="1"
          :max-rows="2">
        </b-form-textarea>
        <b-button @click="saveLevelEdit()"><i class="fa fa-check"></i></b-button>
        <b-button @click="cancelLevelEdit()"><i class="fa fa-times"></i></b-button>
      </span>

      <b-button class="" @click="deleteClick()">
        წაშლა
      </b-button>
    </div>
  </b-card>
</template>

<script>
import utils from '../../utils'
import { bus } from '../common/bus'

const baseUrl = '/api/users/profile/languages'

export default {
  name: 'language',
  props: ['language', 'idPrefix'],
  data: () => ({
    isEditMode: false,
    level: '',
    idWithPrefix: utils.idWithPrefix
  }),
  created() {
    this.level = this.language.languageLevel
  },
  methods: {
    async saveLevelEdit() {
      try {
        let url = baseUrl + `/${this.language.languageName}/level`

        await this.$http.put(url, {languageLevel: this.level}, {headers: utils.getHeaders()})

        this.$emit('levelChange', this.level)

        this.isEditMode = false
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    cancelLevelEdit() {
      this.level = this.language.languageLevel

      this.isEditMode = false
    },
    deleteClick() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
.language-body {
  width: 50%;
  margin: auto;
}
</style>
