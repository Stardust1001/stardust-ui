<script>
export default {
  name: 'XLooper',
  props: {
    compName: String,
    items: Array
  }
}
</script>

<template>
  <div>
    <component
      v-for="(item, index) in items"
      :key="index"
      :is="compName"
      v-bind="item"
    >
      <slot
        v-if="item.slot || $attrs.slot"
        :item="item"
      />
      <span v-else>{{ item.text }}</span>
    </component>
  </div>
</template>
