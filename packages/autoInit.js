import fs from 'node:fs'
import path from 'node:path'

const autoInit = () => {
  return {
    name: 'auto-init',
    transform (src, id) {
      const dirname = path.dirname(id)
      const hasScoped = fs.existsSync(path.join(dirname, 'scoped.scss'))
      const hasModel = fs.existsSync(path.join(dirname, 'model.js'))
      const hasController = fs.existsSync(path.join(dirname, 'controller.js'))
      const name = path.basename(id)
      if (id.includes('/src/') && name.includes('.vue') && src.startsWith('<script setup>')) {
        const lines = src.split('\n')
        if (hasController && !src.includes('no controller') && !src.includes('const controller')) {
          lines.splice(1, 0, `import $controller from './controller.js'`, `const controller = $controller({ model, vue })`)
        }
        if (hasModel && !src.includes('no model') && !src.includes('const model')) {
          lines.splice(1, 0, `import $model from './model.js'`, `const model = $model()`)
        }
        if (hasScoped && !src.includes('no scoped')) {
          lines.splice(1, 0, `import './scoped.scss'`)
        }
        src = lines.join('\n')
      }
      return {
        code: src
      }
    }
  }
}

export default autoInit
