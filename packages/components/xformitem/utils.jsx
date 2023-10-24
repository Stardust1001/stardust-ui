import { h, resolveComponent } from 'vue'

export const compRender = (vm) => {
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
    comp = resolveComponent(comp)
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

export const PcItem = (vm) => {
  const { $props, $attrs, attrs, $emit, $slots } = vm
  const { slot, showTooltip, placeholder } = $props
  
  if (slot && !$attrs.label) {
    return $slots.default()
  }

  let inner = null
  if (slot) {
    inner = $slots.default()
  } else if (showTooltip) {
    inner = (
      <el-tooltip effect="dark" content={placeholder} placement="bottom">
        { compRender(vm) }
      </el-tooltip>
    )
  } else {
    inner = compRender(vm)
  }
  return h(resolveComponent('el-form-item'), {
    ...$props,
    ...$attrs
  }, {
    default: () => [inner],
    label: () => h('div', {
      title: $attrs.label,
      class: 'overflow-text',
      style: { width: vm.width }
    }, [$attrs.label])
  })
}

export const MobileItem = (vm) => {
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
    return h(resolveComponent('van-field'), opts, {
      input: () => {
        if (slot && $attrs.label) {
          return $slots.default()
        }
        return compRender(vm)
      }
    })
  } else {
    Object.assign(opts, attrs)
    return h(resolveComponent('van-field'), opts)
  }
}
