import path from 'node:path'

const autoInit = () => {
  return {
    name: 'auto-init',
    transform (src, id) {
      const name = path.basename(id)
      if (id.includes('/src/') && name.includes('.vue') && src.startsWith('<script setup>')) {
        const lines = src.split('\n')
        if (!src.includes('no controller') && !src.includes('const controller') && src.includes('controller')) {
          lines.splice(1, 0, `import $controller from './controller.js'`, `const controller = $controller({ model, vue })`)
        }
        if (!src.includes('no model') && !src.includes('const model') && src.includes('model')) {
          lines.splice(1, 0, `import $model from './model.js'`, `const model = $model()`)
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
