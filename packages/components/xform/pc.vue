<script>
import utils from './utils.js'

export default {
  name: 'PcXForm',
  inheritAttrs: false,
  props: {
    ...utils.props(),
    title: {
      type: String,
      default: '表单'
    },
    hideLabels: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: props => props.labelWidth || (props.dialog ? '100px' : '0px')
    },
    useCollapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:fref'],
  data () {
    return {
      activeNames: ['name']
    }
  },
  computed: {
    ...utils.computed
  },
  mounted () {
    const contanier = this.dialog ?? this.form
    contanier && (contanier.formRef = this.$refs.formRef)
    this.$emit('update:fref', this.$refs.formRef)
  },
  methods: {
    ...utils.methods
  }
}
</script>

<template>
  <el-collapse
    v-model="activeNames"
    :class="(useCollapse ? 'use' : 'no') + '-collapse'"
  >
    <el-collapse-item :name="activeNames[0]">
      <template #title>
        <slot v-if="$slots['collapse-title']" name="collapse-title" />
        <span v-else>{{ title }}</span>
      </template>
      <el-form
        ref="formRef"
        v-bind="$attrs"
        :model="_model"
        :rules="_rules"
        :label-width="labelWidth"
        :label-position="$attrs.labelPosition || 'right'"
        :class="['pc-x-form', { 'hide-labels': hideLabels }]"
      >
        <slot v-if="$slots.pre" name="pre" />

        <pc-x-form-item
          v-for="(item, index) in _items"
          v-bind="item"
          :key="index"
          v-model="_model[item.prop]"
          :label-width="labelWidth"
          :prop="item.prop || item.model"
          :clearable="item.clearable !== false"
          :placeholder="calcPlaceholder(item)"
          :style="calcStyle(item)"
          :show-tooltip="$attrs.showTooltip || false"
          @update:modelValue="item.onChange || null"
        >
          <slot v-if="item.slot" :name="item.slot" />
        </pc-x-form-item>

        <slot v-if="$slots.default" name="default" />
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
