<script>
const modes = ['selection', 'radio']

export default {
  name: 'XTableViewer',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '数据表查看器'
    },
    useTableV2: {
      type: Boolean,
      default: false
    },
    visible: Boolean,
    selectMode: String,
    model: Object,
    controller: Object,
    dialogAttrs: Object,
    tableAttrs: Object
  },
  emits: [
    'update:visible',
    'select'
  ],
  computed: {
    table () {
      return this.model.table
    },
    dialog () {
      return this.model.dialog
    },
    _tableAttrs () {
      return {
        'max-height': '50vh',
        'hide-operates': true,
        'hide-settings': true,
        ...this.tableAttrs
      }
    },
    _dialogAttrs () {
      return {
        width: this.$attrs.width || (window.isMobile ? '92%' : '60%'),
        'submit-text': '确定',
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        ...this.dialogAttrs
      }
    }
  },
  created () {
    this.init()
    this.controller.handleSearch()
  },
  methods: {
    init () {
      const { table, selectMode } = this
      if (modes.includes(selectMode)) {
        if (!table.columns.find(col => col.type === '_index')) {
          table.columns.unshift({ type: '_index' })
        }
        if (!table.columns.find(col => col.type === selectMode)) {
          table.columns.unshift({
            prop: '_index',
            type: selectMode,
            fixed: 'left',
            width: 55,
            label: selectMode === 'selection' ? '' : '单选'
          })
        }
      }
      table.columns = table.columns.filter(col => this.selectMode === col.type || !modes.includes(col.type))
    },
    handleSubmit () {
      const { table, selectMode } = this
      if (modes.includes(selectMode)) {
        let selected = null
        if (selectMode === 'selection') {
          selected = table.selection
        } else if (selectMode === 'radio') {
          selected = table.checked
        }
        if (selectMode === 'selection' && !selected.length || !selected) {
          this.$message({ type: 'warning', message: '未选择数据' })
          this.handleCancel()
          return
        }
        this.$emit('select', selected)
        this.clearSelected()
      }
      this.handleCancel()
    },
    handleCancel () {
      this.$emit('update:visible', false)
    },
    handleBeforeClose (action) {
      if (action === 'cancel') {
        return true
      }
      return new Promise(resolve => {
        const close = () => {
          this.handleCancel()
          resolve(true)
        }
        if (this._dialogAttrs['before-close']) {
          this._dialogAttrs['before-close'](close)
        } else {
          close()
        }
      })
    },
    clearSelected () {
      this.table.selection = []
      this.table.checked = null
      this.table.tableRef.clearSelection()
      const radios = this.table.tableRef.$el.querySelectorAll('input[type="radio"]')
      radios.forEach(radio => radio.checked = false)
    }
  }
}
</script>

<template>
  <div class="x-table-viewer">
    <x-dialog
      v-bind="_dialogAttrs"
      :modelValue="visible"
      @update:modelValue="value => $emit('update:visible', value)"
      :title="title"
      :before-close="handleBeforeClose"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <component
        :is="useTableV2 ? 'x-table-v2' : 'x-table'"
        v-model:tref="table.tableRef"
        :table="table"
        v-bind="_tableAttrs"
        @search="controller.handleSearch"
      />
    </x-dialog>
  </div>
</template>

<style lang="scss" scoped>
.x-table-viewer {
  :deep(.el-dialog__body) {
    max-height: 75vh;
  }
}
</style>
