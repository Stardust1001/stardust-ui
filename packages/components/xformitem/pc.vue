<script>
import { PcItem } from './utils.jsx'

export default {
  name: 'PcXFormItem',
  props: {
    modelValue: Boolean | Number | String | Array,
    comp: {
      type: String,
      default: 'ElInput'
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    labelWidth: String,

    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    compType: String,
    slot: String,
    span: Number,
    clearable: Boolean,
    html: String,
    text: String,
    options: Array,
    platform: String,
    placeholder: String,
    maxlength: String | Number,
    prefixIcon: String,
    suffixIcon: String,
    modelName: String,
    params: Object,
    labelTexts: Array,
    required: Boolean,
    minWidth: String | Number,
    _label: String
  },
  emits: ['update:modelValue'],
  computed: {
    attrs () {
      const {
        prop,
        label,
        platform,
        comp,
        slot,
        compType,
        span,
        offset,
        showTooltip,
        required,
        format,
        style,
        html,
        class: klass,
        ...others
      } = { ...this.$props, ...this.$attrs }
      return others
    },
    width () {
      return this.$attrs.label ? this.labelWidth : '0px'
    }
  },
  render () {
    return PcItem(this)
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  margin-left: 0 !important;
  width: calc(100% - v-bind('width'));
}
</style>
