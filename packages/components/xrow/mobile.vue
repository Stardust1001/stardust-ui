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
    <MobileXCol
      v-for="(col, index) in cols"
      v-bind="col"
      :key="index"
    >
      <slot
        v-if="col.slot || $attrs.slot"
        :name="col.slot || $attrs.slot"
        :col="col"
      />
      <span v-else>{{ col.text }}</span>
    </MobileXCol>

    <slot v-if="cols.length === 0" />
  </van-row>
</template>
