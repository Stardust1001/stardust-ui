import { toRaw } from 'vue'

export const validateForm = async (model) => {
  const ok = await model.formRef?.validate().then(() => true).catch(() => false)
  const oks = await Promise.all(model.formItems?.filter(it => it.comp?.endsWith('XForm')).map(it => this.validateForm(it.form)))
  return ok && oks.every(ok => ok)
}

export const formatPrecision = (number, precision) => {
  if (typeof number !== 'number') {
    const parsed = parseFloat(number) || null
    if (typeof parsed !== 'number') {
      return number
    }
    number = parsed
  }
  return number.toFixed(precision) * 1
}

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
  validateForm,
  formatPrecision,
  formatOptions
}
