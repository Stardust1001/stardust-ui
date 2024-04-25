import { watch, nextTick } from 'vue'
import { Message } from './message.js'

const { funcs } = StardustJs

export const check404 = (router, store, routes) => {
  router.beforeEach(async (to, from) => {
    return !!to.matched.length || '/404'
  })
}

export const setTitle = (router, store, routes) => {
  router.afterEach((to, from) => {
    document.title = to.matched[to.matched.length - 1].meta?.title || store.app.sitename
  })
}

export const checkRolesPages = (router, store, routes) => {
  router.beforeEach(async (to, from) => {
    const path = to.matched[to.matched.length - 1].path.split('/:')[0]
    if (to.meta.acl === false || to.meta?.visitable) return true
    while (store.getters.logging) {
      await funcs.sleep(20)
    }
    await nextTick()
    if (store.acl.paths.includes(path)) return true
    if (store.getters.logined) {
      Message.e('无权访问页面: ' + to.path)
    }
    const query = { redirectTo: to.path, ...to.query }
    return { path: store.acl.paths[0] || '/404', query }
  })
  nextTick(() => {
    let inited = false
    watch(() => store.acl.menus, menus => {
      if (!inited) {
        if (!menus.length) return
        inited = true
      }
      const paths = store.acl.paths
      const update = (route, parents) => {
        const path = [...parents, route].reduce((path, p) => path + '/' + p.path, '').replace('//', '/')
        route.meta ||= {}
        if (route.meta.acl === false) {
          route.children?.forEach(sub => {
            sub.meta ||= {}
            sub.meta.acl ||= false
            update(sub, [...parents, route])
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
          route.children?.forEach(sub => update(sub, [...parents, route]))
          if (route.meta.hidden !== false && route.meta._hidden !== true) {
            route.meta.hidden = !paths.includes(path)
            if (route.children?.some(sub => sub.meta.hidden === false)) {
              route.meta.hidden = false
            }
          }
        }
      }
      routes.forEach(route => update(route, []))
    }, { immediate: true })
  })
}

export default {
  check404,
  setTitle,
  checkRolesPages
}
