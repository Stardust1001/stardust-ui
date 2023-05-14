<script>
export default {
  name: 'XActionSheet',
  props: {
    actionSheet: Object
  }
}
</script>

<template>
  <van-action-sheet
    v-bind="$attrs"
    v-model:show="actionSheet.show"
    :actions="actionSheet.actions"
  />
</template>
