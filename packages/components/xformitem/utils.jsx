import { h, resolveDirective, withDirectives, resolveComponent } from 'vue'

const OPTIONS_COMPS = ['x-select', 'XSelect', 'x-radios', 'XRadios', 'x-checkboxs', 'XCheckboxs']

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
  const { modelValue, viewonly, slot, showTooltip, placeholder } = $props

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
    } else if (viewonly) {
      if (OPTIONS_COMPS.includes($props.comp)) {
        inner = attrs.options.find(o => o[attrs.value] == modelValue)?.[attrs.text] ?? modelValue
      } else if (modelValue && typeof modelValue === 'object') {
        inner = JSON.stringify(modelValue)
      } else {
        inner = modelValue
      }
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
  const { viewonly, slot, comp, modelValue } = $props

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
          } else if (viewonly) {
            return modelValue
          }
          return compRender(vm)
        }
      })
    } else {
      Object.assign(opts, attrs)
      if (viewonly) {
        Object.assign(opts, { readonly: true, placeholder: '--' })
      }
      vnode = h(resolveComponent('van-field'), opts)
    }
  }
  return directives ? withDirectives(vnode, directives) : vnode
}
