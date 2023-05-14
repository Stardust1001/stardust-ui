<script>
export default {
  name: 'MobileXDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue',
    'submit',
    'cancel'
  ],
  computed: {
    visible: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <van-dialog
    width="92%"
    v-bind="$attrs"
    v-model:show="visible"
    class="mobile-x-dialog"
    :show-confirm-button="!!$attrs.onSubmit || !!$parent.$attrs.onSubmit"
    :show-cancel-button="!!$attrs.onCancel || !!$parent.$attrs.onCancel"
    @confirm="$emit('submit')"
    @cancel="$emit('cancel')"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>
  </van-dialog>
</template>
