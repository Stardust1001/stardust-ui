<script>
export default {
  name: 'MobileXTableTools',
  inheritAttrs: false,
  props: {
    searchBtn: Object,
    addBtn: Object,
    multiEditBtn: Object,
    multiDeleteBtn: Object,
    exportBtn: Object,
    importBtn: Object,
    domids: Object
  }
}
</script>

<template>
  <div class="mobile-x-table-tools">
    <div
      v-if="!!$attrs.onAdd"
      v-domid="domids['add']"
    >
      <van-floating-bubble
        axis="xy"
        magnetic="x"
        icon="plus"
        class="flex-center x-table-search"
        style="position: fixed; top: 0; font-size: 22px; width: 40px; height: 40px; background-color: #1989fa; border-radius: 50%; color: white;"
        @click="$emit('add')"
      />
    </div>
    <div class="tools">
      <slot name="tools-prefix" />

      <van-button
        v-if="!!$attrs.onSearch"
        v-bind="{ type: 'success', ...searchBtn }"
        v-domid="domids['search']"
        class="x-table-search"
        @click="$emit('search')"
      >
        <mobile-x-icon name="search" />
        查询
      </van-button>
      <van-button
        v-if="!!$attrs.onMultiEdit"
        v-bind="{ type: 'warning', ...multiEditBtn }"
        v-domid="domids['multi-edit']"
        class="x-table-edit"
        @click="$emit('multi-edit')"
      >
        <mobile-x-icon name="edit" />
        编辑
      </van-button>
      <van-button
        v-if="!!$attrs.onMultiDelete"
        v-bind="{ type: 'danger', ...multiDeleteBtn }"
        v-domid="domids['multi-delete']"
        class="x-table-multi-delete"
        @click="$emit('multi-delete')"
      >
        <mobile-x-icon name="DeleteFilled" />
        批量删除
      </van-button>
      <van-button
        v-if="!!$attrs.onExport"
        v-bind="{ type: 'success', ...exportBtn }"
        v-domid="domids['export']"
        class="x-table-export"
        @click="$emit('export')"
      >
        <mobile-x-icon name="printer" />
        导出
      </van-button>
      <van-button
        v-if="!!$attrs.onSearchExport"
        v-bind="{ type: 'success', ...exportBtn }"
        v-domid="domids['search-export']"
        class="x-table-search-export"
        @click="$emit('search-export')"
      >
        <mobile-x-icon name="printer" />
        查询导出
      </van-button>
      <van-button
        v-if="!!$attrs.onImport"
        v-bind="{ type: 'warning', ...importBtn }"
        v-domid="domids['import']"
        class="x-table-import"
        @click="$emit('import')"
      >
        <mobile-x-icon name="UploadFilled" />
        导入
      </van-button>

      <slot name="tools-suffix" />

      <div class="tools-end">
        <slot name="tools-end" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-x-table-tools {
  margin: 5px;
  .tools {
    position: relative;
    min-height: 32px;
    .van-button {
      width: calc(33.33% - 6px);
      height: 30px;
      margin: 3px;
    }
  }
  .tools-end {
    position: absolute;
    right: 0;
    top: 0;
    :deep(.van-icon) {
      margin-right: 0;
    }
  }
}
</style>
