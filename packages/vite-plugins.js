import fs from 'node:fs'
import path from 'node:path'

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
  const wrapCtx = (_ctx, model, controller) => {
    return new Proxy(_ctx, {
      get (obj, prop) {
        if (prop in obj) return obj[prop]
        return model?.[prop] ?? controller?.[prop]
      }
    })
  }
`

const inject = (src, id) => {
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
    src = src.replace('<script setup>', '<script setup>\n')
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
  return src
}

const instantiateTables = (src, id) => {
  const basename = path.basename(id)
  const isVue = basename.includes('.vue')
  const isJs = basename.includes('.js')
  if (id.includes('/src/') && (isVue || isJs)) {
    const names = new Set([...src.matchAll(/[^a-z][A-Z]\w+\.(search|add|update|remove|func|batch|get)/g)].map(e => e[0].slice(1).split('.')[0]))
    if (names.size) {
      let top = ''
      names.forEach(name => {
        let [dbname, tablename] = name.split('_').map(n => n.replace(/[A-Z]/g, c => '_' + c.toLowerCase()).slice(1))
        if (tablename) {
          dbname = `'${dbname}'`
        } else {
          tablename = dbname
          dbname = 'DbName'
        }
        top += `const ${name} = new Table(${dbname}, '${tablename}')\n`
      })
      if (isVue) {
        src = src.replace('<script setup>', '<script setup>\n' + top).replace('<script>', '<script>\n' + top)
      } else {
        src = top + src
      }
    }
  }
  return src
}

const deconstruct = (src, id) => {
  const basename = path.basename(id)
  const isVue = basename.includes('.vue')
  if (id.includes('/src/') && isVue) {
    const devText = 'return __returned__'
    const buildText = 'return (_ctx, _cache) => {'
    const isDev = src.includes(devText)
    const isBuild = src.includes(buildText)
    const needModel = (isDev || isBuild) && src.includes('import makeModel ')
    const needController = (isDev || isBuild) && src.includes('import makeController ')
    if (needModel || needController) {
      let replacement = filterPrivateFields
      if (isDev) {
        if (needModel && needController) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(model), ...filterPrivateFields(controller) }'
        } else if (needModel) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(model) }'
        } else if (needController) {
          replacement += 'return { ...__returned__, ...filterPrivateFields(controller) }'
        }
      } else {
        replacement += buildText + '\n'
        if (needModel && needController) {
          replacement += '_ctx = wrapCtx(_ctx, filterPrivateFields(model), filterPrivateFields(controller))'
        } else if (needModel) {
          replacement += '_ctx = wrapCtx(_ctx, filterPrivateFields(model))'
        } else if (needController) {
          replacement += '_ctx = wrapCtx(_ctx, null, filterPrivateFields(controller))'
        }
        replacement += '\n'
      }
      src = src.replace(isDev ? devText : buildText, replacement)
    }
  }
  return src
}

export const autoInject = (config = {}) => {
  return {
    name: 'auto-inject',
    transform (src, id) {
      src = inject(src, id)
      if (config.instantiateTables !== false) {
        src = instantiateTables(src, id)
      }
      return { code: src }
    }
  }
}

export const autoDeconstruct = () => {
  return {
    name: 'auto-deconstruct',
    transform (src, id) {
      return { code: deconstruct(src, id) }
    }
  }
}
