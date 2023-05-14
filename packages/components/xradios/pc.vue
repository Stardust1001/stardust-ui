<script>
import utils from '../../utils/index.js'

export default {
  name: 'PcXRadios',
  inheritAttrs: false,
  props: {
    modelValue: Number | String,
    text: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: 'value'
    },
    button: {
      type: Boolean,
      default: false
    },
    sort: Boolean | String,
    options: Array | Object,
  },
  emits: ['update:modelValue'],
  computed: {
    attrs () {
      const {
        clearable,
        platform,
        placeholder,
        ...others
      } = this.$attrs
      return others
    }
  },
  methods: {
    formatOptions: utils.formatOptions
  }
}
</script>

<template>
  <el-radio-group
    class="pc-x-radios"
    v-bind="attrs"
    :modelValue="modelValue"
    @update:modelValue="value => $emit('update:modelValue', value)"
  >
    <component
      :is="button ? 'el-radio-button' : 'el-radio'"
      v-for="option in formatOptions(options, this)"
      v-bind="attrs"
      :key="option[text]"
      :label="option[value]"
    >
      {{ option[text] }}
    </component>
  </el-radio-group>
</template>
