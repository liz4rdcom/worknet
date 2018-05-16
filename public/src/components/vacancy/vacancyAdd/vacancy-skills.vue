<template>
  <div class="vacancy-skills">
    <b-card title="უნარები">
      <subset-selector
        idPrefix="vacancy-skills"
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
    import subsetSelector from '../../common/subset-selector'
    import utils from '../../../utils'

    const searchUrl = '/api/skills/search'

    export default {
      name: 'profile-skills',
      props: ['skills', 'onChange'],
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

          let skillObject = { skillName: skill }

          this.skills.push(skillObject)

          this.$refs.skillInput.clear()

          this.onChange(this.skills)
        },
        async onRemoveSkill(skill) {
          let indexOfSkill = this.skills.findIndex(t => t.skillName === skill)
          if (indexOfSkill === -1) {
            console.error('can\'t find index of skill')
            return
          }

          this.skills.splice(indexOfSkill, 1)

          this.onChange(this.skills)
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
.card {
  background: whitesmoke;
}

.card-title {
  background-color: darkslategray;
  color: whitesmoke;
  border: solid darkslategray 10px;
  border-radius: 15px;
}
</style>
