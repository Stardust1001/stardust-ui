<script>
import utils from '../../utils/index.js'
import { remoteSearch, calcMainLabel, calcRemarkLabel } from './util.js'

export default {
  name: 'PcXSelect',
  props: {
    modelName: String,
    params: Object,
    text: {
      type: String,
      default: 'text'
    },
    labelTexts: Array,
    value: {
      type: String,
      default: 'value'
    },
    filterable: {
      type: Boolean,
      default: true
    },
    sort: Boolean | String,
    options: Array | Object,

    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    platform: String
  },
  data () {
    return {
      loading: false,
      _options: []
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
      if (!this.remote && !this.modelName) {
        return this._options
      }
      remoteSearch(this.$api.restful, query, this)
    },
    calcMainLabel (option) {
      return calcMainLabel(option, this)
    },
    calcRemarkLabel (option) {
      return calcRemarkLabel(option, this)
    }
  }
}
</script>

<template>
  <el-select
    class="pc-x-select"
    :loading="loading"
    v-bind="$attrs"
    :filterable="filterable"
    clearable
    :remote-method="$attrs.remoteMethod || remoteSearch"
  >
    <el-option
      v-for="option in _options"
      v-bind="$attrs"
      :key="option[text]"
      :label="option[text]"
      :value="option[value]"
    >
      <slot v-if="$slots.default" />
      <span v-else>
        <span class="main">{{ calcMainLabel(option) }}</span>
        <span class="remark">{{ calcRemarkLabel(option) }}</span>
      </span>
    </el-option>
  </el-select>
</template>

<style lang="scss" scoped>
.remark {
  color: #a0aaaa;
  margin-left: 10px;
}
</style>
