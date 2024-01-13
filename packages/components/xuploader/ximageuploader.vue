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
      fileList: [],
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
      return this.fileList.map(m => m.url)
    }
  },
  watch: {
    modelValue: {
      handler (value) {
        this.fileList = Array.isArray(value) ? value : (value ? [{ url: value }] : [])
      },
      immediate: true
    }
  },
  methods: {
    handleSelect () {
      this.$emit('update:modelValue', this.fileList)
    },
    handleRemove (...props) {
      this.$emit('update:modelValue', this.fileList)
      this.$attrs['on-remove']?.(...props)
    },
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
    v-model:file-list="fileList"
    @update:file-list="handleSelect"
    :action
    list-type="picture-card"
    accept="image/*"
    :multiple
    :limit
    class="x-image-uploader"
    :class="{ disabled: $attrs.disabled || images.length >= limit }"
    :on-preview="handlePreview"
    :on-exceed="handleExceed"
    v-bind="$attrs"
    :auto-upload="$attrs.autoUpload || false"
    :on-remove="handleRemove"
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
