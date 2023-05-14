<script>
export default {
  name: 'XAutoRows',
  props: {
    span: {
      type: Number,
      default: 8
    },
    cols: {
      type: Array,
      default: []
    }
  },
  computed: {
    rows () {
      const rows = [[]]
      let currentRow = rows[0]
      let rowSumSpan = 0
      this.cols.forEach(col => {
        const span = col.span || this.span
        currentRow.push(col)
        rowSumSpan += span
        if (rowSumSpan >= 24) {
          currentRow = []
          rows.push(currentRow)
          rowSumSpan = 0
        }
      })
      return rows
    }
  }
}
</script>

<template>
  <div class="x-auto-rows">
    <XRow
      v-for="(row, i) in rows"
      :key="i"
      v-bind="$attrs"
      :platform="$attrs.platform"
    >
      <XCol
        v-for="(col, j) in row"
        v-bind="col"
        :span="col.span || span"
        :key="j"
        :platform="$attrs.platform"
      >
        <slot
          v-if="col.slot || $attrs.slot"
          :name="col.slot || $attrs.slot"
          :col="col"
        />
        <span v-else>{{ col.text }}</span>
      </XCol>
    </XRow>
  </div>
</template>
