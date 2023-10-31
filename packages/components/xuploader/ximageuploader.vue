<script>
import { Message } from '../../utils/message.js'

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
      previewingImage: {},
      dialogVisible: false
    }
  },
  computed: {
    actionUrl () {
      return this.action || this.service?.API_BASE_URL + '/common/upload_files'
    },
    limit () {
      return this.$attrs.limit || (this.multiple ? 1e9 : 1)
    },
    images () {
      return this.modelValue.map(m => m.url)
    }
  },
  methods: {
    handlePreview (img) {
      this.previewingImage = img
      this.dialogVisible = true
    },
    handleExceed (files, uploadFiles) {
      Message({ type: 'warning', message: '超出图片限制数量' })
    }
  }
}
</script>

<template>
  <el-upload
    :file-list="modelValue"
    @update:file-list="value => $emit('update:modelValue', value)"
    :action="action"
    list-type="picture-card"
    accept="image/*"
    :multiple="multiple"
    :limit="limit"
    class="x-image-uploader"
    :class="{ disabled: $attrs.disabled || images.length >= limit }"
    :on-preview="handlePreview"
    :on-exceed="handleExceed"
    v-bind="$attrs"
    :auto-upload="$attrs.autoUpload || false"
  >
    <template #default>
      <el-icon><Plus /></el-icon>
    </template>
  </el-upload>
  <el-dialog
    v-model="dialogVisible"
    :title="'预览图片' + previewingImage.name"
  >
    <img :src="previewingImage.url" alt="previewing-image">
  </el-dialog>
</template>

<style lang="scss" scoped>
.x-image-uploader {
  &.disabled {
    :deep(.el-upload) {
      display: none;
    }
  }
}
.el-dialog img {
  display: block;
  width: 100%;
  margin: auto;
  padding-bottom: 15px;
}
</style>
