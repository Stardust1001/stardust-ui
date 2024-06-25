import effects from './effects.js'

import {
  validateForm,
  formatPrecision,
  formatOptions
} from './funcs.js'

import {
  Message,
  Notify,
  Confirm,
  Prompt
} from './message.js'

import middlewares from './middlewares.js'

import {
  baseForm,
  baseTable,
  baseDialog,
  baseModel
} from './model.js'

import {
  initFields,
  initModel,
  initTable,
  initDialog,
  initForm,
  initFormRules,
  initDefaultForm,
  isWhenMatched,
  triggers
} from './modelUtils.js'

export {
  effects,
  validateForm,
  formatPrecision,
  formatOptions,
  Message,
  Notify,
  Confirm,
  Prompt,
  baseForm,
  baseTable,
  baseDialog,
  baseModel,
  initFields,
  initModel,
  initTable,
  initDialog,
  initForm,
  initFormRules,
  initDefaultForm,
  isWhenMatched,
  triggers
}

export default {
  effects,
  validateForm,
  formatPrecision,
  formatOptions,
  Message,
  Notify,
  Confirm,
  Prompt,
  middlewares,
  baseForm,
  baseTable,
  baseDialog,
  baseModel,
  initFields,
  initModel,
  initTable,
  initDialog,
  initForm,
  initFormRules,
  initDefaultForm,
  isWhenMatched,
  triggers
}
