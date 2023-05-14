<script>
import utils from '../../utils/index.js'

export default {
  name: 'MobileXCheckboxs',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: 'value'
    },
    shape: {
      type: String,
      default: 'square'
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    sort: Boolean | String,
    options: Array | Object
  },
  computed: {
    attrs () {
      const {
        clearable,
        platform,
        placeholder,
        rules,
        required,
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
  <van-checkbox-group
    class="mobile-x-checkboxs"
    v-bind="attrs"
    :direction="direction"
  >
    <van-checkbox
      v-for="option in formatOptions(options, this)"
      v-bind="attrs"
      :key="option[text]"
      :shape="shape"
      :name="option[value]"
    >
      {{ option[text] }}
    </van-checkbox>
  </van-checkbox-group>
</template>
