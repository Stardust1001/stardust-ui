import { isWhenMatched } from '../../utils/index.js'

export function props () {
  return {
    dialog: Object,
    form: Object,
    model: Object,
    items: Array,
    rules: Object,
    fref: Object,
    hideLabels: {
      type: Boolean,
      default: false
    }
  }
}

export function _model () {
  const { dialog, form, model } = this.$props
  return model || (dialog || form).form
}

export function _items () {
  const { hideLabels, dialog, form } = this.$props
  const its = this.items || (dialog || form).formItems
  return its.map((it, index) => {
    delete it.visible
    if (!hideLabels) {
      return it
    }
    return {
      ...it,
      label: ' ',
      _label: it.label,
      prop: it.prop || ('_' + index)
    }
  }).filter(it => {
    if (!this.dialog) {
      return true
    }
    return this.dialog.isEditing ? (it.canEdit !== false) : (it.canAdd !== false)
  }).map(it => {
    return Object.assign({}, it, it.formAttrs)
  })
}

export function _visibleItems () {
  if (!this.useWhen) return this._items
  return this._items.filter(it => isWhenMatched(it.when || it.formAttrs?.when, this._model))
}

export function _rules () {
  const { dialog, form, rules } = this.$props
  return rules || (dialog || form).formRules
}

export function _viewonly () {
  const { dialog, form } = this.$props
  return this.$attrs.viewonly ?? (dialog || form).viewonly
}

export function calcPlaceholder (item) {
  let { placeholder, comp } = item
  if (!placeholder) {
    placeholder = 'options' in item || /(date|time)/i.test(comp) ? '请选择' : '请输入'
    placeholder += item.label?.trim() || item._label || item.text || item.model || ''
  }
  return placeholder
}

export function formatModelValue (value) {
  if (typeof value === 'boolean') {
    return value.toString()
  }
  return value
}

export default {
  props,
  computed: {
    _model,
    _items,
    _visibleItems,
    _rules,
    _viewonly
  },
  methods: {
    calcPlaceholder,
    formatModelValue
  }
}
