<script setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  {
    text: '首页',
    icon: 'home-o'
  },
  {
    text: '设置',
    icon: 'setting-o'
  }
]
</script>

<template>
  <div class="mobile-tabs-layout">
    <van-nav-bar
      v-show="!route.meta.hideNavBar"
      :left-text="!route.meta.hideLeftArrow ? '返回' : ''"
      :left-arrow="!route.meta.hideLeftArrow"
      :title="route.meta.title"
      @click-left="$router.go(-1)"
    />
    <main>
      <router-view />
    </main>
    <van-tabbar v-show="!route.meta.hideTabBar">
      <van-tabbar-item
        v-for="(item, index) in tabs"
        :key="index"
        v-bind="item"
      >
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>
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
}
</style>
