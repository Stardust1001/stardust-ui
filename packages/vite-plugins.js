import fs from 'node:fs'
import path from 'node:path'

export const autoInject = () => {
  return {
    name: 'auto-inject',
    transform (src, id) {
      const dirname = path.dirname(id)
      const basename = path.basename(id)
      const name = basename.split('.')[0]
      const hasScopedScss = fs.existsSync(path.join(dirname, name + '-scoped.scss'))
      const hasScss = fs.existsSync(path.join(dirname, name + '.scss'))
      const hasModel = fs.existsSync(path.join(dirname, 'model.js'))
      const hasController = fs.existsSync(path.join(dirname, 'controller.js'))
      const needModel = hasModel && !src.includes('no model') && !src.includes('const model')
      const needController = hasController && !src.includes('no controller') && !src.includes('const controller')

      if (id.includes('/src/') && basename.includes('.vue') && src.startsWith('<script setup>')) {
        const lines = src.split('\n')
        if (hasScopedScss) {
          lines.push(...['<style lang="scss" scoped>', `@import "./${name}-scoped.scss";`, '</style>'])
        }
        if (hasScss) {
          lines.push(...['<style lang="scss">', `@import "./${name}.scss";`, '</style>'])
        }
        if (needController) {
          lines.splice(1, 0, `import $controller from './controller.js'`, `const controller = $controller({ ${needModel ? 'model, ' : ''}vue })`)
        }
        if (needModel) {
          lines.splice(1, 0, `import $model from './model.js'`, `const model = $model()`)
        }
        src = lines.join('\n')
      }
      return { code: src }
    }
  }
}

export const autoDeconstruct = () => {
  return {
    name: 'auto-deconstruct',
    transform (src, id) {
      if (src.includes('import $model ') && src.includes('return __returned__')) {
        src = src.replace('return __returned__', 'return { ...__returned__, ...model }')
      }
      if (src.includes('import $controller ') && src.includes('return __returned__')) {
        src = src.replace('return __returned__', 'return { ...__returned__, ...controller }')
      }
      return { code: src }
    }
  }
}
