<script>
import { formatOptions } from '../../utils/index.js'
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
      let value = this.modelValue
      if (value === 'true' || value === 'false') {
        value = value === 'true'
      }
      return this._options.find(op => op.value === value)?.text ?? ''
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler () {
        this._options = formatOptions(this.options, this)
      }
    }
  },
  created () {
    if (this.modelName) {
      this.remoteSearch()
    }
  },
  methods: {
    formatOptions,
    remoteSearch (query) {
      if (!this.modelName) {
        return this._options
      }
      remoteSearch(this.service.restful, query, this)
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
    <x-picker
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
