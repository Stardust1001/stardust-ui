<script>
export default {
  name: 'PcXTags',
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
  <div class="pc-x-tags">
    <el-tag
      v-for="(item, index) in _data" :key="index"
      v-bind="{ ...$attrs, item }"
      @close="$emit('close', item.text, index)"
    >
      {{ item.text }}
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
</style>
