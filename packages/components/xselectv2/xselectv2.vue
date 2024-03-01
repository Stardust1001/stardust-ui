<script>
import { formatOptions } from '../../utils/index.js'
import { remoteSearch, calcMainLabel, calcRemarkLabel } from '../xselect/util.js'

export default {
  name: 'XSelectV2',
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
  <el-select-v2
    class="pc-x-select-v2"
    :class="plain ? 'x-select-v2--plain' : ''"
    :loading
    v-bind="$attrs"
    :options="_options"
    :props="{ label: 'text' }"
    :filterable
    clearable
    :remote-method="$attrs.remoteMethod || remoteSearch"
  >
    <template #default="{ item, index }">
      <slot
        v-if="$slots.custom"
        name="custom"
        :option
        :raw="option.raw"
      />
      <span v-else>
        <span class="main">{{ calcMainLabel(options[index]) }}</span>
        <span class="remark">{{ calcRemarkLabel(options[index]) }}</span>
      </span>
    </template>
  </el-select-v2>
</template>

<style lang="scss" scoped>
.x-select-v2--plain {
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
