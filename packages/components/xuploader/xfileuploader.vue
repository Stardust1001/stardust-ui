<script>
export default {
  name: 'XFileUploader',
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    accept: String
  },
  emits: ['update:modelValue'],
  data () {
    return {
      action: `${this.$api.API_BASE_URL}/upload_file`
    }
  },
  computed: {
    filepath () {
      const model = this.modelValue
      return Array.isArray(model) ? model[0] : model
    }
  },
  methods: {
    onSuccess (res, file, fileList) {
      const path = this.$api.API_BASE_URL + '/' + res.filename
      this.$emit('update:modelValue', path)
    }
  }
}
</script>

<template>
  <el-upload
    drag
    :show-file-list="false"
    :action="action"
    :accept="accept"
    :multiple="multiple"
    :on-success="onSuccess"
    class="x-file-uploader"
  >
    <div class="mask">
      <x-icon name="upload-filled" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
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
