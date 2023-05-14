
const remoteSearch = async (restful, query, vm) => {
  vm.loading = true
  const keywords = query?.trim()
  const { text = 'text', value = 'value', labelTexts, params = {} } = vm
  params.attributes = [...new Set(params.attributes || [...(labelTexts || []), text, value])]
  params.limit = params.limit || 20
  if (keywords) {
    params.where = params.where || {}
    params.where[text] = params.where[text] || {}
    params.where[text]['[Op.like]'] = `%${keywords}%`
  }
  const data = await restful.search(vm.modelName, params)
  vm.options.splice(0, vm.options.length, ...data.data)
  vm.loading = false
}

const calcMainLabel = (option, vm) => {
  if (!vm.labelTexts || !vm.labelTexts.length) {
    return option[vm.text]
  }
  const labels = vm.labelTexts.map(text => option[text])
  return labels[0]
}

const calcRemarkLabel = (option, vm) => {
  if (!vm.labelTexts || vm.labelTexts.length < 2) {
    return ''
  }
  const labels = vm.labelTexts.map(text => option[text])
  return '(' + labels.slice(1).join(' - ') + ')'
}

export {
  remoteSearch,
  calcMainLabel,
  calcRemarkLabel
}
