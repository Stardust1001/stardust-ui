<script>
import { MobileItem } from './utils.jsx'

export default {
  name: 'MobileXFormItem',
  props: {
    modelValue: Boolean | Number | String | Array,
    clearable: {
      type: Boolean,
      default: true
    },

    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    comp: String,
    compType: String,
    options: Array,
    platform: String,
    iconSize: String | Number,
    min: Number,
    max: Number,
    maxlength: String | Number,
    buttonSize: String | Number,
    activeColor: String,
    slot: String,
    time: Number,
    percentage: Number,
    barHeight: String | Number,
    text: String,
    html: String
  },
  emits: ['update:modelValue'],
  computed: {
    attrs () {
      const {
        prop,
        label,
        platform,
        comp,
        compType,
        iconSize,
        slot,
        html,
        ...others
      } = { ...this.$props, ...this.$attrs }
      return others
    },
    mValue: {
      get () {
        if (this.comp?.endsWith('XSelect') || this.comp?.endsWith('x-select')) {
          return this.modelValue
        }
        return ''
      },
      set (value) {
        if (this.comp?.endsWith('XSelect') || this.comp?.endsWith('x-select')) {
          this.$emit('update:modelValue', value)
        }
      }
    }
  },
  render () {
    return MobileItem(this)
  }
}
</script>
