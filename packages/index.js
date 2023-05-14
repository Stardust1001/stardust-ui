import utils from './utils/index.js'
import './index.scss'

const { h } = Vue
const { resolveComponent } = utils.funcs

const modules = import.meta.globEager('./components/*/*.vue')

const makePlatformComp = (name) => {
  return {
    props: {
      platform: {
        type: String,
        default: window.isMobile ? 'mobile' : 'pc'
      }
    },
    data () {
      return { name: '' }
    },
    created () {
      this.name = (this.platform.toLowerCase() === 'pc' ? 'Pc' : 'Mobile') + name
    },
    render () {
      return h(resolveComponent(this, this.name), {
        platform: this.platform,
        ...this.$attrs
      }, this.$slots)
    }
  }
}

const components = (() => {
  const all = {}
  for (const key in modules) {
    const comp = modules[key].default
    // 含有 X 的组件名称才是要注册的，其他的是内部组件，不是对外提供的
    if (!/X[A-Z][a-z]/.test(comp.name)) continue
    all[comp.name] = comp
  }
  const names = Object.keys(all)
  const union = [...new Set(names.map(n => n.replace(/(pc|mobile)/i, '')))]

  const comps = {}
  for (const name of names) {
    if (/(pc|mobile)/i.test(name)) {
      comps[name] = all[name]
    }
  }
  for (const name of union) {
    if (!names.find(n => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(name.toLowerCase()))) {
      comps[name] = all[name]
    } else {
      comps[name] = makePlatformComp(name)
    }
  }
  return comps
})()

const install = (app, options) => {
  for (let key in components) {
    app.component(key, components[key])
  }
}

const StardustUI = {
  ...components,
  ...utils,
  install
}

export default StardustUI
