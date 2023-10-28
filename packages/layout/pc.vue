<script setup>
import { computed } from 'vue'
import store from '@/store'
import { utils } from '@stardust-js/ui'

import Header from './header/header.vue'
import Sidebar from './sidebar/sidebar.vue'
import TagsView from './tagsview/index.vue'
import ScreenLock from './screenlock/screenlock.vue'

const { app } = store
const watermarkUrl = computed(() => utils.effects.createWatermark(app.watermark).toDataURL())
</script>

<template>
  <el-container
    class="pc-layout"
    :class="{ mobile: app.isMobile, 'has-tagsview': app.tagsviewVisible }"
  >
    <Sidebar />

    <el-container>
      <el-header>
        <Header class="header" />
        <TagsView v-if="app.tagsviewVisible" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>

    <ScreenLock />

    <div
      class="watermark"
      :style="{ 'background-image': app.watermark.visible ? `url(${watermarkUrl})` : '' }"
    />
  </el-container>
</template>

<style lang="scss" scoped>
.pc-layout {
  .el-header {
    height: var(--x-head-height);
    padding: 0;
    color: #606666;
  }
  .header {
    display: flex;
    align-items: center;
    background-color: var(--x-header-bg-color);
    height: var(--x-header-height);
  }
  .el-main {
    background-color: var(--x-bg-color);
    padding: 10px;
    height: calc(100% - #{var(--x-head-height)});
    overflow-y: auto;
  }

  &.mobile {
    zoom: 0.8;
  }
  &.has-tagsview {
    .el-header {
      height: calc(var(--x-head-height) + var(--x-tagsview-height));
    }
    .el-main {
      height: calc(100% - #{var(--x-head-height)} - #{var(--x-tagsview-height)});
    }
  }
}

.watermark {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: rotate(-10deg);
  z-index: 9999;
}
</style>
