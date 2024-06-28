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
    isMobile () {
      return this.$attrs.platform === 'mobile'
    },
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
      if (!currentRow.length) rows.pop()
      return rows
    }
  }
}
</script>

<template>
  <div class="x-auto-rows">
    <x-row
      v-for="(row, i) in rows"
      :key="i"
      v-bind="$attrs"
      :platform="$attrs.platform"
    >
      <x-col
        v-for="(col, j) in row"
        v-bind="col"
        :span="isMobile ? (col.xs || col.span || span) : (col.span || span)"
        :key="j"
        :platform="$attrs.platform"
      >
        <slot
          v-if="col.slot || $attrs.slot"
          :name="col.slot || $attrs.slot"
          :col="col"
        />
        <span v-else>{{ col.text }}</span>
      </x-col>
    </x-row>
  </div>
</template>
