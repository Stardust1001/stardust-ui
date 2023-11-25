import { watch, nextTick } from 'vue'
import { Message } from './message.js'

export const check404 = (router, store, routes) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.length) {
      next()
    } else {
      next('/404')
    }
  })
}

export const setTitle = (router, store, routes) => {
  router.afterEach((to, from) => {
    const titles = to.matched.map(r => r.meta.title)
    document.title = [store.app.sitename, ...titles].filter(t => t).reverse().join('-')
  })
}

export const checkRolesPages = (router, store, routes) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.acl === false || to.meta?.visitable) return next()
    if (!store.acl.paths.includes(to.path)) {
      Message.e('无权访问页面: ' + to.path)
      return next(store.acl.paths[0] || '/404')
    }
    return next()
  })
  nextTick(() => {
    let inited = false
    watch(() => store.acl.menus, menus => {
      if (!inited) {
        if (!menus.length) return
        inited = true
      }
      const paths = store.acl.paths
      const update = (route, parent) => {
        const path = (parent?.path ? (parent.path + '/') : '') + route.path
        route.meta ||= {}
        if (route.meta.acl === false) {
          route.children?.forEach(sub => {
            sub.meta ||= {}
            sub.meta.acl ||= false
            update(sub, route)
          })
        } else {
          route.meta._hidden = route.meta.hidden
          if (parent) {
            if (route.meta.hidden == null) {
              route.meta.hidden ??= parent.meta?.hidden
              route.meta = { ...route.meta }
            }
            if (route.meta.visitable == null) {
              route.meta.visitable ??= parent.meta?.visitable
              route.meta = { ...route.meta }
            }
          }
          route.children?.forEach(sub => update(sub, route))
          if (route.meta.hidden !== false && route.meta._hidden == null) {
            route.meta.hidden = !paths.includes(path)
            if (route.children?.some(sub => sub.meta.hidden === false)) {
              route.meta.hidden = false
            }
          }
        }
      }
      routes.forEach(update)
    }, { immediate: true })
  })
}

export const redirectTo = (router, store, routes) => {
  router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && store.getters.logined && to.query.redirectTo) {
      next(to.query.redirectTo)
    } else {
      next()
    }
  })
}

export default {
  check404,
  setTitle,
  checkRolesPages,
  redirectTo
}
