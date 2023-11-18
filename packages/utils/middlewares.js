import { watch, nextTick } from 'vue'
import { Message } from './message.js'

export const check404 = (router, store) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.length) {
      next()
    } else {
      next('/404')
    }
  })
}

export const setTitle = (router, store) => {
  router.afterEach((to, from) => {
    const titles = to.matched.map(r => r.meta.title)
    document.title = [store.app.sitename, ...titles].filter(t => t).reverse().join('-')
  })
}

export const checkRolesPages = (router, store) => {
  router.beforeEach((to, from, next) => {
    if (to.meta?.visitable) return next()
    if (!store.acl.paths.includes(to.path)) {
      Message.e('无权访问页面: ' + to.path)
      return next('/404')
    }
    return next()
  })
  nextTick(() => {
    watch(() => store.acl.menus, menus => {
      const paths = store.acl.paths
      const routes = router.getRoutes()
      const update = (route, parent) => {
        const path = (parent?.path ? (parent.path + '/') : '') + route.path
        route.meta ||= {}
        if (parent) {
          if (!route.meta.hasOwnProperty('hidden') || !route.meta.hasOwnProperty('visitable')) {
            route.meta.hidden ??= parent.meta?.hidden
            route.meta.visitable ??= parent.meta?.visitable
            route.meta = { ...route.meta }
          }
        }
        if (route.meta.hidden !== false && !paths.includes(path)) {
          route.meta.hidden = true
        }
        route.children?.forEach(sub => update(sub, route))
      }
      routes.forEach(update)
    }, { immediate: true })
  })
}

export const redirectTo = (router, store) => {
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
