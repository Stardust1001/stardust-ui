import { h } from 'vue'

import './index.scss'

import utils from './utils/index.js'
import controllers from './controllers/index.js'
import all from './comps'
import directives from './directives/index.js'

const makePlatformComp = (name) => {
  return {
    name,
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
      return h(all[this.name], {
        platform: this.platform,
        ...this.$attrs
      }, this.$slots)
    }
  }
}

const components = (() => {
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
  for (let key in directives) {
    app.directive(directives[key].name, directives[key])
  }
}

const StardustUI = {
  version: '1.5.28',
  ...components,
  ...utils,
  ...controllers,
  install
}

export {
  utils,
  controllers
}

export * from './utils/index.js'
export * from './controllers/index.js'

export default StardustUI
