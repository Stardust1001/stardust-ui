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
    },
    value () {
      return [this.modelValue]
    },
    text () {
      return this.columns.find(c => c.value === this.modelValue)?.text ?? this.placeholder
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
    {{ text }}
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
      :modelValue="value"
      :title="$attrs.title"
      :columns
      @cancel="$emit('cancel')"
      @confirm="onConfirm"
    />
  </van-popup>
</template>
