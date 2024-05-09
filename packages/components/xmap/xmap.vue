<script>
import { baseForm } from '../../utils/model.js'
import { initForm } from '../../utils/modelUtils.js'

export default {
  name: 'XMap',
  props: {
    modelValue: Object | String | undefined,
    items: Array
  },
  emits: ['update:modelValue'],
  data () {
    return {
      form: baseForm()
    }
  },
  watch: {
    items: {
      immediate: true,
      deep: true,
      handler () {
        this.form = this.makeForm()
      }
    },
    'form.form': {
      deep: true,
      handler () {
        this.$emit('update:modelValue', this.form.form)
      }
    }
  },
  methods: {
    makeForm () {
      const form = baseForm()
      const span = Math.floor(24 / this.items.length)
      const fields = this.items.map(it => ({ span: it.span || span, ...it }))
      initForm(form, fields)
      return form
    }
  }
}
</script>

<template>
  <div class="x-map">
    <x-form :form hide-labels :gutter="10" v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.x-map {

}
</style>
