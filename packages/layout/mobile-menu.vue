<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Sidebar from './sidebar/sidebar.vue'

const route = useRoute()

const sidebarVisible = ref(false)

watch(route, () => sidebarVisible.value = false)

const handleToggleSidebar = () => sidebarVisible.value = !sidebarVisible.value
</script>

<template>
  <div class="mobile-menu-layout">
    <van-nav-bar
      v-show="!route.meta.hideNavBar"
      left-text="返回"
      left-arrow
      :title="route.meta.title"
      @click-left="$router.go(-1)"
    >
      <template #right>
        <div class="toggler flex-center" @click="handleToggleSidebar">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            :class="{ active: sidebarVisible }"
          >
            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
          </svg>
        </div>
      </template>
    </van-nav-bar>
    <main :class="{ 'has-sidebar': sidebarVisible }">
      <router-view />
      <van-overlay
        v-if="sidebarVisible"
        :show="true"
        @click="handleToggleSidebar"
      >
        <Sidebar />
      </van-overlay>
    </main>
  </div>
</template>

<style lang="scss" scoped>
svg {
  transform: rotate(180deg);
  &.active {
    transform: rotate(0);
  }
}
main {
  height: calc(100vh - var(--van-nav-bar-height));
  overflow-y: auto;
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    :deep(.arrow-down) {
      top: 0.3rem;
      right: 0.15rem;
    }
  }
}
</style>
