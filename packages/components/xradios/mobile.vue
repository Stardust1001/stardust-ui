<script>
import utils from '../../utils/index.js'

export default {
  name: 'MobileXRadios',
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
    direction: {
      type: String,
      default: 'horizontal'
    },
    sort: Boolean | String,
    options: Array | Object
  },
  methods: {
    formatOptions: utils.formatOptions
  }
}
</script>

<template>
  <van-radio-group
    class="mobile-x-radios"
    v-bind="$attrs"
    :direction="direction"
  >
    <van-radio
      v-for="option in formatOptions(options, this)"
      v-bind="$attrs"
      :key="option[text]"
      :name="option[value]"
    >
      {{ option[text] }}
    </van-radio>
  </van-radio-group>
</template>
