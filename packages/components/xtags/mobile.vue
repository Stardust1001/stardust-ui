<script>
export default {
  name: 'MobileXTags',
  props: {
    data: Array
  },
  emits: ['close'],
  computed: {
    _data () {
      if (!this.data?.length) return []
      return this.data.map(ele => typeof ele === 'object' ? ele : { text: ele })
    }
  }
}
</script>

<template>
  <div class="mobile-x-tags">
    <van-tag
      v-for="(item, index) in _data" :key="index"
      v-bind="{ ...$attrs, item }"
      @close="$emit('close', item.text, index)"
    >
      {{ item.text }}
    </van-tag>
  </div>
</template>

<style lang="scss" scoped>
.van-tag {
  margin-right: 10px;
}
</style>
