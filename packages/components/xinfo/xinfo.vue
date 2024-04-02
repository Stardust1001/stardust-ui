<script>
import tableUtils from '../xtable/utils.js'

export default {
  name: 'XInfo',
  props: {
    data: Object,
    fields: Array,
    span: {
      type: Number,
      default: window.isMobile ? 24 : 8
    },
    showColon: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    labelSlot: {
      type: Boolean,
      default: false
    },
    align: String,
    labelAlign: String,
    valueAlign: String,
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
    },
    _labelAlign () {
      return this.labelAlign || this.align || 'left'
    },
    _valueAlign () {
      return this.valueAlign || this.align || 'left'
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
      <el-row :gutter="$attrs.gutter || 10">
        <el-col
          v-for="field in items"
          :key="field.prop"
          :span
          v-bind="field"
        >
          <div class="x-info__label">
            <slot v-if="$slots.label" name="label" :label="field.label" />
            <span v-else>{{ field.label }}{{ showColon ? '：' : '' }}</span>
          </div>
          <div class="x-info__value">
            <slot
              v-if="field.slot"
              :name="field.slot"
              v-bind="{ data, field, value: calcValue(data, field) }"
            />
            <router-link
              v-else-if="field.slot === '$link'"
              :to="field.to(data)"
            >
              {{ field.link ? field.link(data) : data[field.linkProp || field.prop] }}
            </router-link>
            <span v-else>{{ calcValue(data, field) }}</span>
          </div>
        </el-col>
      </el-row>
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
  .x-info__label {
    padding-left: 10px;
    color: #909999;
    display: inline-block;
    width: v-bind('labelWidth');
    vertical-align: top;
    text-align: v-bind('_labelAlign');
  }
  .x-info__value {
    padding-left: 10px;
    display: inline-block;
    width: calc(100% - v-bind('labelWidth'));
    color: #303333;
    text-align: v-bind('_valueAlign');
  }
}
</style>
