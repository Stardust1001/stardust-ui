<script>
export default {
  name: 'MobileXPagination',
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
  <van-pagination
    v-bind="{...$attrs, ...(mobilePagination || {})}"
    v-model="query.page"
    :items-per-page="query.limit"
    :page-count="pageCount"
    :total-items="total"
  >
    <template #prev-text>
      <van-icon name="arrow-left" />
    </template>
    <template #next-text>
      <van-icon name="arrow" />
    </template>
    <template #page="{ text }">{{ text }}</template>
  </van-pagination>
</template>
