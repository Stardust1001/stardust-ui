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
      id: 'tm-' + Date.now().toString(16),
      instance: null
    }
  },
  watch: {
    modelValue (value) {
      this.instance?.[0].setContent(value)
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeUnmount () {
    if (this.instance) {
      this.instance[0].destroy()
      this.instance = null
    }
  },
  methods: {
    async initEditor () {
      const instance = await window.tinymce.init({
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
      this.instance = Object.freeze(instance)
      this.addSaveButton()
    },
    handleSave () {
      this.$emit('update:modelValue', this.instance[0].getContent())
    },
    addSaveButton () {
      const menu = document.querySelector('.tox-menubar')
      const button = menu.childNodes[0].cloneNode(true)
      button.textContent = '保存'
      button.style.color = '#409EFF'
      button.onclick = this.handleSave.bind(this)
      menu.appendChild(button)
    }
  }
}
</script>

<template>
  <div class="x-tinymce">
    <textarea :id="id" v-html="modelValue"></textarea>
  </div>
</template>
