<script>
export default {
  name: 'PcXTableTools',
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
  <el-card shadow="hover" :body-style="{ padding: '10px' }" class="pc-x-table-tools">
    <div class="tools">
      <slot name="tools-prefix" />

      <el-button
        v-if="!!$attrs.onSearch"
        v-bind="{ type: 'success', ...searchBtn }"
        v-domid="domids['search']"
        icon="search"
        @click="$emit('search')"
      >
        查询
      </el-button>
      <el-button
        v-if="!!$attrs.onAdd"
        v-bind="{ type: 'primary', ...addBtn }"
        v-domid="domids['add']"
        icon="circle-plus-filled"
        @click="$emit('add')"
      >
        新增
      </el-button>
      <el-button
        v-if="!!$attrs.onMultiEdit"
        v-bind="{ type: 'warning', ...multiEditBtn }"
        v-domid="domids['multi-edit']"
        icon="edit"
        @click="$emit('multi-edit')"
      >
        编辑
      </el-button>
      <el-button
        v-if="!!$attrs.onMultiDelete"
        v-bind="{ type: 'danger', ...multiDeleteBtn }"
        v-domid="domids['multi-delete']"
        icon="DeleteFilled"
        @click="$emit('multi-delete')"
      >
        批量删除
      </el-button>
      <el-button
        v-if="!!$attrs.onExport"
        v-bind="{ type: 'success', ...exportBtn }"
        v-domid="domids['export']"
        icon="printer"
        @click="$emit('export')"
      >
        导出
      </el-button>
      <el-button
        v-if="!!$attrs.onSearchExport"
        v-bind="{ type: 'success', ...exportBtn }"
        v-domid="domids['search-export']"
        icon="printer"
        @click="$emit('search-export')"
      >
        查询导出
      </el-button>
      <el-button
        v-if="!!$attrs.onImport"
        v-bind="{ type: 'warning', ...importBtn }"
        v-domid="domids['import']"
        icon="UploadFilled"
        @click="$emit('import')"
      >
        导入
      </el-button>

      <slot name="tools-suffix" />

      <div class="tools-end flex-center">
        <slot name="tools-end" />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.pc-x-table-tools {
  margin-bottom: 5px;
  :deep(.el-button) {
    vertical-align: top;
  }
  :deep(.el-input) {
    width: 100%;
    margin-right: 5px;
  }
  .tools {
    position: relative;
    min-height: 32px;
  }
  .tools-end {
    position: absolute;
    right: 0;
    top: 0;
    & > :deep(*) {
      margin-left: 10px;
    }
    :deep(.el-icon) {
      font-size: 18px;
      cursor: pointer;
      height: 32px;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
