<script>
export default {
  name: 'MobileXScan',
  props: {
    modelValue: String,
    _label: {
      type: String,
      default: '扫码'
    },
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
    placeholder="点此扫码"
    v-bind="$attrs"
    :label="_label"
    :modelValue
    :readonly
    style="padding: 0;"
    @update:modelValue="v => $emit('update:modelValue', v)"
    @click.native="handleClick"
  >
    <template #right-icon>
      <van-icon name="scan" @click.native="handleScan" />
    </template>
  </van-field>
</template>
