<script>
import { markRaw } from 'vue'
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
    remote: {
      type: Boolean,
      default: false
    },
    sort: Boolean | String,
    options: Array | Object,
  },
  data () {
    return {
      loading: false,
      _options: [],
      list: []
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler () {
        const ops = formatOptions(this.options, this)
        if (!this.$slots.custom) {
          ops.forEach((op, index) => {
            op._main_ = calcMainLabel(this.options[index], this)
            op._remark_ = calcRemarkLabel(this.options[index], this)
          })
        }
        this._options = markRaw(ops)
        this.list = this._options
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
    handleRemote (e) {
      const keywords = e.target.value.trim()
      if (keywords === this._last_keywords_) return
      this._last_keywords_ = keywords
      if (this.$attrs.remoteMethod) this.$attrs.remoteMethod(keywords)
      else if (this.remoteSearch) this.remoteSearch(keywords)
    },
    filter (keywords) {
      keywords = keywords.trim()
      if (!keywords) {
        return this.list = markRaw(this._options)
      }
      const isCustom = !!this.$slots.custom
      this.list = markRaw(this._options.filter(op => {
        let text = op.text
        if (!isCustom) text += op._main_ + op._remark_
        return text.includes(keywords)
      }))
    },
    remoteSearch (query) {
      if (!this.remote && !this.modelName) {
        return this._options
      }
      remoteSearch(this.service.restful, query, this)
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
    :options="list"
    :props="{ label: 'text' }"
    :filterable
    :remote
    clearable
    :filter-method="remote ? undefined : ($attrs.filterMethod || filter)"
    @keyup.enter="handleRemote"
  >
    <template #default="{ item, index }">
      <slot
        v-if="$slots.custom"
        name="custom"
        :option="item"
        :raw="item.raw"
      />
      <span v-else>
        <span class="main">{{ item._main_ }}</span>
        <span class="remark">{{ item._remark_ }}</span>
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
