<script>
import Item from './item.vue'

export default {
  name: 'Menu',
  components: { Item },
  props: {
    menu: Array,
    hover: Boolean
  },
  data () {
    return {
      defaultProps: { label: 'name' }
    }
  },
  computed: {
    collapse () {
      return this.$store.getters.collapse
    }
  },
  watch: {
    collapse: {
      handler () {
        this.filter()
        this.updateCurrent()
      },
      immediate: true
    },
    $route: {
      handler: 'updateCurrent',
      immediate: true
    }
  },
  mounted () {
    this.filter()
    this.updateCurrent()
  },
  methods: {
    filter () {
      this.$refs.tree?.filter()
    },
    updateCurrent () {
      (this.hover || !this.collapse) && this.$refs.tree?.setCurrentKey(this.$route.name)
    },
    filterMenu (_, data) {
      if (!this.hover && this.collapse && data.path[0] !== '/') {
        return false
      }
      return !data.meta?.hidden
    },
    checkIsRoot (data) {
      return this.checkIsBranch(data) && data.path.split('/').length === 2
    },
    checkIsBranch (data) {
      return data.children?.length > 0
    },
    handleNodeClick (data, node, _, e) {
      if (!this.checkIsBranch(data)) {
        this.$router.push({ name: data.name })
        return
      }
      if (this.collapse && this.checkIsRoot(data)) {
        this.$store.app.$patch({ sidebarCollapse: false })
        this.$refs.tree.setCurrentKey(this.$route.name)
      }
    },
    handleKeydown ($event, node, data) {
      if ($event.key === 'Enter') {
        this.$router.push({ name: data.name })
      }
    }
  }
}
</script>

<template>
  <el-tree
    ref="tree"
    :data="menu"
    :props="defaultProps"
    :filter-node-method="filterMenu"
    node-key="name"
    class="side-menu"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <div :tabindex="data.tabindex" @keydown="handleKeydown($event, node, data)">
        <slot v-if="collapse && checkIsRoot(data)" name="root-menu" :node="node" :data="data" />
        <Item v-else :data="data" :hover="hover" />
      </div>
    </template>
  </el-tree>
</template>

<style lang="scss">
.side-menu {
  min-width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  display: inline-block !important;
  background-color: var(--x-sidebar-bg-color);
  color: #a0aaaa;
  .el-tree-node__expand-icon {
    display: none;
  }
  .el-tree-node__content {
    height: 50px;
    line-height: 50px;
    position: relative;
  }
  .el-tree-node__chilren,
  .el-tree-node__content {
    background-color: transparent !important;
  }
  .el-tree-node {
    &.is-current {
      background-color: var(--x-sidebar-current-bg-color);
      .menu-item {
        color: var(--x-sidebar-current-text-color);
      }
    }
    &.is-expanded .el-tree-node__content:hover, &:not(.is-expanded):hover {
      background-color: var(--x-sidebar-hover-bg-color) !important;
      .menu-item {
        color: var(--x-sidebar-current-text-color);
        position: relative;
        animation-name: tick;
        animation-duration: 0.3s;
        @keyframes tick {
          0% {
            left: 0;
          }
          50% {
            left: 10px;
          }
          100% {
            left: 0;
          }
        }
      }
    }
  }

  .menu-item {
    width: 100%;
    justify-content: start;
    padding: 0 10px 0 22px;
    color: var(--x-sidebar-text-color);
    &.branch {
      padding-left: 22px;
    }
  }
  .icon {
    font-size: 20px;
    margin-right: 10px;
  }
  .arrow-down {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #e0eeee;
  }
}
.mobile {
  .side-menu {
    .menu-item {
      padding-left: 0;
      &.branch {
        padding-left: 0;
      }
    }
    .arrow-down {
      top: 0.48rem;
      right: 0;
    }
  }
}
</style>
