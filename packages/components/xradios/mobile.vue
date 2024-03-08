<script>
import { formatOptions } from '../../utils/index.js'

export default {
  name: 'MobileXRadios',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: 'text'
    },
    plain: {
      type: Boolean,
      default: false
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
  data () {
    return {
      _options: []
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
  <van-radio-group
    class="mobile-x-radios"
    :class="plain ? 'mobile-x-radios--plain' : ''"
    v-bind="$attrs"
    :direction
  >
    <van-radio
      v-for="option in _options"
      v-bind="$attrs"
      :disabled="option.raw?.disabled"
      :key="option.text"
      :name="option.value"
    >
      {{ option.text }}
    </van-radio>
  </van-radio-group>
</template>

<style lang="scss" scoped>
.mobile-x-radios--plain {
  :deep(.van-radio) {
    margin-right: 20px;
    .van-radio__icon {
      display: none;
    }
    .van-radio__icon--checked ~ .van-radio__label {
      color: var(--van-blue);
    }
  }
}
</style>
