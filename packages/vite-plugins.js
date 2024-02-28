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
          lines.splice(1, 0, `import makeController from './controller.js'`, `const controller = makeController({ ${needModel ? 'model, ' : ''}vue })`)
        }
        if (needModel) {
          lines.splice(1, 0, `import makeModel from './model.js'`, `const model = makeModel()`)
        }
        src = lines.join('\n')
      }
      return { code: src }
    }
  }
}

export const autoDeconstruct = () => {
  const filterPrivateFields = `
    const filterPrivateFields = source => {
      const target = {}
      for (let key in source) {
        if (key[0] !== "$" && key[0] !== "_") {
          target[key] = source[key]
        }
      }
      return target
    }
  `
  return {
    name: 'auto-deconstruct',
    transform (src, id) {
      const needModel = src.includes('import makeModel ') && src.includes('return __returned__')
      const needController = src.includes('import makeController ') && src.includes('return __returned__')
      if (needModel || needController) {
        let replacement = filterPrivateFields
        if (needModel && needController) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(model), ...filterPrivateFields(controller) }'
        } else if (needModel) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(model) }'
        } else if (needController) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(controller) }'
        }
        src = src.replace('return __returned__', replacement)
      }
      return { code: src }
    }
  }
}
