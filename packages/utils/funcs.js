
const { toRaw } = Vue

export const resolveComponent = (vm, name) => vm.$.appContext.components[name]

export const formatOptions = (options, vm) => {
  const opts = options.__v_isRef ? options.value : toRaw(options)
  let items = opts
  if (typeof opts[0] !== 'object') {
    items = opts.map(op => ({ text: op, value: op }))
  }
  if (!vm.sort) {
    return items
  }
  const field = typeof vm.sort === 'string' ? vm.sort : (vm.text || 'text')
  return items.sort((a, b) => {
    return a[field].localeCompare(b[field])
  })
}

export default {
  resolveComponent,
  formatOptions
}
