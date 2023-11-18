import effects from './effects.js'

import {
  validateForm,
  formatPrecision,
  formatOptions
} from './funcs.js'

import {
  Message,
  Notify,
  Confirm
} from './message.js'

import middlewares from './middlewares.js'

import {
  baseForm,
  baseTable,
  baseDialog,
  baseModel
} from './model.js'

import {
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
  baseForm,
  baseTable,
  baseDialog,
  baseModel,
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
  middlewares,
  baseForm,
  baseTable,
  baseDialog,
  baseModel,
  initModel,
  initTable,
  initDialog,
  initForm,
  initFormRules,
  initDefaultForm,
  isWhenMatched,
  triggers
}
