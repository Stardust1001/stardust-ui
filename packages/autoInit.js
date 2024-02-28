import fs from 'node:fs'
import path from 'node:path'

const autoInit = () => {
  return {
    name: 'auto-init',
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
      return {
        code: src
      }
    }
  }
}

export default autoInit
