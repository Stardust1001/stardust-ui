<script>
import utils from '../../utils/index.js'
import { remoteSearch } from './util.js'

export default {
  name: 'MobileXSelect',
  inheritAttrs: false,
  props: {
    modelValue: Boolean | Number | String | Array,
    modelName: String,
    params: Object,
    text: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: 'value'
    },
    sort: Boolean | String,
    options: Array | Object
  },
  emits: ['update:modelValue'],
  data () {
    return {
      visible: false,
      _options: []
    }
  },
  computed: {
    formattedModelValue () {
      if (this.modelValue === 'true' || this.modelValue === 'false') {
        const value = this.modelValue === 'true'
        return this._options.find(op => op[this.value] === value)[this.text]
      }
      return this.modelValue
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler () {
        this._options = utils.formatOptions(this.options, this)
      }
    }
  },
  created () {
    if (this.modelName) {
      this.remoteSearch()
    }
  },
  methods: {
    formatOptions: utils.formatOptions,
    remoteSearch (query) {
      if (!this.modelName) {
        return this._options
      }
      remoteSearch(this.$api.restful, query, this)
    },
    onClick (e) {
      if (!e.target.classList.contains('van-overlay')) {
        this.visible = true
      }
    }
  }
}
</script>

<template>
  <div
    @click.native="onClick"
    class="mobile-x-select"
  >
    <XPicker
      v-bind="$attrs"
      :modelValue="formattedModelValue"
      @update:modelValue="e => $emit('update:modelValue', e.selectedValues[0])"
      :show="visible"
      :columns="_options"
      @click.stop
      @show="visible = true"
      @cancel="visible = false"
      @confirm="visible = false"
    />
  </div>
</template>
