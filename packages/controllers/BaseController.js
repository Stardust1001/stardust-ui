import { nextTick } from 'vue'
import uiUtils from '../utils/index.js'

const { funcs, highdict, dates } = window.StardustJs
const { storage } = window.StardustBrowser

const VUE_LIFE_HOOKS = [
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

class BaseController {
  constructor ({ model, vue }) {
    this.model = model
    this._bindMethods()
    if (vue) {
      const vm = vue.getCurrentInstance()
      Object.defineProperties(this, {
        vue: { get: () => vue },
        vm: { get: () => vm }
      })
      this._initLifeHooks()
    }
    nextTick(this.onInit)
  }

  onInit () {
    this._evalAction()
  }

  get app () { throw '请自行注入 app' }

  get $el () { return this.vm && this.vm.ctx.$el || null }

  get router () { throw '请自行注入 router' }

  get route () { return this.router.currentRoute.value }

  get params () { return this.route.params }

  get query () { return this.route.query }

  get store () { throw '请自行注入 store' }

  get uiUtils () { return uiUtils }

  get service () { throw '请自行注入 service' }

  get $api () { return this.service.api }

  get $request () { return this.service.request }

  get $restful () { return this.service.restful }

  get config () { return this.app.config.globalProperties }

  get $js () { return window.StardustJs }

  get $browser () { return window.StardustBrowser }

  get $dates () { return dates }

  get $highdict () { return highdict }

  get $copy () { return funcs.deepCopy }

  get $sleep () { return funcs.sleep }

  get $storage () { return storage }

  get $local () { return storage.local }

  get $session () { return storage.session }

  _bindMethods () {
    const thisKeys = [...Object.keys(this), ...this._getMethods()]
    const proto = Object.getOwnPropertyDescriptors(this.__proto__)
    const subKeys = Object.keys(proto).filter(method => method !== 'constructor')
    const allKeys = Array.from(new Set([...thisKeys, ...subKeys]))
    const methods = allKeys.filter(key => typeof this[key] === 'function')
    methods.forEach(method => {
      this[method] = this[method].bind(this)
    })
  }

  _initLifeHooks () {
    VUE_LIFE_HOOKS.forEach(hook => {
      this[hook] && this.vue[hook](this[hook])
    })
  }

  _evalAction () {
    const { _action_, _action_params_, ...others } = this.query
    if (_action_ && this[_action_]) {
      this[_action_]?.(JSON.parse(_action_params_ || '{}'))
      this.router.replace(this.route.path + '?' + funcs.encodeQuery(others))
    }
  }

  _getMethods () {
    return [
      '_bindMethods',
      '_initLifeHooks',
      '_evalAction',
      '_getMethods',
      'onInit'
    ]
  }
}

export default BaseController
