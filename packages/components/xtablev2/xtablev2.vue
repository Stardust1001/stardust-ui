<script>
import tableUtils from '../xtable/utils.js'
import utils from './utils.jsx'
import Searcher from '../xtable/searcher.vue'
import Settings from '../xtable/settings.vue'

export default {
  name: 'XTableV2',
  props: {
    ...tableUtils.props(),
    fixed: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '60vh'
    }
  },
  emits: [
    ...tableUtils.emits()
  ],
  components: { Searcher, Settings },
  data () {
    return {
      isFullscreen: false,
      zoom: 1,
      selected: new Set(),
      checked: null,
      activeNames: ['name'],
      settings: {}
    }
  },
  computed: {
    ...tableUtils.computed
  },
  watch: {
    ...tableUtils.watch,
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
    ...tableUtils.methods,
    convertColumnsForTableV2: utils.convertColumnsForTableV2
  }
}
</script>

<template>
  <div class="pc-x-table-v2" :class="{ fullscreen: isFullscreen }">
    <Searcher
      ref="searcher"
      :uid="_uid"
      :columns="searcherColumns"
      :config="searcherConfig"
      @search="_emit('search', $event)"
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
        <x-table-tools
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
            <x-icon
              name="FullScreen"
              class="full"
              @click="handleToggleFullscreen"
            />
            <Settings
              v-model="settings"
              :visible="!hideSettings"
              :width="_attrs['cols-popover-width'] || 500"
              @reset="handleResetSettings"
            />
          </template>
        </x-table-tools>

        <el-auto-resizer :style="{ height }">
          <template #default="{ width, height }">
            <el-table-v2
              ref="tableRef"
              :header-height="46"
              :row-height="40"
              v-bind="elTableAttrs"
              v-loading="_loading"
              :data="_data"
              :columns="convertColumnsForTableV2(_visibleColumns, this)"
              :fixed="fixed"
              :width="width"
              :height="height"
            >
              <template v-if="$slots['footer']" #footer>
                <slot name="footer" />
              </template>
              <template v-if="$slots['empty']" #empty>
                <slot name="empty" />
              </template>
              <template v-if="$slots['overlay']" #overlay>
                <slot name="overlay" />
              </template>
            </el-table-v2>
          </template>
        </el-auto-resizer>

        <x-pagination
          v-if="!!_query && !!_total && !!(onSearch || _listen['search'])"
          :query="_query"
          :total="_total"
          @search="_emit('search')"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss">
.pc-x-table-v2 {
  &.fullscreen {
    background-color: white;
    z-index: 2000;
  }
  .el-icon.full {
    font-size: 20px;
    color: #606666;
    height: 32px;
    cursor: pointer;
    margin-right: 10px !important;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .el-table-v2__header-cell.is-align-center {
    .el-checkbox {
      width: 15px !important;
    }
  }
}
.visible-cols-reference {
  padding: 0 10px;
  font-size: 18px;
}
</style>
