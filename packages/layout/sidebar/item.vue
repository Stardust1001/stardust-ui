<script>
export default {
  name: 'Item',
  props: {
    data: Object,
    hover: Boolean
  },
  computed: {
    collapse () {
      return this.$store.getters.collapse
    },
    isBranch () {
      return this.data.children?.length > 0
    }
  }
}
</script>

<template>
  <span
    class="menu-item flex-center"
    :class="{ branch: isBranch }"
  >
    <x-icon v-if="data.meta.icon" :name="data.meta.icon" class="icon" />
    <span v-show="hover || !collapse">
      <span>{{ data.meta.title }}</span>
      <x-icon v-if="isBranch" name="arrow-down" class="arrow-down" />
    </span>
  </span>
</template>
