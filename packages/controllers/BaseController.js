import { nextTick } from 'vue'

import uiUtils from '../utils/index.js'

class BaseController {

  constructor ({ model, vue }) {
    this.model = model
    this._bindMethods()
    if (vue) {
      const vm = vue.getCurrentInstance()
      Object.defineProperties(this, {
        vue: {
          get: () => vue
        },
        vm: {
          get: () => vm
        }
      })
      this._initLifeCycles()
    }
    nextTick(this.onInit)
  }

  onInit () { }

  get app () {
    throw '请自行注入 app'
  }

  get $el () {
    return this.vm && this.vm.ctx.$el || null
  }

  get router () {
    throw '请自行注入 rouer'
  }

  get route () {
    return this.router.currentRoute.value
  }

  get store () {
    throw '请自行注入 store'
  }

  get uiUtils () {
    return uiUtils
  }

  get service () {
    throw '请自行注入 service'
  }

  get $api () {
    return this.service.api
  }

  get $request () {
    return this.service.request
  }

  get $restful () {
    return this.service.restful
  }

  get config () {
    return this.app.config.globalProperties
  }

  _bindMethods () {
    const thisKeys = [...Object.keys(this), ...this._getMethods()]
    const subKeys = Object.keys(Object.getOwnPropertyDescriptors(this.__proto__)).filter(method => method !== 'constructor')
    const allKeys = Array.from(new Set([...thisKeys, ...subKeys]))
    const methods = allKeys.filter(key => typeof this[key] === 'function')
    methods.forEach(method => {
      this[method] = this[method].bind(this)
    })
  }

  _initLifeCycles () {
    const hooks = [
      'onBeforeMount',
      'onMounted',
      'onBeforeUpdate',
      'onUpdated',
      'onBeforeUnmount',
      'onUnmounted',
      'onErrorCaptured',
      'onRenderTracked',
      'onRenderTriggered',
      'onActivated',
      'onDeactivated'
    ]
    hooks.forEach(hook => {
      this[hook] && this.vue[hook](this[hook])
    })
  }

  _getMethods () {
    return [
      '_bindMethods',
      '_initLifeCycles',
      '_getMethods',
      'onInit'
    ]
  }
}

export default BaseController
