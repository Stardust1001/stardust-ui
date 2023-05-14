<script>
import tableUtils from '../xtable/utils.js'

export default {
  name: 'XInfo',
  props: {
    data: Object,
    fields: Array,
    column: {
      type: Number,
      default: 24
    },
    border: {
      type: Boolean,
      default: true
    },
    span: {
      type: Number,
      default: window.isMobile ? 24 : 8
    },
    labelSlot: {
      type: Boolean,
      default: false
    },
    defaultValue: ''
  },
  computed: {
    blocks () {
      const blocks = {}
      this.fields.filter(f => f.prop).forEach(f => {
        const { infoAttrs = {}, ...others } = f
        const item = { span: this.span, ...others, ...infoAttrs }
        const name = item.block || '基本信息'
        let block = blocks[name]
        if (!block) {
          blocks[name] = block = []
          block.span = 0
        }
        if (block.span + item.span > 24 && block.length) {
          block[block.length - 1].span += 24 - block.span
        } else {
          block.span += item.span
        }
        block.push(item)
      })
      return blocks
    },
    hideHeader () {
      const keys = Object.keys(this.blocks)
      return keys.length === 1 && keys[0] === '基本信息'
    }
  },
  data () {
    return {
      activeNames: []
    }
  },
  created () {
    this.activeNames = Object.keys(this.blocks)
  },
  methods: {
    calcValue: tableUtils.methods.calcValue
  }
}
</script>

<template>
  <el-collapse
    v-model="activeNames"
    class="x-info"
    :class="{ 'hide-header': hideHeader }"
  >
    <el-collapse-item
      v-for="(items, k) in blocks"
      :key="k"
      :title="k"
      :name="k"
    >
      <el-descriptions :column="column" :border="border">
        <el-descriptions-item
          v-for="field in items"
          :key="field.prop"
          v-bind="field"
        >
          <template v-if="labelSlot" #label>
            <slot name="label" :label="field.label" />
          </template>
          <span v-if="field.slot">
            <slot
              :name="field.slot"
              v-bind="{ data, field, value: calcValue(data, field) }"
            />
          </span>
          <span v-else>
            {{ calcValue(data, field) }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" scoped>
.x-info {
  &.hide-header {
    :deep(.el-collapse-item__header) {
      display: none;
    }
  }
  :deep(.el-collapse-item__content) {
    padding-bottom: 10px;
  }
}
</style>
