<script>
export default {
  name: 'PcXRow',
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}
</script>

<template>
  <el-row class="pc-x-row">
    <pc-x-col
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
    </pc-x-col>

    <slot v-if="cols.length === 0" />
  </el-row>
</template>
