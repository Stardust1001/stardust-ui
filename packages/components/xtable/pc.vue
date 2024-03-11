<script>
import utils from './utils.js'
import { baseDialog } from '../../utils/model.js'
import Searcher from './searcher.vue'
import Settings from './settings.vue'

const { highdict } = StardustJs

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
      isMinus: false,
      isFullscreen: false,
      zoom: 1,
      checked: null,
      activeNames: ['name'],
      settings: {},
      params: {},
      _useCollapse: false,
      dialog: {
        ...baseDialog()
      }
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
    this._useCollapse = this.useCollapse
  },
  watch: {
    _uid: 'initSettings',
    _columns: {
      deep: true,
      immediate: true,
      handler: 'initSettings'
    }
  },
  mounted () {
    if (this.table) {
      this.table.tableRef = this.$refs.tableRef
      this.table.ref = this
    }
    this.$emit('update:tref', this.$refs.tableRef)
  },
  methods: {
    ...utils.methods,
    async handleShowPieDialog () {
      this.dialog.visible = true
      await this.$nextTick()
      if (this.table) {
        this.table.chartRef = this.$refs.chartRef
      }
      await this.$refs.chartRef.init()
      this.$refs.chartRef.initDatasource()
    },
    async handleChartDialogFullscreen () {
      await this.$nextTick()
      this.$refs.chartRef.chart.resize()
    },
    async search () {
      const { remote, remoteMethod, search } = this._chartOption
      if (search) {
        return search()
      } else if (this.controller[remoteMethod]) {
        return this.controller[remoteMethod]()
      } else if (remote && this.controller.getSearchParams) {
        const params = this.controller.getSearchParams()
        const data = await this.controller.search(params)
        let list = highdict.get(data, this.controller.listProp)
        list = this.controller.formatList(this.controller._defaultFormatList(list, data), data)
        return list
      }
      return this._data
    },
    onPaging () {
      if (this.params.page) delete this.params.page
      this._emit('search', this.params)
    }
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
      :class="(_useCollapse ? 'use' : 'no') + '-collapse'"
      @change="handleCollapseChange"
    >
      <el-collapse-item :name="activeNames[0]">
        <template #title>
          <slot v-if="$slots['collapse-title']" name="collapse-title" />
          <span v-else-if="activeNames.length" class="collapse-title">{{ title }}</span>
          <span v-else class="collapse-title">
            {{ title }}，当前第
            <span>{{ _query.page }}</span>
            页，展示
            <span>{{ _data.length }}</span>
            条数据，
            共
            <span>{{ _total || _data.length }}</span> 条数据
          </span>
        </template>
        <slot name="tools-top" />
        <pc-x-table-tools
          v-if="hideTools !== '' && hideTools !== true"
          v-bind="_attrs"
          :domids
          @add="_onAdd"
          @search="_onSearch"
          @export="_onExport"
          @search-export="_onSearchExport"
          @import="_onImport"
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
              v-if="!hideChart"
              name="PieChart"
              class="chart"
              @click="handleShowPieDialog"
            />
            <span class="minus" @click="handleMinus">
              <pc-x-icon name="FullScreen" />
              <span>-</span>
            </span>
            <pc-x-icon
              name="FullScreen"
              class="full"
              @click="handleToggleFullscreen"
            />
            <settings
              v-model="settings"
              :visible="!hideSettings"
              :width="_attrs['cols-popover-width'] || 500"
              @sort="$emit('sort', $event)"
              @reset="handleResetSettings"
              @sort-change="handleSortChange"
            />
          </template>
        </pc-x-table-tools>
        <slot name="tools-bottom" />

        <el-table
          ref="tableRef"
          v-bind="elTableAttrs"
          v-loading="_loading"
          v-el-table-infinite-scroll="_onLoad"
          :infinite-scroll-disabled="_finished"
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
              <el-image
                v-else-if="column.slot === '$image'"
                :src="_imageSrc(scope, column)"
                :preview-src-list="_imagePreviewSrcList(scope, column)"
                preview-teleported
                v-bind="column.imageAttrs"
              />
              <el-tag
                v-else-if="column.slot === '$tag'"
                :type="calcTagType(scope, column)"
              >
                {{ calcTagValue(scope, column) }}
              </el-tag>
              <router-link
                v-else-if="column.slot === 'link'"
                :to="column.to(scope)"
              >
                {{ column.link ? column.link(scope) : scope.row[column.linkProp || column.prop] }}
              </router-link>
              <el-icon v-else-if="column.slot === '$icon'" class="cell-icon">
                <component :is="scope.row[column.prop]" />
              </el-icon>
              <slot
                v-else-if="column.slot"
                :name="column.slot"
                :scope
                :column
                :value="scope.row[column.prop]"
              />
              <slot
                v-else-if="slotAll"
                name="all"
                :scope
                :column
                :value="scope.row[column.prop]"
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
            :fixed="_attrs.operatesFixed ?? 'right'"
          >
            <template #default="scope">
              <slot
                name="operates-prefix"
                :scope
              />
              <el-dropdown v-if="operatesDropdown" class="operates-dropdown">
                <el-button
                  v-bind="{ type: 'primary', ..._attrs['operates-btn'] }"
                  icon="arrow-down"
                >
                  操作
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu class="operates-dropdown-menu">
                    <el-dropdown-item v-if="canEdit(scope.row)">
                      <el-button
                        v-bind="{ type: 'warning', ..._attrs['edit-btn'] }"
                        v-domid="domids['edit']"
                        icon="edit"
                        @click="_emit('edit', scope)"
                      >
                        编辑
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="canSave(scope.row)">
                      <el-button
                        v-bind="{ type: 'success', ..._attrs['row-edit-btn'] }"
                        v-loading="scope.row._loading"
                        :disabled="scope.row._loading"
                        v-domid="domids['row-edit']"
                        icon="collection"
                        @click="_emit('row-edit', scope)"
                      >
                        保存
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="canCancelEdit(scope.row)">
                      <el-button
                        v-bind="{ type: 'warning', ..._attrs['cancel-edit-btn'] }"
                        v-domid="domids['cancel-edit']"
                        icon="refresh-left"
                        @click="_emit('cancel-edit', scope)"
                      >
                        取消编辑
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="canDelete(scope.row)">
                      <el-button
                        v-bind="{ type: 'danger', ..._attrs['delete-btn'] }"
                        v-domid="domids['delete']"
                        icon="DeleteFilled"
                        @click="_emit('delete', scope)"
                      >
                        删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button
                v-if="!operatesDropdown && canEdit(scope.row)"
                v-bind="{ type: 'warning', ..._attrs['edit-btn'] }"
                v-domid="domids['edit']"
                icon="edit"
                @click="_emit('edit', scope)"
              >
                编辑
              </el-button>
              <el-button
                v-if="!operatesDropdown && canSave(scope.row)"
                v-bind="{ type: 'success', ..._attrs['row-edit-btn'] }"
                v-loading="scope.row._loading"
                :disabled="scope.row._loading"
                v-domid="domids['row-edit']"
                icon="collection"
                @click="_emit('row-edit', scope)"
              >
                保存
              </el-button>
              <el-button
                v-if="!operatesDropdown && canCancelEdit(scope.row)"
                v-bind="{ type: 'warning', ..._attrs['cancel-edit-btn'] }"
                v-domid="domids['cancel-edit']"
                icon="refresh-left"
                @click="_emit('cancel-edit', scope)"
              >
                取消编辑
              </el-button>
              <el-button
                v-if="!operatesDropdown && canDelete(scope.row)"
                v-bind="{ type: 'danger', ..._attrs['delete-btn'] }"
                v-domid="domids['delete']"
                icon="DeleteFilled"
                @click="_emit('delete', scope)"
              >
                删除
              </el-button>
              <slot
                name="operates-suffix"
                :scope
              />
            </template>
          </el-table-column>
        </el-table>

        <x-pagination
          v-if="!!_query && !!_total && !hidePagination"
          :query="_query"
          :total="_total"
          @search="onPaging"
        />
      </el-collapse-item>
    </el-collapse>
  </div>

  <x-dialog
    v-if="!hideChart"
    v-model="dialog.visible"
    title="图表"
    width="96%"
    @fullscreenchange="handleChartDialogFullscreen"
  >
    <x-chart
      ref="chartRef"
      :height="_chartHeight"
      :option="_chartOption"
      :datasource="{ columns: _columns, search }"
    />
  </x-dialog>
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
  .collapse-title span {
    color: var(--el-color-danger);
  }
  .cell-icon {
    font-size: 17px;
  }
}
.minus {
  position: relative;
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
  span {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 200;
  }
}
</style>
