<script>
export default {
  name: 'MobileXDialog',
  props: {
    actionsheet: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '详情'
    },
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
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
    },
    canCancel () {
      return !!this.$attrs.onCancel || !!this.$parent.$attrs.onCancel
    },
    canConfirm () {
      return !!this.$attrs.onSubmit || !!this.$parent.$attrs.onSubmit
    }
  },
  methods: {
    async handleCancel () {
      await this.$nextTick()
      this.visible = true
      await this.$nextTick()
      this.$emit('cancel')
    },
    async handleConfirm () {
      await this.$nextTick()
      this.visible = true
      await this.$nextTick()
      this.$emit('submit')
    }
  }
}
</script>

<template>
  <component
    :is="actionsheet ? 'van-action-sheet' : 'van-dialog'"
    width="92%"
    v-bind="$attrs"
    v-model:show="visible"
    class="mobile-x-dialog"
    :show-confirm-button="canConfirm"
    :show-cancel-button="canCancel"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template v-if="$slots.title || title" #title>
      <slot name="title" v-if="$slots.title" />
      <span v-else>{{ title }}</span>
    </template>

    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default" />
    </template>

    <template v-if="$slots.title || title" #description>
      <slot name="title" v-if="$slots.title" />
      <span v-else>{{ title }}</span>
    </template>

    <template v-if="canConfirm || canCancel" #cancel>
      <van-row>
        <van-col v-if="canCancel" :span="12">
          <van-button block @click.stop="handleCancel">{{ cancelText }}</van-button>
        </van-col>
        <van-col v-if="canConfirm" :span="12">
          <van-button block style="color: var(--van-blue);" @click.stop="handleConfirm">{{ submitText }}</van-button>
        </van-col>
      </van-row>
    </template>
  </component>
</template>
