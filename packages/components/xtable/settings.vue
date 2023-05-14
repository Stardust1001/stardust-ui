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
  methods: {
    handleResetColumns () {
      const { columns, ...others } = this.modelValue
      this.$emit('reset', others)
    },
    handleMove (column, index, step) {
      const newIndex = index + step
      this.columns.splice(index, 1)
      this.columns.splice(newIndex, 0, column)
      this.update()
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
    trigger="hover"
    popper-class="table-settings"
    v-bind="$attrs"
  >
    <template #reference>
      <el-button class="settings-reference" icon="Setting" />
    </template>

    <el-tabs v-model="activeName">
      <el-tab-pane name="columns" label="展示列">
        <el-button type="warning" icon="Close" @click="handleResetColumns">重置</el-button>
        <div class="table">
          <div v-for="(column, index) in columns" :key="index" class="row flex-center">
            <el-button
              :disabled="index === 0"
              circle
              icon="arrow-up"
              type="primary"
              class="move"
              @click="handleMove(column, index, -1)"
            />
            <el-button
              :disabled="index === columns.length - 1"
              circle
              icon="arrow-down"
              type="success"
              class="move"
              @click="handleMove(column, index, 1)"
            />
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
      overflow-y: scroll;
    }
  }
  .el-checkbox {
    overflow: hidden;
    margin-right: 0;
  }
  .table {
    margin-top: 10px;
    border-top: 1px solid #d0dddd;
  }
  .row {
    border: 1px solid #d0dddd;
    padding: 5px;
    border-top: 0;
  }
  .move {
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
  .el-checkbox {
    margin-left: 10px;
  }
  .label {
    display: inline-block;
    width: calc(100% - 240px);
    margin-left: 10px;
    cursor: pointer;
  }
  .el-input-number {
    width: 120px;
    margin-right: 5px;
  }
}
.settings-reference {
  padding: 0 10px;
  font-size: 18px;
}
</style>
