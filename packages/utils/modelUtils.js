const { watch } = Vue
const { funcs } = StardustJs

export const initModel = (model, fields) => {
  Object.values(model).forEach(ele => {
    if (!ele || typeof ele !== 'object') {
      return
    }
    if (ele._isBaseTable) {
      initTable(ele, fields)
    } else if (ele._isBaseDialog) {
      initDialog(ele, fields)
    } else if (ele._isBaseForm) {
      initForm(ele, fields)
    }
  })
  return model
}

export const initTable = (table, fields) => {
  table.columns.push(...fields.filter(field => {
    return field.visible === false ? field.canView : field.canView !== false
  }))
  return table
}

export const initDialog = (dialog, fields) => {
  dialog.formItems = fields.filter(field => {
    if (field.visible === false) {
      return field.canAdd || field.canEdit
    }
    return (field.canAdd !== false) || (field.canEdit !== false)
  })
  initForm(dialog, fields)
  return dialog
}

export const initForm = (form, fields) => {
  if (form._isBaseForm && !form._isBaseDialog) {
    form.formItems = fields.filter(field => field.visible !== false)
  }
  initDefaultForm(form.form, form.formItems)
  form.initialForm = funcs.deepCopy(form.form)
  form.initialFormRules = funcs.deepCopy(form.formRules)

  const init = () => {
    initFormRules(form)
  }
  watch(() => form.formItems, init, { immediate: true, deep: true })
  return form
}

export const initFormRules = (container) => {
  const { formItems, initialFormRules } = container
  const defaultRuleFields = formItems.filter((item) => {
    let { formAttrs = {}, required = false } = item
    required = ('required' in formAttrs) ? formAttrs.required : required
    return !item.hasOwnProperty('rules') &&
          !container.initialFormRules.hasOwnProperty(item.prop) &&
          (required !== false)
  }).map(item => item.prop)
  Object.assign(container.formRules, funcs.deepCopy(initialFormRules))
  Object.keys(container.formRules).forEach(key => {
    if (!(key in initialFormRules)) {
      delete container.formRules[key]
    }
  })
  if (!defaultRuleFields.length) {
    return
  }
  const rules = {}
  defaultRuleFields.forEach(field => {
    if (container.formRules[field]) {
      return
    }
    const item = formItems.find(item => item.prop === field)
    const platform = item.platform || container.platform || (window.isMobile ? 'mobile' : 'pc')
    const trigger = triggers[platform]
    const itemRules = []
    const isSelects = 'options' in item
    const message = `请${isSelects ? '选择' : '输入'}${item?.label || field}`
    const baseRule = { required: true, message }
    if (item.validator) baseRule.validator = item.validator
    if (item.asyncValidator) baseRule.asyncValidator = item.asyncValidator
    if (!item.comp) {
      itemRules.push({ ...baseRule, trigger: trigger.blur })
    } else {
      itemRules.push({ ...baseRule, trigger: trigger.change })
    }
    if (item.comp === 'ElInputNumber') {
      itemRules.push({ ...baseRule, trigger: trigger.blur })
    }
    rules[field] = itemRules
  })
  Object.assign(container.formRules, rules)
  return container.formRules
}

export const initDefaultForm = (form, formItems, number0 = true) => {
  const defaultForm = {}
  formItems.forEach(item => {
    let value = ''
    const { type, options } = item
    const { multiple } = item.formAttrs || {}
    if (number0 && type === 'number' || item.comp === 'ElInputNumber') {
      value = 0
    } else if (item.comp === 'ElSwitch') {
      value = false
    } else if (options && (item.comp?.endsWith('XCheckboxs') || multiple)) {
      value = []
    } else if (item.comp === 'ElDatePicker' && ['datetimerange', 'daterange', 'monthrange'].includes(item.type)) {
      const placeholer = ({
        datetimerange: '时间',
        daterange: '日期',
        monthrange: '月份'
      })[item.type]
      if (!item['start-placeholder']) {
        item['start-placeholder'] = '开始' + placeholer
      }
      if (!item['end-placeholder']) {
        item['end-placeholder'] = '结束' + placeholer
      }
      value = []
    }
    defaultForm[item.prop] = value
  })
  Object.assign(form, { ...defaultForm, ...form })
  return form
}

export const triggers = {
  mobile: {
    blur: 'onBlur',
    change: 'onChange'
  },
  pc: {
    blur: 'blur',
    change: 'change'
  }
}

export default {
  initModel,
  initTable,
  initDialog,
  initForm,
  initFormRules,
  initDefaultForm,
  triggers
}
