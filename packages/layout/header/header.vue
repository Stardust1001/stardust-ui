<script setup>
import { reactive, inject, computed, nextTick } from 'vue'
import store from '@/store'
import router from '@/router'

import Breadcrumb from '../breadcrumb/breadcrumb.vue'
import Inner from './inner.vue'

const { funcs } = StardustJs
const { storage, fullscreen } = StardustBrowser

const { local, session } = storage
const { app, user } = store
const { info } = user

const model = reactive({
  themeDialogVisible: false,
  colorIndex: -1,
  themeColors: ['#1B5297', '#F5222D', '#FA541C', '#FAAD14', '#13C2C2', '#52C41A', '#1890FF', '#2F54EB', '#722ED1']
})

const handleToggleSidebar = () => {
  app.$patch({
    sidebarToggled: true,
    sidebarCollapse: !app.sidebarCollapse
  })
}

const handleToggleFullscreen = () => {
  const { isOpened, open, exit } = fullscreen
  isOpened() ? exit() : open()
}

const handleClearStorage = () => {
  local.clear()
  local.setJson('cacheState', { user: user.$state })
  window.location.reload()
}

const handleLockScreen = () => {
  app.screenLock.isLocked = true
}

const handleSetTheme = () => {
  model.themeDialogVisible = true
}

const handleReset = () => {
  const theme = local.getJson('theme')
  for (let key in theme) {
    theme[key] = ''
  }
  setTheme(theme)
  local.setJson('theme', theme)
}

const handleSetThemeColor = (color) => {
  const root = document.documentElement
  const [r, g, b] = [0, 1, 2].map(n => parseInt(color.slice(1 + n * 2, 1 + n * 2 + 2), 16))
  const avg = (r + g + b) / 3
  const rgb2Hex = (...rgba) => '#' + rgba.map(n => n.toString(16)).join('')
  const theme = {
    color,
    '--x-bg-color': rgb2Hex(r, g, b, 30),
    '--x-sidebar-bg-color': color,
    '--x-sidebar-current-bg-color': rgb2Hex(20, 20, 20, 170),
    '--x-sidebar-hover-bg-color': rgb2Hex(20, 20, 20, 200),
    '--x-sidebar-text-color': avg < 128 ? '#e0eeee' : '#303333',
    '--x-sidebar-current-text-color': avg < 128 ? '#b0bbbb' : '#606666'
  }
  setTheme(theme)
  local.setJson('theme', theme)
}

const setTheme = theme => {
  model.colorIndex = model.themeColors.indexOf(theme.color)
  const root = document.documentElement
  for (let key in theme) {
    if (key === 'color') continue
    root.style.setProperty(key, theme[key])
  }
}

const handleLogout = async () => {
  await router.replace('/login')
  await funcs.sleep(50)
  session.clear()
  local.clear()
  window.location.reload()
}

const config = inject('config')
const { icons = null } = config?.header || {}
setTheme(local.getJson('theme', {}))
</script>

<template>
  <div class="header">
    <div class="toggler flex-center" @click="handleToggleSidebar">
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        :class="{ active: app.sidebarCollapse }"
      >
        <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
      </svg>
    </div>

    <Breadcrumb v-if="app.breadcrumbVisible" class="breadcrumb" />

    <Inner />

    <div class="right flex-center">
      <span class="user flex-center">
        <el-avatar shape="circle" :src="info.avatar" class="avatar">
          {{ info.username[0].toUpperCase() }}
        </el-avatar>
        <span class="name">{{ info.username }}</span>
      </span>
      <el-tooltip
        v-if="!icons || icons.includes('fullscreen')"
        effect="light"
        content="全屏"
      >
        <x-icon
          name="FullScreen"
          class="full"
          @click="handleToggleFullscreen"
        />
      </el-tooltip>
      <el-tooltip
        v-if="!icons || icons.includes('screen_lock')"
        effect="light"
        content="锁屏"
      >
        <x-icon
          name="Lock"
          class="lock"
          @click="handleLockScreen"
        />
      </el-tooltip>
      <el-tooltip
        v-if="!icons || icons.includes('clear_storage')"
        effect="light"
        content="清除缓存"
      >
        <x-icon
          name="Delete"
          class="clear"
          @click="handleClearStorage"
        />
      </el-tooltip>
      <el-tooltip
        v-if="!icons || icons.includes('theme')"
        effect="light"
        content="主题"
      >
        <x-icon
          name="Brush"
          class="theme"
          @click="handleSetTheme"
        />
      </el-tooltip>
      <el-tooltip
        v-if="!icons || icons.includes('logout')"
        effect="light"
        content="退出"
      >
        <x-icon
          :name="app.isMobile ? 'stop-circle-o' : 'SwitchButton'"
          class="logout"
          @click="handleLogout"
        />
      </el-tooltip>
    </div>

    <x-dialog
      title="主题设置"
      v-model="model.themeDialogVisible"
      drawer
      class="theme-dialog"
    >
      <div class="block">
        <div class="title">主题色</div>
        <div class="theme-colors">
          <div
            v-for="(color, index) in model.themeColors"
            :key="color"
            class="color"
            :class="{ active: index === model.colorIndex }"
            :style="{ backgroundColor: color }"
            @click="handleSetThemeColor(color)"
          />
        </div>
      </div>
      <el-button type="primary" @click="handleReset">恢复默认</el-button>
    </x-dialog>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 0;
  position: relative;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .toggler {
    cursor: pointer;
    width: var(--x-header-height);
    height: var(--x-header-height);
    margin-right: 10px;
    &:hover {
      background-color: #f8f8f8;
    }
    svg {
      transform: rotate(180deg);
      &.active {
        transform: rotate(0);
      }
    }
  }
  .right {
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    .el-icon {
      font-size: 20px;
      margin-left: 10px;
      cursor: pointer;
    }
    .user {
      color: #626aef;
      display: inline-flex;
      vertical-align: top;
    }
    .avatar {
      margin-right: 10px;
    }
    .el-icon {
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .theme-dialog {
    .block {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e0eeee;
    }
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .color {
      display: inline-block;
      cursor: pointer;
      width: 25px;
      height: 25px;
      border-radius: 2px;
      margin-right: 5px;
      margin-bottom: 5px;
      position: relative;
      &.active::after {
        content: '✓';
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }
  }
}
</style>
