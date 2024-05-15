import { h, resolveDirective, withDirectives, resolveComponent } from 'vue'

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

  let directives
  if (attrs.directives && typeof attrs.directives === 'object') {
    directives = Object.entries(attrs.directives).map(([k, v]) => [resolveDirective(k), v])
  }

  let vnode

  if (slot && !$attrs.label) {
    vnode = $slots.default()
  } else {
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
    vnode = h(
      resolveComponent('el-form-item'),
      { ...$props, ...$attrs },
      {
        default: () => [inner],
        label: () => h('span', {
          title: $attrs.label,
          class: 'overflow-text',
          style: {
            width: ($props.required ? (parseInt($props.labelWidth) - 13 + 'px') : $props.labelWidth),
            display: 'inline-block'
          }
        }, [$attrs.label])
      }
    )
  }
  return directives ? withDirectives(vnode, directives) : vnode
}

export const MobileItem = (vm) => {
  const { $props, $attrs, attrs, $emit, $slots, mValue } = vm
  const { slot, comp, modelValue } = $props

  let directives
  if (attrs.directives && typeof attrs.directives === 'object') {
    directives = Object.entries(attrs.directives).map(([k, v]) => [resolveDirective(k), v])
  }

  let vnode

  if (slot && !$attrs.label) {
    vnode = $slots.default({ ...$props, ...$attrs })
  } else {
    const opts = {
      modelValue: mValue,
      labelWidth: $attrs['label-width'],
      labelAlign: $attrs['label-align'] ?? $attrs['label-position'],
      'onUpdate:modelValue': value => $emit('update:modelValue', value)
    }
    if (slot && $attrs.label || comp) {
      vnode = h(resolveComponent('van-field'), opts, {
        input: () => {
          if (slot && $attrs.label) {
            return $slots.default()
          }
          return compRender(vm)
        }
      })
    } else {
      vnode = h(resolveComponent('van-field'), Object.assign(opts, attrs))
    }
  }
  return directives ? withDirectives(vnode, directives) : vnode
}
