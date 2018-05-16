<template>
<div class="profile-skills">
  <b-card title="უნარები">
    <subset-selector
      idPrefix="profile-skills"
      ref="skillInput"
      placeholder="მაგ. ანალიტიკოსი"
      :editable="true"
      :list="skillList"
      :getAutocompleteData="searchSkills"
      @onAddNewElement="onAddNewSkill"
      @onRemoveElement="onRemoveSkill"
    />
  </b-card>
</div>
</template>

<script>
import subsetSelector from '../common/subset-selector'
import { bus } from '../common/bus'
import utils from '../../utils'

const baseUrl = '/api/users/profile/skills'
const searchUrl = '/api/skills/search'

export default {
  name: 'profile-skills',
  data: () => ({
    skills: [],
  }),
  async created() {
    try {
      let response = await this.$http.get(baseUrl, {headers: utils.getHeaders()})

      this.skills = response.data
    } catch (error) {
      bus.$emit('error', error)
    }
  },
  methods: {
    async searchSkills(skill) {
      return await this.$http.get(searchUrl, {params: {query: skill}, headers: utils.getHeaders()})
    },

    async onAddNewSkill(skill) {
      let indexOfSkill = this.skills.findIndex(t => t.skillName.toLowerCase() === skill.toLowerCase())
      if (indexOfSkill !== -1) {
        console.error('this skill already exists')
        return
      }

      let skillObject = {
        skillName: skill,
      }

      try {
        await this.$http.post(baseUrl, skillObject, {
          headers: utils.getHeaders(),
        })

        this.skills.push(skillObject)
        this.$refs.skillInput.clear()
      } catch (error) {
        bus.$emit('error', error)
      }
    },
    async onRemoveSkill(skill) {
      let indexOfSkill = this.skills.findIndex(t => t.skillName === skill)
      if (indexOfSkill === -1) {
        console.error('can\'t find index of skill')
        return
      }

      try {
        const url = baseUrl + `/${skill}`

        await this.$http.delete(url, {
          headers: utils.getHeaders(),
        })

        this.skills.splice(indexOfSkill, 1)
      } catch (error) {
        bus.$emit('error', error)
      }
    },
  },
  computed: {
    skillList() {
      return this.skills.map(item => item.skillName)
    },
  },
  components: {
    'subset-selector': subsetSelector,
  },
}
</script>

<style scoped>
</style>
