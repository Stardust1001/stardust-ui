<script>
import utils from './utils.js'

export default {
  name: 'MobileXTable',
  inheritAttrs: false,
  props: {
    ...utils.props(),
    mode: String,
    platform: String,
    'max-height': String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...utils.emits()
  ],
  data () {
    return {
      popupVisible: false,
      scope: {},
      selected: [],
      settings: {},
      checked: null
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
    this.initSettings()
  },
  mounted () {
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
      this.popupVisible = false
      this._emit('edit', this.scope)
    },
    handleDelete () {
      this.popupVisible = false
      this._emit('delete', this.scope)
    },
    handleClickCard (index) {
      if (this.hasSelection) {
        this.selected[index] = !this.selected[index]
      } else if (this.hasRadio) {
        this.handleCheckedChange({ target: { value: index } })
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
    <x-table-tools
      v-if="hideTools !== '' && hideTools !== true"
      v-bind="_attrs"
      :domids="domids"
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

    <div v-if="(mode || _attrs.mode) === 'card'" class="mobile-x-table card">
      <div
        v-for="(row, index) in _data"
        :key="index"
        class="row"
        @click="handleClickCard(index)"
      >
        <van-swipe-cell @open="scope = { row, $index: index }">
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
          <div
            v-for="(col, index) in cols"
            :key="index"
            class="field"
          >
            <span class="label">{{ col.label }}:</span>
            <span class="value">{{ calcValue(row, col) }}</span>
          </div>
          <template #right>
            <div class="operates">
              <slot
                name="operates-prefix"
                :scope="scope"
              />
              <XRow v-if="!hideOperates" :gutter="10">
                <XCol :span="12">
                  <van-button
                    v-if="canEdit(scope)"
                    v-bind="{ type: 'warning', ..._attrs['edit-btn'] }"
                    @click="handleEdit"
                  >
                    编辑
                  </van-button>
                </XCol>
                <XCol :span="12">
                  <van-button
                    v-if="canDelete(scope)"
                    v-bind="{ type: 'danger', ..._attrs['delete-btn'] }"
                    @click="handleDelete"
                  >
                    删除
                  </van-button>
                </XCol>
              </XRow>
              <slot
                name="operates-suffix"
                :scope="scope"
              />
            </div>
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <van-list
      v-else-if="(mode || _attrs.mode) === 'list'"
      class="mobile-x-table list"
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
      <XInfo
        :data="scope.row"
        :fields="infoFields"
        value-align="right"
      />
      <div class="operates">
        <slot
          name="operates-prefix"
          :scope="scope"
        />
        <XRow v-if="!hideOperates" :gutter="10">
          <XCol :span="12">
            <van-button
              v-if="canEdit(scope)"
              v-bind="{ type: 'warning', ..._attrs['edit-btn'], block: true }"
              @click="handleEdit"
            >
              编辑
            </van-button>
          </XCol>
          <XCol :span="12">
            <van-button
              v-if="canDelete(scope)"
              v-bind="{ type: 'danger', ..._attrs['delete-btn'], block: true }"
              @click="handleDelete"
            >
              删除
            </van-button>
          </XCol>
        </XRow>
        <slot
          name="operates-suffix"
          :scope="scope"
        />
      </div>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.mobile-x-table {
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
    margin: var(--x-medium-padding);
    padding: var(--x-medium-padding);
    background-color: var(--x-bg-color);
    .field {
      display: inline-block;
      min-width: 50%;
      margin: 3px 0;
    }
    .label {
      color: var(--x-label-color);
      margin-right: 15px;
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
:deep(.tools) {
  text-align: center;
}
.van-popup {
  position: relative;
  .x-info {
    height: calc(100% - 65px);
    overflow-y: scroll;
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
