<script>
export default {
  name: 'PcXPagination',
  props: {
    query: Object,
    total: Number
  },
  emits: ['search'],
  computed: {
    pageCount () {
      return Math.ceil(this.total / this.query.limit)
    }
  },
  watch: {
    'query.page' () {
      this.$emit('search')
    },
    'query.limit' () {
      this.$emit('search')
    }
  }
}
</script>

<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    v-bind="{...$attrs, ...(pcPagination || {})}"
    v-model:current-page="query.page"
    v-model:page-size="query.limit"
    :page-count="pageCount"
    :total="total"
  />
</template>
