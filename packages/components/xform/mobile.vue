<script>
import utils from './utils.js'

export default {
  name: 'MobileXForm',
  inheritAttrs: false,
  props: {
    ...utils.props()
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
    class="mobile-x-form"
  >
    <slot v-if="$slots.pre" name="pre" />

    <van-cell-group v-bind="$attrs">
      <mobile-x-form-item
        v-for="(item, index) in _items"
        v-bind="item"
        :rules="_rules[item.prop] || item.rules"
        :key="index"
        :modelValue="formatModelValue(_model[item.prop])"
        @update:modelValue="value => _model[item.prop] = value"
        :placeholder="calcPlaceholder(item)"
      >
        <slot v-if="item.slot" :name="item.slot" v-bind="item" />
      </mobile-x-form-item>
    </van-cell-group>

    <slot v-if="$slots.default" name="default" />
  </van-form>
</template>
