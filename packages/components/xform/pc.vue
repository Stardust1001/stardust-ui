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
    },
    useWhen: {
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
        :label-position="$attrs['label-position'] || 'right'"
        :class="['pc-x-form', { 'hide-labels': hideLabels, viewonly: _viewonly }]"
      >
        <slot v-if="$slots.pre" name="pre" />

        <el-row :gutter="$attrs.gutter" :justify="$attrs.justify" :align="$attrs.align" :tag="$attrs.tag">
          <el-col
            v-for="(item, index) in _visibleItems"
            :key="item.prop"
            :span="item.span" :offset="item.offset" :tag="item.tag"
            :xs="item.xs" :sm="item.sm" :md="item.md" :lg="item.lg" :xl="item.xl"
          >
            <pc-x-form-item
              :label-width="labelWidth"
              :show-tooltip="$attrs.showTooltip || false"
              :viewonly="_viewonly"
              v-bind="item"
              v-model="_model[item.prop]"
              :prop="item.prop || item.model"
              :clearable="item.clearable !== false"
              :placeholder="calcPlaceholder(item)"
              @update:modelValue="item.onChange || null"
            >
              <slot v-if="item.slot" :name="item.slot" :item="item" :index="index" />
            </pc-x-form-item>
          </el-col>
        </el-row>

        <slot v-if="$slots.default" name="default" />
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
