<script>
export default {
  name: 'Settings',
  props: {
    visible: Boolean,
    modelValue: Object
  },
  emits: ['update:modelValue', 'reset', 'sort-change'],
  data () {
    return {
      activeName: 'columns',
      columns: [],
      sortableColumns: [],
      sorts: [],
      sortOptions: [
        { text: '升序', value: 'asc' },
        { text: '降序', value: 'desc' }
      ]
    }
  },
  computed: {
    hideColumns () {
      const value = this.$attrs['hide-settings-columns']
      return value === '' || value === true
    },
    hideSorts () {
      const value = this.$attrs['hide-settings-sorts']
      return value === '' || value === true
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
        this.sortableColumns = this.columns.filter(col => !col.virtual)
      },
      immediate: true
    },
    sorts: {
      handler (value) {
        this.$emit('sort-change', value.map(v => v.slice(0, 2)))
      },
      deep: true
    }
  },
  async mounted () {
    await window.DynamicLibs?.use('Sortable')
    this.initDraggable()
  },
  beforeUnmount () {
    this.sortable?.destroy()
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
    handleAddSort () {
      this.sorts.push([this.sortableColumns[0].prop, 'asc', this.sortableColumns[0].label])
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
    trigger="hover"
    popper-class="table-settings"
    v-bind="$attrs"
  >
    <template #reference>
      <el-button class="settings-reference" icon="Setting" />
    </template>

    <el-tabs v-model="activeName">
      <el-tab-pane v-if="!hideColumns" name="columns" label="展示列">
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
      <el-tab-pane v-if="!hideSorts" name="sorts" label="多列排序">
        <el-button type="primary" plain icon="Plus" @click="handleAddSort">添加排序</el-button>
        <div class="table" ref="sortsTable">
          <div
            v-for="(sort, index) in sorts"
            :key="sort[0]"
            :data-prop="sort[0]"
            class="row flex-center"
          >
            <x-select
              v-model="sort[0]"
              :options="sortableColumns"
              text="label"
              value="prop"
              :teleported="false"
              :clearable="false"
            />
            <x-radios v-model="sort[1]" :options="sortOptions" />
            <el-button type="danger" plain icon="DeleteFilled" @click="sorts.splice(index, 1)" />
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
    min-height: 200px;
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
  .el-select {
    width: 200px;
    margin-right: 10px;
  }
  .el-radio-group {
    width: 180px;
  }
}
.settings-reference {
  padding: 0 10px;
  font-size: 18px;
}
</style>
