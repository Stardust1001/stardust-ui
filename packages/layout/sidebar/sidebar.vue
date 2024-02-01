<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import store from '@/store'
import Menu from './menu.vue'
import Item from './item.vue'

const props = defineProps({ menu: Array })
const route = useRoute()
const hoverMenu = ref(null)

const { app, routes } = store

const collapse = computed(() => app.sidebarCollapse)
const toggled = computed(() => app.sidebarToggled)
const toggleDuration = computed(() => app.toggleDuration + 's')

const _menu = computed(() => {
  const filtered = routes.enabledRoutes.filter(route => {
    return !route.meta.hidden && route.path.split('/').length === 2
  })
  setTabIndex(filtered)
  return filtered
})

const setTabIndex = (menu, start = 1) => {
  menu.forEach(ele => {
    ele.tabindex = start ++
    if (ele.children?.length) {
      start = setTabIndex(ele.children, start)
    }
  })
  return start
}

const menu = computed(() => props.menu || _menu)

const sidebarClasses = computed(() => ({
  collapse: collapse.value,
  expand: !collapse.value,
  collapsing: toggled.value && collapse.value,
  expanding: toggled.value && !collapse.value,
  mobile: app.isMobile
}))

const onPopoverShow = () => hoverMenu.value.updateCurrent()

</script>

<template>
  <el-aside class="sidebar" :class="sidebarClasses">
    <router-link :to="{ path: '/' }" class="logo-name flex-center">
      <img src="/logo.png" alt="logo" class="logo" />
      <span v-show="!collapse" class="site-name">{{ app.sitename }}</span>
    </router-link>
    <el-scrollbar>
      <Menu :menu="menu">
        <template #root-menu="{ node, data }">
          <el-popover
            placement="right"
            :width="200"
            trigger="hover"
            popper-class="menu-popover"
            @show="onPopoverShow"
          >
            <template #reference>
              <Item :data="data" />
            </template>
            <Menu ref="hoverMenu" :menu="data.children" :hover="true" />
          </el-popover>
        </template>
      </Menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  background-color: var(--x-sidebar-bg-color);
  color: white;
  overflow-x: hidden;
  animation-duration: v-bind('toggleDuration');
  font-size: 15px;
  &.expand {
    width: var(--x-sidebar-width);
  }
  &.collapse {
    width: var(--x-sidebar-collapse-width);
  }
  &.expanding {
    animation-name: expanding;
  }
  &.collapsing {
    animation-name: collapsing;
  }
  .logo-name {
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--x-sidebar-bg-color);
    width: var(--x-sidebar-width);
    height: var(--x-header-height);
    line-height: var(--x-header-height);
    z-index: 100;
    font-weight: 600;
    font-style: italic;
    font-size: 18px;
    color: white;
    justify-content: start;
    border-bottom: 1px solid #409eff;
    .logo {
      height: 80%;
      margin: 10% 10px;
    }
  }
  .el-scrollbar {
    width: 100%;
    padding-top: var(--x-header-height);
  }
}

@keyframes expanding {
  0% {
    width: var(--x-sidebar-collapse-width);
  }
  100% {
    width: var(--x-sidebar-width);
  }
}

@keyframes collapsing {
  0% {
    width: var(--x-sidebar-width);
  }
  100% {
    width: var(--x-sidebar-collapse-width);
  }
}
</style>

<style lang="scss">
.menu-popover {
  padding: 0 !important;
}
</style>
