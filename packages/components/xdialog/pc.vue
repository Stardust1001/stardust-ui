<script>
export default {
  name: 'PcXDialog',
  props: {
    platform: String,
    drawer: {
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
    draggable: {
      type: Boolean,
      default: true
    },
    onSubmit: Function,
    onCancel: Function
  },
  emits: [
    'update:modelValue',
    'submit',
    'cancel',
    'fullscreenchange'
  ],
  data () {
    return {
      fullscreen: this.$attrs.fullscreen || false
    }
  },
  computed: {
    visible: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    hasFooter () {
      return this.onSubmit || this.$parent.$attrs.onSubmit
        || this.onCancel || this.$parent.$attrs.onCancel
        || this.$slots.footer
    }
  },
  methods: {
    handleToggleFullscreen () {
      this.fullscreen = !this.fullscreen
      this.$emit('fullscreenchange', this.fullscreen)
    }
  }
}
</script>

<template>
  <component
    :is="drawer ? 'ElDrawer' : 'ElDialog'"
    :draggable
    v-bind="$attrs"
    v-model="visible"
    :fullscreen
    :size="$attrs.width"
    class="pc-x-dialog"
    :class="{ 'pc-x-drawer': drawer, 'no-footer': !hasFooter }"
  >
    <template #header>
      <slot v-if="$slots.header" name="header" />
      <span v-else class="el-dialog__title">{{ title }}</span>
      <x-icon
        v-if="!drawer"
        name="FullScreen"
        class="full el-dialog__headerbtn"
        style="right: 50px;"
        @click="handleToggleFullscreen"
      />
    </template>

    <slot v-if="$slots.default" name="default" />

    <template #footer>
      <slot v-if="$slots.footer" name="footer" />

      <el-button
        v-if="!!onSubmit || !!$parent.$attrs.onSubmit"
        type="primary"
        :disabled="$attrs['submit-disabled']"
        @click="$emit('submit')"
      >
        {{ submitText }}
      </el-button>
      <el-button
        v-if="!!onCancel || !!$parent.$attrs.onCancel"
        :disabled="$attrs['cancel-disabled']"
        @click="$emit('cancel')"
      >
        {{ cancelText }}
      </el-button>
    </template>
  </component>
</template>
