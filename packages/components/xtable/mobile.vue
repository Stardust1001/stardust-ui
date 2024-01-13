<script>
import utils from './utils.js'
import Searcher from './searcher.vue'

export default {
  name: 'MobileXTable',
  inheritAttrs: false,
  props: {
    ...utils.props(),
    mode: {
      type: String,
      default: 'card'
    },
    platform: String,
    'max-height': String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...utils.emits()
  ],
  components: { Searcher },
  data () {
    return {
      popupVisible: false,
      scope: {},
      selected: [],
      settings: {},
      checked: null,
      actionSheetVisible: false
    }
  },
  computed: {
    ...utils.computed,
    hasIndex () {
      return this._visibleColumns.some(col => col.type === 'index' || col.type === '_index')
    },
    hasSelection () {
      return this._visibleColumns.some(col => col.type === 'selection')
    },
    hasRadio () {
      return this._visibleColumns.some(col => col.type === 'radio')
    },
    cols () {
      return this._visibleColumns.filter(col => {
        return !['index', 'selection', 'expand', 'radio', '_index'].includes(col.type)
      })
    },
    infoFields () {
      return this.cols.map(col => {
        return {
          ...col,
          slot: undefined,
          infoAttrs: {
            ...(col.infoAttrs ?? {}),
            slot: undefined
          }
        }
      })
    },
    actions () {
      const path = this.$route.path.slice(1).replaceAll('/', ':')
      const doms = this.$store.acl.buttons.map(b => b.perms).filter(p => p.startsWith(path)).map(p => p.split(':').pop())
      return [
        { name: '操作', disabled: true },
        { name: '详情' },
        { name: '编辑', color: '#07c160', domid: 'edit' },
        { name: '删除', color: '#eb6f6f', domid: 'delete' },
      ].filter(ele => {
        return !ele.domid || doms.includes(this.domids[ele.domid])
      })
    }
  },
  watch: {
    selected: {
      handler (value) {
        const rows = []
        value.forEach((ele, index) => {
          if (ele) rows.push(this._data[index])
        })
        this.handleSelectionChange(rows)
      },
      deep: true
    }
  },
  created () {
    window.v = this
    this.initSettings()
  },
  mounted () {
    if (this.table) {
      this.table.tableRef = this
      this.table.ref = this
    }
    this.$emit('update:tref', this)
  },
  methods: {
    ...utils.methods,
    handleShowDetail (row, $index) {
      this.scope = { row, $index }
      this.popupVisible = true
    },
    calcTitle (row) {
      if (typeof this._attrs.title === 'function') {
        return this._attrs.title(row)
      }
      return row[this.cols[0].prop]
    },
    handleEdit () {
      this._emit('edit', this.scope)
    },
    handleDelete () {
      this._emit('delete', this.scope)
    },
    handleClickCard (index) {
      if (this.hasSelection) {
        this.selected[index] = !this.selected[index]
      } else if (this.hasRadio) {
        this.handleCheckedChange({ target: { value: index } })
      }
    },
    handleShowActionSheet (row, $index) {
      this.scope = { row, $index }
      this.actionSheetVisible = true
    },
    handleSelectAction (action, index) {
      if (action.name === '详情') {
        this.handleShowDetail(this.scope.row, this.scope.$index)
      } else if (action.name === '编辑') {
        this.handleEdit()
      } else if (action.name === '删除') {
        this.handleDelete()
      }
    },
    clearSelection () {
      this.selected = []
      this.checked = null
    }
  }
}
</script>

<template>
  <div class="mobile-x-table">
    <searcher
      ref="searcher"
      :uid="_uid"
      :columns="searcherColumns"
      :config="searcherConfig"
      @search="handleSearch"
    />

    <x-table-tools
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
    </x-table-tools>

    <div v-if="(mode || _attrs.mode) === 'card'" class="card">
      <div
        v-for="(row, index) in _data"
        :key="index"
        class="row"
        @click="handleClickCard(index)"
      >
        <div class="row-header flex-center">
          <van-checkbox
            v-if="hasSelection"
            v-model="selected[index]"
            shape="square"
            class="selection"
            @click.stop
          />
          <x-icon
            name="ellipsis"
            class="more"
            @click.stop="handleShowActionSheet(row, index)"
          />
        </div>
        <input
          v-if="hasRadio"
          type="radio"
          :value="index"
          :checked="index === checked"
          class="radio"
          @click.stop
          @change="handleCheckedChange"
        >
        <div
          v-for="(col, index) in cols"
          :key="index"
          class="field"
        >
          <span class="label">{{ col.label }}:</span>
          <span class="value">{{ calcValue(row, col) }}</span>
        </div>
      </div>
    </div>

    <van-list
      v-else-if="(mode || _attrs.mode) === 'list'"
      class="list"
      v-bind="_attrs"
      @load="$emit('search')"
    >
      <van-cell
        v-for="(row, index) in _data"
        :key="index"
        is-link
        @click="handleShowDetail(row, index)"
      >
        <van-checkbox
          v-if="hasSelection"
          v-model="selected[index]"
          shape="square"
          class="selection"
          @click.stop
        />
        <input
          v-if="hasRadio"
          type="radio"
          :value="index"
          :checked="index === checked"
          class="radio"
          @click.stop
          @change="handleCheckedChange"
        >
        <span v-if="hasIndex" class="index">{{ index + 1 }}</span>
        <span class="title">{{ calcTitle(row) }}</span>
      </van-cell>
    </van-list>
    <x-pagination
      v-if="!!_query && !!_total && !!(onSearch || _listen['search'])"
      :query="_query"
      :total="_total"
      @search="_emit('search')"
    />

    <van-popup
      v-model:show="popupVisible"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <x-info
        :data="scope.row"
        :fields="infoFields"
        value-align="right"
      />
    </van-popup>

    <van-action-sheet
      v-model:show="actionSheetVisible"
      :actions
      cancel-text="取消"
      close-on-click-action
      @select="handleSelectAction"
      @cancel="actionSheetVisible = false"
    >
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.mobile-x-table {
  font-size: 14px;
  padding: 1px 0;
  color: #303333;
  background-color: var(--x-bg-color);
  .selection, .radio {
    display: inline-block;
    vertical-align: middle;
    margin-right: var(--x-medium-padding);
  }
  .radio {
    width: 18px;
    height: 18px;
  }
  .row {
    border-radius: 8px;
    margin: var(--x-medium-padding);
    padding: var(--x-medium-padding);
    background-color: white;
    .row-header {
      justify-content: space-between;
    }
    .field {
      margin: 5px 0;
    }
    .label {
      display: inline-block;
      color: #b1b7b7;
      margin-right: 15px;
    }
    .value {
      word-break: break-all;
    }
    .more {
      background-color: white;
      font-size: 18px;
      font-weight: 900;
    }
  }
  .index {
    display: inline-block;
    width: 30px;
  }
  &.card {
    .van-button {
      height: 33px;
    }
  }
  :deep(.van-cell__value) {
    text-align: left;
  }
}
.van-popup {
  position: relative;
  .x-info {
    height: calc(100% - 65px);
    overflow-y: auto;
  }
  .operates {
    position: absolute;
    width: calc(100% - var(--x-medium-padding) * 2);
    left: var(--x-medium-padding);
    bottom: var(--x-medium-padding);
  }
}
:deep(.van-collapse-item__content) {
  --van-collapse-item-content-padding: 0;
}
.van-pagination {
  --van-pagination-height: 33px;
  margin: var(--x-medium-padding) 0;
}
</style>
