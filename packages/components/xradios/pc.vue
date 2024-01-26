<script>
import { formatOptions } from '../../utils/index.js'

export default {
  name: 'PcXRadios',
  inheritAttrs: false,
  props: {
    modelValue: Number | String,
    plain: {
      type: Boolean,
      default: false
    },
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
  emits: ['update:modelValue', 'change'],
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
    formatOptions
  }
}
</script>

<template>
  <el-radio-group
    class="pc-x-radios"
    :class="plain ? 'pc-x-radios--plain' : ''"
    v-bind="attrs"
    :modelValue
    @update:modelValue="value => $emit('update:modelValue', value)"
    @change="$emit('change', $event)"
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

<style lang="scss" scoped>
.pc-x-radio--plain {
  :deep(.el-radio) {
    margin-right: 20px;
    font-weight: normal;
    .el-radio__input {
      display: none;
    }
  }
}
</style>
