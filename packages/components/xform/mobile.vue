<script>
import utils from './utils.js'

export default {
  name: 'MobileXForm',
  inheritAttrs: false,
  props: {
    ...utils.props(),
    hideLabels: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: props => props.labelWidth || '80px'
    },
    useWhen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:fref'],
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
  <van-form
    ref="formRef"
    :class="['mobile-x-form', { 'hide-labels': hideLabels, viewonly: _viewonly }]"
  >
    <slot v-if="$slots.pre" name="pre" />

    <el-row :gutter="$attrs.gutter" :justify="$attrs.justify" :align="$attrs.align" :tag="$attrs.tag">
      <el-col
        v-for="(item, index) in _visibleItems"
        :key="item.prop"
        :span="item.span" :offset="item.offset" :tag="item.tag"
        :xs="item.xs" :sm="item.sm" :md="item.md" :lg="item.lg" :xl="item.xl"
      >
        <mobile-x-form-item
          :label-width="labelWidth"
          :label-position="$attrs['label-position'] || 'left'"
          :viewonly="_viewonly"
          v-bind="item"
          :rules="_rules[item.prop] || item.rules"
          :modelValue="formatModelValue(_model[item.prop])"
          @update:modelValue="value => _model[item.prop] = value"
          :placeholder="calcPlaceholder(item)"
        >
          <slot v-if="item.slot" :name="item.slot" v-bind="item" />
        </mobile-x-form-item>
      </el-col>
    </el-row>

    <slot v-if="$slots.default" name="default" />
  </van-form>
</template>
