<script>
export default {
  name: 'XPicker',
  props: {
    modelValue: Boolean | Number | String,
    placeholder: String,
    show: Boolean,
    columns: Array
  },
  emits: [
    'show',
    'confirm',
    'cancel',
    'update:modelValue'
  ],
  computed: {
    visible: {
      get () {
        return this.show
      },
      set (value) {
        this.$emit(value ? 'show' : 'cancel')
      }
    }
  },
  methods: {
    onConfirm (value) {
      this.$emit('confirm', value)
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<template>
  <span
    @click="$emit('show')"
    :class="`x-picker__${modelValue ? 'value' : 'placeholder'}`"
  >
    {{ modelValue || placeholder }}
  </span>
  <van-popup
    class="x-picker"
    round
    position="bottom"
    v-bind="$attrs"
    v-model:show="visible"
  >
    <van-picker
      v-bind="$attrs"
      :title="$attrs.title"
      :columns="columns"
      @cancel="$emit('cancel')"
      @confirm="onConfirm"
    />
  </van-popup>
</template>
