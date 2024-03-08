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
  data () {
    return {
      _options: []
    }
  },
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
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler () {
        this._options = formatOptions(this.options, this)
      }
    }
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
      v-for="option in _options"
      v-bind="attrs"
      :disabled="option.disabled ?? attrs.disabled"
      :key="option.text"
      :value="option.value"
    >
      <slot
        v-if="$slots.custom"
        name="custom"
        :option
        :raw="option.raw"
      />
      <span v-else>{{ option.text }}</span>
    </component>
  </el-radio-group>
</template>

<style lang="scss" scoped>
.pc-x-radios--plain {
  :deep(.el-radio) {
    margin-right: 20px;
    font-weight: normal;
    .el-radio__input {
      display: none;
    }
  }
}
</style>
