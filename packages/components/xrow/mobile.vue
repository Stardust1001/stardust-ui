<script>
export default {
  name: 'MobileXRow',
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}
</script>

<template>
  <van-row class="mobile-x-row">
    <mobile-x-col
      v-for="(col, index) in cols"
      v-bind="col"
      :span="col.xs ?? col.span"
      :key="index"
    >
      <slot
        v-if="col.slot || $attrs.slot"
        :name="col.slot || $attrs.slot"
        :col
      />
      <span v-else>{{ col.text }}</span>
    </mobile-x-col>

    <slot v-if="cols.length === 0" />
  </van-row>
</template>
