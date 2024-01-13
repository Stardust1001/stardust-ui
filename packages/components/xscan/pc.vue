<script>
export default {
  name: 'PcXScan',
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
  <el-input
    v-bind="$attrs"
    :modelValue
    :readonly
    @update:modelValue="v => $emit('update:modelValue', v)"
    @click.native="handleClick"
  >
    <template #append>
      <el-button icon="CameraFilled" @click="handleScan" />
    </template>
  </el-input>
</template>