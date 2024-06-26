
const remoteSearch = async (restful, query, vm) => {
  if (vm.loading || vm.options._loading) return
  vm.loading = true
  vm.options._loading = true
  const keywords = query?.trim()
  const { text = 'text', value = 'value', labelTexts, params = {} } = vm
  params.attributes = [...new Set(params.attributes || [...(labelTexts || []), text, value])]
  params.page ||= 1
  params.limit ||= 20
  params.where ||= {}
  const ors = []
  if (vm.modelValue !== undefined && vm.modelValue !== '') {
    ors.push({ [text]: vm.modelValue })
  }
  if (keywords) {
    if (labelTexts?.length > 1) {
      ors.push(...labelTexts.map(t => ({
        [t]: { '[Op.like]': `%${keywords}%` }
      })))
    } else {
      ors.push({ [text]: { '[Op.like]': `%${keywords}%` } })
    }
  }
  if (ors.length) params.where['[Op.or]'] = ors
  const data = await restful.search(vm.modelName, params)
  vm.options.splice(0, vm.options.length, ...data.data)
  vm.loading = false
  vm.options._loading = false
}

const calcMainLabel = (option, vm) => {
  if (!option || typeof option !== 'object') return option
  if (!vm.labelTexts || !vm.labelTexts.length) return option[vm.text]
  const labels = vm.labelTexts.map(text => option[text])
  return labels[0]
}

const calcRemarkLabel = (option, vm) => {
  if (!option || typeof option !== 'object') return ''
  if (!vm.labelTexts || vm.labelTexts.length < 2) return ''
  const labels = vm.labelTexts.map(text => option[text])
  return '(' + labels.slice(1).join(' - ') + ')'
}

export {
  remoteSearch,
  calcMainLabel,
  calcRemarkLabel
}
