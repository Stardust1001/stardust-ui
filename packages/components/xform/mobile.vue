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
    :class="['mobile-x-form', { 'hide-labels': hideLabels }]"
  >
    <slot v-if="$slots.pre" name="pre" />

    <van-row :gutter="$attrs.gutter" :justify="$attrs.justify" :align="$attrs.align" :tag="$attrs.tag" :wrap="$attrs.wrap">
      <van-col
        v-for="(item, index) in _visibleItems"
        :key="index"
        :span="item.span" :offset="item.offset" :tag="item.tag"
      >
        <mobile-x-form-item
          v-bind="item"
          :rules="_rules[item.prop] || item.rules"
          :modelValue="formatModelValue(_model[item.prop])"
          @update:modelValue="value => _model[item.prop] = value"
          :placeholder="calcPlaceholder(item)"
        >
          <slot v-if="item.slot" :name="item.slot" v-bind="item" />
        </mobile-x-form-item>
      </van-col>
    </van-row>

    <slot v-if="$slots.default" name="default" />
  </van-form>
</template>
