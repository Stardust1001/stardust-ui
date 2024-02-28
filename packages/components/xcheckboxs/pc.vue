<script>
import { formatOptions } from '../../utils/index.js'

export default {
  name: 'PcXCheckboxs',
  inheritAttrs: false,
  props: {
    modelValue: Array,
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
    sort: Boolean | String,
    options: Array | Object
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
  <el-checkbox-group
    class="pc-x-checkboxs"
    :class="plain ? 'pc-x-checkboxs--plain' : ''"
    v-bind="attrs"
    :modelValue
    @update:modelValue="value => $emit('update:modelValue', value)"
    @change="$emit('change', $event)"
  >
    <el-checkbox
      v-for="option in formatOptions(options, this)"
      v-bind="attrs"
      :key="option[text]"
      :label="option[value]"
    >
      <slot
        v-if="$slots.custom"
        name="custom"
        :option
        :text
        :value
      />
      <span v-else>{{ option[text] }}</span>
    </el-checkbox>
  </el-checkbox-group>
</template>

<style lang="scss" scoped>
.pc-x-checkboxs--plain {
  :deep(.el-checkbox) {
    margin-right: 20px;
    font-weight: normal;
    .el-checkbox__input {
      display: none;
    }
  }
}
</style>
