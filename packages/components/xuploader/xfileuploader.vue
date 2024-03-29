<script>
export default {
  name: 'XFileUploader',
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    accept: String,
    baseURL: String,
    needUpload: Boolean,
    action: String
  },
  emits: ['update:modelValue'],
  data () {
    return {
      disabled: false,
      fileList: []
    }
  },
  computed: {
    actionUrl () {
      return this.action || (this.baseURL || this.service?.API_BASE_URL) + '/common/upload_files'
    },
    filepath () {
      const model = this.modelValue
      return Array.isArray(model) ? model[0] : model
    }
  },
  methods: {
    onSuccess (res, file, fileList) {
      const path = this.service?.API_BASE_URL + '/' + res.filename
      this.$emit('update:modelValue', path)
    },
    async handleUploadAll () {
      this.disabled = true
      const formData = new FormData()
      this.fileList.forEach(f => formData.append('file', f.raw))
      try {
        const data = await this.service.request(this.actionUrl, {
          method: 'POST',
          headers: this.$attrs.headers ?? {},
          data: formData
        })
        let filename = data.data.filename
        filename = Array.isArray(filename) ? filename : [filename]
        const base = (this.baseURL || this.service.API_BASE_URL) + '/'
        filename = filename.map(f => base + f)
        this.$emit('update:modelValue', filename)
      } catch (err) {
        return this.$message.error(err.toString())
      }
    }
  }
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    drag
    :disabled
    :action="actionUrl"
    :accept
    :multiple
    :on-success="onSuccess"
    :auto-upload="false"
    class="x-file-uploader"
    v-bind="$attrs"
  >
    <div class="mask">
      <pc-x-icon name="upload-filled" />
      <div v-if="!disabled" class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
        <br>
        <br>
        <el-button
          v-if="needUpload && !disabled && fileList.length"
          type="success"
          @click.stop="handleUploadAll"
        >
          选择完毕，全部上传到服务器
        </el-button>
      </div>
    </div>
    <div v-if="filepath" class="path">
      {{ modelValue }}
    </div>
  </el-upload>
</template>

<style lang="scss" scoped>
.x-file-uploader {
  text-align: center;
  position: relative;
  .el-icon {
    font-size: 60px;
    color: #c0cccc;
    margin-top: 30px;
  }
  .el-image {
    height: 100%;
  }
  :deep(.el-upload-dragger) {
    height: 200px;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .path {
    color: orangered;
    font-weight: 600;
    position: absolute;
    top: 30px;
    padding: 0 50px;
  }
}
</style>
