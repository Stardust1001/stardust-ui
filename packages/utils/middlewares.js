
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
    const canView = !to.meta.roles || to.meta.roles.some(role => {
      return store.getters.userRoles.includes(role)
    })
    if (canView) {
      next()
    } else {
      next('/')
    }
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
