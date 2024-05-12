<script>
import { Confirm } from '../../utils/message.js'
import { baseForm } from '../../utils/model.js'
import { initForm } from '../../utils/modelUtils.js'

export default {
  name: 'XArray',
  props: {
    modelValue: Array | String | undefined,
    items: Array
  },
  emits: ['update:modelValue'],
  data () {
    return {
      groups: []
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      deep: true,
      handler: 'makeGroups'
    },
    items: {
      deep: true,
      handler: 'makeGroups'
    },
    groups: {
      deep: true,
      handler () {
        const value = this.groups.map(g => g.form)
        if (JSON.stringify(this.modelValue) !== JSON.stringify(value)) {
          this.$emit('update:modelValue', value)
        }
      }
    }
  },
  methods: {
    makeGroups () {
      let value = this.modelValue
      if (!Array.isArray(value) || !value.length) value = [{}]
      this.groups = value.map(v => {
        const form = this.makeForm()
        Object.assign(form.form, v)
        return form
      })
    },
    makeForm () {
      const form = baseForm()
      const span = Math.floor(24 / this.items.length)
      const fields = this.items.map(it => ({ span: it.span || span, ...it }))
      initForm(form, fields)
      return form
    },
    handleAdd () {
      this.groups.push(this.makeForm())
    },
    handleCopy (group, index) {
      this.groups.push(JSON.parse(JSON.stringify(group)))
    },
    async handleClear () {
      if (await Confirm.w({ message: '确定删除全部组吗？', title: '警告' })) this.groups = []
    }
  }
}
</script>

<template>
  <div class="x-array">
    <div class="group-operates">
      <x-button type="primary" class="add-item" @click="handleAdd">
        <x-icon name="Plus" class="icon" />添加一组
      </x-button>
      <x-button type="danger" class="clear-items" @click="handleClear">全部删除</x-button>
    </div>
    <div class="groups">
      <div v-for="(group, index) in groups" :key="index" class="group">
        <x-form :form="group" hide-labels :gutter="10" v-bind="$attrs" class="form" />
        <x-button type="success" icon="CopyDocument" @click="handleCopy(group, index)" class="button" />
        <x-button type="danger" icon="DeleteFilled" @click="groups.splice(index, 1)" class="button" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.x-array {
  .group-operates {
    margin-bottom: 10px;
  }
  .add-item {
    .icon {
      margin-right: 5px;
    }
  }
  .groups {
    max-height: 200px;
    overflow-y: auto;
  }
  .group {
    :deep(.el-collapse) {
      display: inline-block;
      width: calc(100% - 110px);
    }
    .button {
      display: inline-block;
      width: 45px;
      vertical-align: top;
      margin-left: 10px;
    }
  }
}
</style>
