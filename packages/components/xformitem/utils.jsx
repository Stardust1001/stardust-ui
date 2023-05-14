import { funcs } from '../../utils/index.js'

const { h } = Vue
const { resolveComponent } = funcs

const compRender = (vm) => {
  const { $props, $attrs, attrs, $emit } = vm
  let { comp, compType, html, text } = $props
  const opts = {
    ...attrs,
    'onUpdate:modelValue': value => $emit('update:modelValue', value)
  }
  const children = []
  if (compType === 'html') {
    opts.class = 'comp-html'
  } else {
    comp = resolveComponent(vm, comp)
  }
  if (html) {
    opts.innerHTML = html
  }
  if (text) {
    children.push(text)
  }
  return h(comp, opts, {
    default: () => children
  })
}

const PcItem = (vm) => {
  const { $props, $attrs, attrs, $emit, $slots } = vm
  const { slot, showTooltip, placeholder } = $props
  
  if (slot && !$attrs.label) {
    return $slots.default()
  }

  let inner = null
  if (showTooltip) {
    inner = (
      <el-tooltip effect="dark" content={placeholder} placement="bottom">
        { compRender(vm) }
      </el-tooltip>
    )
  } else {
    inner = compRender(vm)
  }
  return (
    <el-form-item>
      { inner }
    </el-form-item>
  )
}

const MobileItem = (vm) => {
  const { $props, $attrs, attrs, $emit, $slots, mValue } = vm
  const { slot, comp, modelValue } = $props

  if (slot && !$attrs.label) {
    return $slots.default({ ...$props, ...$attrs })
  }

  const opts = {
    modelValue: mValue,
    'onUpdate:modelValue': value => $emit('update:modelValue', value)
  }
  if (slot && $attrs.label || comp) {
    return h(resolveComponent(vm, 'van-field'), opts, {
      input: () => {
        if (slot && $attrs.label) {
          return $slots.default()
        }
        return compRender(vm)
      }
    })
  } else {
    Object.assign(opts, attrs)
    return h(resolveComponent(vm, 'van-field'), opts)
  }
}

export {
	compRender,
  PcItem,
  MobileItem
}
