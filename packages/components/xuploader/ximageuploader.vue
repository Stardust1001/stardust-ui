<script>
export default {
  name: 'XImageUploader',
  props: {
    modelValue: Array | String,
    multiple: Boolean
  },
  emits: ['update:modelValue'],
  data () {
    return {
      action: `${this.$api.API_BASE_URL}/upload_file`
    }
  },
  computed: {
    image () {
      const model = this.modelValue
      return Array.isArray(model) ? model[0] : model
    }
  },
  methods: {
    onSuccess (res, file, fileList) {
      const image = this.$api.API_BASE_URL + '/' + res.filename
      this.$emit('update:modelValue', image)
    }
  }
}
</script>

<template>
  <el-upload
    drag
    :show-file-list="false"
    :action="action"
    accept="image/*"
    :multiple="multiple"
    :on-success="onSuccess"
    class="x-image-uploader"
  >
    <el-image
      v-if="image"
      :src="image"
      alt="upload-image"
      fit="cover"
    />
    <div class="mask">
      <x-icon name="upload-filled" />
      <div class="el-upload__text">
        将图片拖到此处，或<em>点击上传</em>
      </div>
    </div>
  </el-upload>
</template>

<style lang="scss" scoped>
.x-image-uploader {
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
}
</style>
