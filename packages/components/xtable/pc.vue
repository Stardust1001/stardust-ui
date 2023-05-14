<script>
import utils from './utils.js'
import Searcher from './searcher.vue'
import Settings from './settings.vue'

export default {
  name: 'PcXTable',
  inheritAttrs: false,
  props: {
    ...utils.props()
  },
  emits: [
    ...utils.emits()
  ],
  components: { Searcher, Settings },
  data () {
    return {
      searcher: null,
      isFullscreen: false,
      zoom: 1,
      checked: null,
      activeNames: ['name'],
      settings: {},
      params: {}
    }
  },
  computed: {
    ...utils.computed
  },
  watch: {
    ...utils.watch,
    settings: 'saveSettings'
  },
  created () {
    this.initSettings()
  },
  mounted () {
    if (this.table) {
      this.table.tableRef = this.$refs.tableRef
    }
    this.$emit('update:tref', this.$refs.tableRef)
  },
  methods: {
    ...utils.methods
  }
}
</script>

<template>
  <div class="pc-x-table" :class="{ fullscreen: isFullscreen, 'hide-header': hideHeader }">
    <searcher
      ref="searcher"
      :uid="_uid"
      :columns="searcherColumns"
      :config="searcherConfig"
      @search="handleSearch"
    />

    <el-collapse
      v-model="activeNames"
      :class="(useCollapse ? 'use' : 'no') + '-collapse'"
    >
      <el-collapse-item :name="activeNames[0]">
        <template #title>
          <slot v-if="$slots['collapse-title']" name="collapse-title" />
          <span v-else>{{ title }}</span>
        </template>
        <pc-x-table-tools
          v-if="hideTools !== '' && hideTools !== true"
          v-bind="_attrs"
          :domids="domids"
          @add="_onAdd"
          @search="_onSearch"
          @export="_onExport"
          @search-export="_onSearchExport"
          @import="_onImport"
          @multi-edit="_onMultiEdit"
          @multi-delete="_onMultiDelete"
        >
          <template v-if="$slots['tools-prefix']" #tools-prefix>
            <slot name="tools-prefix" />
          </template>
          <template v-if="$slots['tools-suffix']" #tools-suffix>
            <slot name="tools-suffix" />
          </template>
          <template #tools-end>
            <pc-x-icon
              name="FullScreen"
              class="full"
              @click="handleToggleFullscreen"
            />
            <settings
              v-model="settings"
              :visible="!hideSettings"
              :width="_attrs['cols-popover-width'] || 500"
              @reset="handleResetSettings"
            />
          </template>
        </pc-x-table-tools>

        <el-table
          ref="tableRef"
          v-bind="elTableAttrs"
          v-loading="_loading"
          @header-dragend="handleHeaderDragend"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
        >
          <el-table-column
            v-for="(column, index) in _visibleColumns"
            v-bind="column"
            :key="index"
            :min-width="column.minWidth"
            :align="column.align || _attrs.tableAlign || 'center'"
            :resizable="column.resizable || true"
            :show-overflow-tooltip="calcOverflowTooltip(column)"
          >
            <template #default="scope" v-if="!['selection','index'].includes(column.type)">
              <input
                v-if="column.type === 'radio'"
                type="radio"
                :value="scope.$index"
                :checked="scope.$index === checked"
                @change="handleCheckedChange"
              >
              <slot
                v-else-if="column.slot"
                :name="column.slot"
                :scope="scope"
                :column="column"
              />
              <slot
                v-else-if="slotAll"
                name="all"
                :scope="scope"
                :column="column"
              />
              <template v-else>
                <component
                  v-if="column.comp === 'ElSwitch' || table.isRowEdit && scope.row.isEditing && (column.visible !== false || column.canEdit)"
                  :is="column.comp || 'ElInput'"
                  v-bind="{...column, ...column.formAttrs}"
                  v-model="scope.row[column.prop]"
                  :disabled="!scope.row.editable || !scope.row.isEditing"
                />
                <span v-else>
                  {{ calcValue(scope.row, column) }}
                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!hideOperates"
            label="操作"
            :min-width="operatesWidth"
            :align="_attrs.operatesAlign || _attrs.tableAlign || 'center'"
            :fixed="_attrs.operatesFixed || 'right'"
          >
            <template #default="scope">
              <slot
                name="operates-prefix"
                :scope="scope"
              />
              <el-button
                v-if="canEdit(scope.row)"
                v-bind="{ type: 'warning', ..._attrs['edit-btn'] }"
                @click="_emit('edit', scope)"
              >
                <pc-x-icon name="edit" />
                编辑
              </el-button>
              <el-button
                v-if="canSave(scope.row)"
                v-bind="{ type: 'success', ..._attrs['row-edit-btn'] }"
                v-loading="scope.row._loading"
                :disabled="scope.row._loading"
                @click="_emit('row-edit', scope)"
              >
                <pc-x-icon name="collection" />
                保存
              </el-button>
              <el-button
                v-if="canCancelEdit(scope.row)"
                v-bind="{ type: 'warning', ..._attrs['cancel-edit-btn'] }"
                @click="_emit('cancel-edit', scope)"
              >
                <pc-x-icon name="refresh-left" />
                取消编辑
              </el-button>
              <el-button
                v-if="canDelete(scope.row)"
                v-bind="{ type: 'danger', ..._attrs['delete-btn'] }"
                @click="_emit('delete', scope)"
              >
                <pc-x-icon name="DeleteFilled" />
                删除
              </el-button>
              <slot
                name="operates-suffix"
                :scope="scope"
              />
            </template>
          </el-table-column>
        </el-table>

        <x-pagination
          v-if="!!_query && !!_total && !!(onSearch || _listen['search'])"
          :query="_query"
          :total="_total"
          @search="_emit('search', params)"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss">
.pc-x-table {
  &.fullscreen {
    background-color: white;
    z-index: 2000;
  }
  &.hide-header .el-table__header {
    display: none;
  }
}
</style>
