<script>
// 功能若复杂，这里继续修改

export default {
  name: 'XTinymce',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      id: 'tm-' + Date.now().toString(16)
    }
  },
  watch: {
    modelValue (value) {
      if (value === this._content) return
      this.instance?.setContent(value)
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeUnmount () {
    if (this.instance) {
      this.instance.destroy()
      this.instance = null
    }
  },
  methods: {
    async initEditor () {
      const instances = await window.tinymce.init({
        language: 'zh_CN',
        language_url: './lib/tinymce/zh_CN.js',
        selector: 'textarea#' + this.id,
        height: 500,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: `
          undo redo | blocks | 
          bold italic backcolor | alignleft aligncenter 
          alignright alignjustify | bullist numlist outdent indent | 
          removeformat | help
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }
        `,
        placeholder: '请输入、编辑富文本内容~',
        ...this.config
      })
      const instance = instances[instances.length - 1]
      instance.on('change', e => {
        this._content = instance.getContent()
        this.$emit('update:modelValue', this._content)
      })
      instance.on('input', e => {
        this._content = e.target.innerHTML
        this.$emit('update:modelValue', this._content)
      })
      this.instance = instance
      window._tinymce_instances_ = instances
    }
  }
}
</script>

<template>
  <div class="x-tinymce">
    <textarea :id v-html="modelValue"></textarea>
  </div>
</template>
