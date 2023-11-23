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
  <van-row align="center" class="mobile-x-paginaiton">
    <van-col :span="6">
      <span>总计: {{ total }}</span>
    </van-col>
    <van-col :span="18">
      <van-pagination
        mode="simple"
        :items-per-page="query.limit"
        :total-items="total"
        v-bind="{...$attrs, ...(mobilePagination || {})}"
        v-model="query.page"
        :page-count="pageCount"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
          上一页
        </template>
        <template #next-text>
          下一页
          <van-icon name="arrow" />
        </template>
        <template #page="{ text }">{{ text }}</template>
      </van-pagination>
    </van-col>
  </van-row>
</template>
