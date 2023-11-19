<script>
export default {
  name: 'MobileXScan',
  props: {
    modelValue: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleClick () {
      this.readonly && this.handleScan()
    },
    async handleScan () {
      const code = await StardustBrowser.funcs.scanCode()
      this.$emit('update:modelValue', code)
    }
  }
}
</script>

<template>
  <van-field 
    label="扫码"
    placeholder="点此扫码"
    right-icon="scan"
    v-bind="$attrs"
    :modelValue="modelValue"
    :readonly="readonly"
    @update:modelValue="v => $emit('update:modelValue', v)"
    @click.native="handleClick"
  />
</template>
