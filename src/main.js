import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import Vant from 'vant'

import StardustUI from '../packages/index.js'
import '../packages/index.scss'

import App from '@/App.vue'

const app = createApp(App)

app.directive('domid', {
  created (el, binding) { }
})

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Vant)
app.use(StardustUI)

app.mount('#app')

export default app
