<script>
import { formatOptions } from '../../utils/index.js'
import { remoteSearch, calcMainLabel, calcRemarkLabel } from './util.js'

export default {
  name: 'PcXSelect',
  props: {
    modelName: String,
    params: Object,
    plain: {
      type: Boolean,
      default: false
    },
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
      if (!this.remote && !this.modelName) {
        return this._options
      }
      remoteSearch(this.service.restful, query, this)
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
    :class="plain ? 'x-select--plain' : ''"
    :loading
    v-bind="$attrs"
    :filterable
    clearable
    :remote-method="$attrs.remoteMethod || remoteSearch"
  >
    <el-option
      v-for="(option, index) in _options"
      v-bind="$attrs"
      :key="option.value"
      :label="option.text"
      :value="option.value"
    >
      <slot
        v-if="$slots.custom"
        name="custom"
        :option
        :text
        :value
      />
      <span v-else>
        <span class="main">{{ calcMainLabel(options[index]) }}</span>
        <span class="remark">{{ calcRemarkLabel(options[index]) }}</span>
      </span>
    </el-option>
  </el-select>
</template>

<style lang="scss" scoped>
.x-select--plain {
  width: 100px;
  :deep(.el-select__wrapper) {
    box-shadow: none;
    cursor: pointer;
  }
}
.remark {
  color: #a0aaaa;
  margin-left: 10px;
}
</style>
