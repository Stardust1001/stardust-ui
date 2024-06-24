<script>
export default {
  name: 'PcXTags',
  props: {
    data: Array,
    text: {
      type: String,
      default: 'text'
    }
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
      :type="item.type || $attrs.type"
      @close="$emit('close', item[text], index)"
    >
      {{ item[text] }}
    </el-tag>
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
</style>
