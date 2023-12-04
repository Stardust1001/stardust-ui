<script>
export default {
  name: 'Settings',
  props: {
    visible: Boolean,
    modelValue: Object
  },
  emits: ['update:modelValue', 'reset'],
  data () {
    return {
      activeName: 'columns',
      columns: []
    }
  },
  watch: {
    modelValue: {
      handler (value) {
        this.columns = value.columns.map(col => {
          return {
            ...col,
            show: col.show !== false,
            width: col.width || col.minWidth
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.initDraggable()
  },
  methods: {
    initDraggable () {
      const dict = {}
      this.columns.forEach(col => dict[col.prop] = col)

      this.sortable = new window.Sortable(this.$refs.colsTable, {
        sort: true,
        draggable: '.row',
        onEnd: (e) => {
          const props = [...e.to.querySelectorAll('.row')].map(e => e.dataset.prop)
          this.columns = props.map(p => dict[p])
          this.update()
        }
      })
    },
    handleResetColumns () {
      const { columns, ...others } = this.modelValue
      this.$emit('reset', others)
    },
    handleToggle (column) {
      column.show = !column.show
      this.update()
    },
    update () {
      this.columns.forEach(col => {
        col.hide = !col.show
      })
      this.$emit('update:modelValue', {
        ...this.modelValue,
        columns: this.columns.map(col => {
          const { prop, label, show, hide, width } = col
          return { prop, label, show, hide, width }
        })
      })
    }
  }
}
</script>

<template>
  <el-popover
    v-if="visible"
    placement="bottom"
    trigger="click"
    popper-class="table-settings"
    v-bind="$attrs"
  >
    <template #reference>
      <el-button class="settings-reference" icon="Setting" />
    </template>

    <el-tabs v-model="activeName">
      <el-tab-pane name="columns" label="展示列">
        <el-button type="warning" plain icon="Close" @click="handleResetColumns">重置</el-button>
        <div class="table" ref="colsTable">
          <div
            v-for="column in columns"
            :key="column.prop"
            :data-prop="column.prop"
            class="row flex-center"
          >
            <el-icon><Sort /></el-icon>
            <ElCheckbox v-model="column.show" @change="update" />
            <span class="label overflow-text" :title="column.label" @click="handleToggle(column)">
              {{ column.label }}
            </span>
            <el-input-number v-model="column.width" @change="update" />
            <span class="unit">px</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<style lang="scss" scoped>
.table-settings {
  .el-tabs {
    :deep(.el-tabs__content) {
      max-height: 60vh !important;
      overflow-y: auto;
    }
  }
  .el-checkbox {
    margin: 0 5px;
  }
  .table {
    margin-top: 10px;
    border-top: 1px solid #d0dddd;
  }
  .row {
    justify-content: space-between;
    border: 1px solid #d0dddd;
    padding: 5px 10px;
    border-top: 0;
  }
  .label {
    display: inline-block;
    width: calc(100% - 200px);
    cursor: pointer;
  }
  .el-input-number {
    width: 130px;
  }
}
.settings-reference {
  padding: 0 10px;
  font-size: 18px;
}
</style>
