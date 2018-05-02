<template>
  <div>
    <div class="subset-selector">
      <div style="position:relative">
        <autocomplete :value="newElement" :list="autocompleteElements" @input="onAutocompleteInput" @enter="addElement(newElement)">
          <div slot="input" slot-scope="{onInput, inputValue}">
            <b-input-group v-if="editable">
              <b-form-input type="text"
                autocomplete="off"
                :id="idWithPrefix(idPrefix, 'selector-autocomplete-input')"
                :placeholder="placeholder"
                :value="inputValue"
                @input="onInput">
              </b-form-input>
              <b-input-group-button slot="right">
                <b-btn @click="addElement(newElement)">დამატება</b-btn>
              </b-input-group-button>
            </b-input-group>
          </div>
        </autocomplete>
      </div>
      <div class="chip" v-for="item in list">
        {{item}}
        <span v-if="editable" class="closebtn" @click="removeElement(item)">&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import autocomplete from './autocomplete'
  import utils from '../../utils'

  const minimumChars = 2

  export default {
    name: 'subset-selector',
    props: ['list', 'editable', 'placeholder', 'getAutocompleteData', 'idPrefix'],
    data() {
      return {
        newElement: '',
        autocompleteElements: [],
        idWithPrefix: utils.idWithPrefix,
      }
    },
    methods: {
      addElement() {
        if (!this.newElement) return

        this.$emit('onAddNewElement', this.newElement)
      },
      removeElement(element) {
        this.$emit('onRemoveElement', element)
      },
      clear() {
        this.newElement = ''
      },
      async onAutocompleteInput(value) {
        if (this.newElement === value) return

        this.newElement = value

        if (value.length < minimumChars) return

        let {data} = await this.getAutocompleteData(value)

        this.autocompleteElements = data || []
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
</style>
