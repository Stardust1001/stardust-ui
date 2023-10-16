<script>
export default {
  name: 'XImageUploader',
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    action: String
  },
  emits: ['update:modelValue'],
  data () {
    return {
      disabled: false
    }
  },
  computed: {
    actionUrl () {
      return this.action || this.service?.API_BASE_URL + '/common/upload_files'
    },
    limit () {
      return this.$attrs.limit || (this.multiple ? 1e9 : 1)
    }
  },
  methods: {

  }
}
</script>

<template>
  <el-upload
    :file-list="modelValue"
    @update:file-list="value => $emit('update:modelValue', value)"
    :disabled="disabled"
    :action="action"
    list-type="picture-card"
    accept="image/*"
    :multiple="multiple"
    :limit="limit"
    class="x-image-uploader"
    v-bind="$attrs"
    :auto-upload="$attrs.autoUpload || false"
  >
  </el-upload>
</template>

<style lang="scss" scoped>
.x-image-uploader {
}
</style>
